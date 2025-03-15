export const cls = (...props: string[]): string => {
  return [...props].filter((item: string) => item !== '').join(' ');
};
