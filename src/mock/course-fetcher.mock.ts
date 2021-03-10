import { CourseFetcherClass } from '../class/course-fetcher.class';

export const mockFetcherName = 'mockFetcherName';
export const mockFetcherIcon = 'mockFetcherIcon';
export const mockFetcherUrl = 'mockFetcherUrl';
export const mockFetchCourse = jest.fn();

export class MockFetcher extends CourseFetcherClass {
    name = mockFetcherName;
    icon = mockFetcherIcon;
    url = mockFetcherUrl;

    fetchCourse = mockFetchCourse;
}
