import { getTodayDateTime, isDefined, rParseFloat } from '../utils';

describe('utils tests', () => {
    describe('isDefined', () => {
        it('should check for undefined', () => {
            expect(isDefined(undefined)).toBe(false);
        });

        it('should check for null', () => {
            expect(isDefined(null)).toBe(false);
        });

        it('should return true if not null and not undefined', () => {
            expect(isDefined('9')).toBe(true);
        });
    });

    describe('rParseFloat', () => {
        it('should parse num in dd.dd format', () => {
            expect(rParseFloat(28.1145)).toBe(28.11);
        });

        it('should parse num without floating point', () => {
            expect(rParseFloat(28)).toBe(28);
        });

        it('should parse big long num', () => {
            expect(rParseFloat(8426.101999999999)).toBe(8426.1);
        });
    });

    describe('getTodayDateTime', () => {
        beforeAll(() => {
            const mockDate = new Date(2000, 0, 15, 11, 17, 50);

            jest.useFakeTimers('modern').setSystemTime(mockDate);
        });

        it('should return date and time parts', () => {
            expect(getTodayDateTime()).toEqual(['15.01.2000', '11:17:50']);
        });
    });
});
