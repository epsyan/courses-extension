export const rParseFloat = (num: number): number => {
    const [whole, fraction] = num.toString().split('.');

    return parseFloat(`${whole}.${fraction ? fraction.slice(0, 2) : ''}`);
};

export const isDefined = <T>(value?: T | null): value is T => value !== undefined && value !== null;

export const getTodayDateTime = (): [date: string, time: string] => {
    const date = new Date();

    return [date.toLocaleDateString('ukr'), date.toLocaleTimeString('ukr')];
};
