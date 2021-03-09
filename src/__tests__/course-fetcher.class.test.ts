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
        jest.spyOn(instance, 'fetchCourse').mockImplementation();

        await instance.pollCourse();
        expect(instance.fetchCourse).toBeCalledTimes(1);

        jest.runOnlyPendingTimers();
        expect(instance.fetchCourse).toBeCalledTimes(2);
    });

    it('should throw from poll course and rerun polling', async () => {
        const mockError = new Error('Bad!');

        expect.assertions(3);

        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(instance, 'fetchCourse').mockImplementation(() => {
            throw mockError;
        });

        await instance.pollCourse();
        expect(console.error).toBeCalledWith('Failed to fetch course');
        expect(console.log).toBeCalledWith(mockError);

        jest.runOnlyPendingTimers();
        expect(instance.fetchCourse).toBeCalledTimes(2);
    });

    it('should fetchCourses', async () => {
        const mockProcessRejectedCourses = jest.fn();
        const mockProcessFulfilledCourses = jest.fn();

        mockFetchCourse.mockReturnValue(mockCourses[0]);
        jest.spyOn(instance, 'processRejectedCourses').mockImplementation(mockProcessRejectedCourses);
        jest.spyOn(instance, 'processFulfilledCourses').mockImplementation(mockProcessFulfilledCourses);

        const courses = await instance.fetchCourse();

        expect(mockFetchCourse).toBeCalledTimes(1);
        expect(mockProcessFulfilledCourses).toBeCalledWith([mockCourses[0]], false);
        expect(mockProcessRejectedCourses).toBeCalledWith([], true);
        expect(courses).toEqual([mockCourses[0]]);
    });

    it('should process fulfilled courses', () => {
        const mockIsRejectedExist = false;

        jest.spyOn(instance, 'logCourse').mockImplementation();
        jest.spyOn(instance, 'setCourse').mockImplementation();

        instance.processFulfilledCourses(mockCourses, mockIsRejectedExist);

        expect(instance.logCourse).toBeCalledTimes(mockCourses.length);
        expect(instance.setCourse).toBeCalledWith(mockCourses[0], mockIsRejectedExist);
    });
});
