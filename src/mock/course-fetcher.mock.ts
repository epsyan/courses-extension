import { CourseFetcherClass } from '../class/course-fetcher.class';

const mockFetcherName = 'mockFetcherName';
const mockFetcherIcon = 'mockFetcherIcon';
const mockFetcherUrl = 'mockFetcherUrl';
const mockFetchCourse = jest.fn();

export class MockFetcher extends CourseFetcherClass {
    name = mockFetcherName;
    icon = mockFetcherIcon;
    url = mockFetcherUrl;

    fetchCourse = mockFetchCourse;
}
