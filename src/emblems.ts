// Pixel reductions of the real marks, for identification. Names sit beside them.

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

export function emblem(id: EmblemId): string {
  return `<span class="sticker sticker-${id}"><img class="emblem" alt="" src="/emblems/${id}.png" width="72" height="72"></span>`;
}
