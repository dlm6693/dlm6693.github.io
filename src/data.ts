/**
 * Activity data behind the ambient animations. Both files are copied from the
 * profile repo (dlm6693/dlm6693) by .github/workflows/refresh-city.yml:
 *   /data/calendar.json  [[yyyy-mm-dd, count], ...] for the last ~53 weeks
 *   /data/stats.json     GitHub totals and streaks
 * Nothing here is invented; if a fetch fails the callers draw a quiet default.
 */

export type Calendar = [string, number][];

export type Stats = {
  created_at: string;
  followers: number;
  public_repos: number;
  prs: number;
  prs_merged: number;
  year: number;
  contributions_year: number;
  contributions_all: number;
  streak_current: number;
  streak_longest: number;
  languages: Record<string, number>;
  /** Contributions per calendar year, oldest first. The current year is partial. */
  years?: Record<string, number>;
};

export type Activity = {
  calendar: Calendar;
  stats: Stats | null;
  /** Contributions in the last 7 calendar days. */
  last7: number;
  /** Contributions across the whole calendar (about a year). */
  last365: number;
  /** Totals per week, oldest first. */
  weekly: number[];
  /** Totals by weekday, Sunday first. */
  weekday: number[];
  busiest: {date: string; count: number};
  /** 0..1 — how busy the last week was relative to the busiest week. */
  tempo: number;
};

async function json<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {cache: 'no-cache'});
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function summarize(calendar: Calendar, stats: Stats | null): Activity {
  const weekly: number[] = [];
  const weekday = [0, 0, 0, 0, 0, 0, 0];
  let busiest = {date: calendar[0]?.[0] ?? '', count: -1};
  let last365 = 0;
  calendar.forEach(([date, count], i) => {
    if (i % 7 === 0) weekly.push(0);
    weekly[weekly.length - 1] += count;
    weekday[new Date(`${date}T12:00:00Z`).getUTCDay()] += count;
    last365 += count;
    if (count > busiest.count) busiest = {date, count};
  });
  const last7 = calendar.slice(-7).reduce((n, [, c]) => n + c, 0);
  const peakWeek = Math.max(1, ...weekly);
  return {calendar, stats, last7, last365, weekly, weekday, busiest, tempo: Math.min(1, last7 / peakWeek)};
}

let pending: Promise<Activity | null> | undefined;

export function loadActivity(): Promise<Activity | null> {
  pending ??= (async () => {
    const [calendar, raw] = await Promise.all([
      json<Calendar>('/data/calendar.json'),
      json<Stats & {github?: Stats}>('/data/stats.json'),
    ]);
    if (!calendar?.length) return null;
    // The profile repo writes {github: {...}}; accept a flat file too.
    const stats = raw?.github ?? raw;
    return summarize(calendar, stats?.contributions_all == null ? null : stats);
  })();
  return pending;
}
