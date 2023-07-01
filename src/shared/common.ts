export interface Stat {
  title: string;
  value: string;
  desc?: string;
  indicator?: number;
}

export const getRangeIndicator = (range: number | number[], target: number) => {
  if (Array.isArray(range)) {
    if (target > range[1]) return 1;
    else if (target < range[0]) return -1;
    else return 0;
  }

  if (target > range) return 1;
  return 0;
};
