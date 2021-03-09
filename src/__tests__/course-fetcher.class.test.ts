import '../mock/const.mock';
import '../mock/util.mock';

import { CourseController } from '../class/course-controller.class';
import { mockFetchCourse, MockFetcher } from '../mock/course-fetcher.mock';
import { mockCourses } from '../mock/course.mock';

jest.useFakeTimers();

describe('courseController class tests', () => {
    const mockFetcher = new MockFetcher();
    let instance: CourseController;

    beforeEach(() => {
        instance = new CourseController([mockFetcher]);
    });

    it('should poll course', async () => {
        expect.assertions(2);
        jest.spyOn(instance, 'fetchCourses').mockImplementation();

        await instance.pollCourse();
        expect(instance.fetchCourses).toBeCalledTimes(1);

        jest.runOnlyPendingTimers();
        expect(instance.fetchCourses).toBeCalledTimes(2);
    });

    it('should throw from poll course and rerun polling', async () => {
        const mockError = new Error('Bad!');

        expect.assertions(3);

        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(instance, 'fetchCourses').mockImplementation(() => {
            throw mockError;
        });

        await instance.pollCourse();
        expect(console.error).toBeCalledWith('Failed to fetch course');
        expect(console.log).toBeCalledWith(mockError);

        jest.runOnlyPendingTimers();
        expect(instance.fetchCourses).toBeCalledTimes(2);
    });

    // TODO: redesign
    it('should fetchCourses', async () => {
        const mockProcessRejectedCourses = jest.fn();
        const mockProcessFulfilledCourses = jest.fn();

        mockFetchCourse.mockReturnValue(mockCourses[0]);

        const courses = await instance.fetchCourses();

        expect(mockFetchCourse).toBeCalledTimes(1);
        expect(mockProcessFulfilledCourses).toBeCalledWith([mockCourses[0]], false);
        expect(mockProcessRejectedCourses).toBeCalledWith([], true);
        expect(courses).toEqual([mockCourses[0]]);
    });

    // TODO: redesign
    it('should process fulfilled courses', () => {
        const mockIsRejectedExist = false;

        jest.spyOn(instance, 'setCurrentCourse').mockImplementation();

        expect(instance.setCurrentCourse).toBeCalledWith(mockCourses[0], mockIsRejectedExist);
    });
});
