import './../mock/util.mock';

import { CourseFetcherClass } from '../class/course-fetcher.class';
import { MockFetcher, mockFetcherIcon, mockFetcherName } from '../mock/course-fetcher.mock';
import { mockFetch } from '../mock/fetch.mock';

describe('courseFetcher class tests', () => {
    const instance: CourseFetcherClass = new MockFetcher();

    it('should create right course response', async () => {
        const mockSellCourse = 1.11;
        const mockBuyCourse = 2.11;

        expect(
            await instance.createCourseResponse({
                sellCourse: mockSellCourse,
                buyCourse: mockBuyCourse,
            })
        ).toEqual({
            buyCourse: mockBuyCourse,
            sellCourse: mockSellCourse,
            name: mockFetcherName,
            icon: mockFetcherIcon,
        });
    });

    it('should throw error in roght format ', () => {
        expect(() => {
            instance.throwFetchError('Something wrong :(');
        }).toThrowErrorMatchingInlineSnapshot(`"%cmockFetcherName %cFetch Failed: Something wrong :("`);
    });

    it('should fetch particular url and proceed if response ok', async () => {
        const mockData = { ok: true, data: 'Some Data' };
        mockFetch.mockReturnValueOnce(mockData);

        expect(await instance.fetchAndCheckResponse()).toEqual(mockData);
    });

    it('should fetch particular url and throw if response not ok', async () => {
        jest.spyOn(instance, 'throwFetchError');

        const mockData = { ok: false, status: 404 };
        mockFetch.mockReturnValueOnce(mockData);

        expect(async () => {
            await instance.fetchAndCheckResponse();
            expect(instance.fetchAndCheckResponse).toBeCalledWith(expect.stringContaining(mockData.status.toString()));
        });
    });
});
