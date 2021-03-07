export const rParseFloat = (num: number): number => parseFloat(num.toString().slice(0, 5));

export const isDefined = <T>(value?: T | null): value is T => value !== undefined && value !== null;
