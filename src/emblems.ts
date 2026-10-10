export type EmblemId =
  | 'coreweave'
  | 'nyt'
  | 'aws'
  | 'go'
  | 'kubernetes'
  | 'python'
  | 'java'
  | 'postgres'
  | 'kafka'
  | 'github';

/** The real mark, stuck on at a slight tilt. The visible name sits beside it. */
export function emblem(id: EmblemId): string {
  return `<span class="sticker sticker-${id}"><img class="emblem" alt="" src="/emblems/${id}.png" width="96" height="96"></span>`;
}
