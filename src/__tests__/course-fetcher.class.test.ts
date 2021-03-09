import '../mock/chrome.mock';
import '../mock/const.mock';
import '../mock/util.mock';

import { loggerClassMock } from '../mock/logger.class.mock';
import { MockFetcher } from '../mock/course-fetcher.mock';
import { mockCourses } from '../mock/course.mock';
import { setBadgeModuleMock } from '../mock/set-badge.util.mock';

import { CourseController } from '../class/course-controller.class';
import { mockCoinSoundPlay } from '../mock/const.mock';
import { COLORS } from '../const';

jest.useFakeTimers();

describe('courseController class tests', () => {
    let instance: CourseController;
    const mockFetcher1 = new MockFetcher();
    const mockFetcher2 = new MockFetcher();
    mockFetcher1.fetchCourse = jest.fn();
    mockFetcher2.fetchCourse = jest.fn();

    beforeEach(() => {
        instance = new CourseController([mockFetcher1, mockFetcher2]);
    });

    describe('poll method', () => {
        it('should poll course', async () => {
            expect.assertions(2);
            jest.spyOn(instance, 'fetchCourses').mockImplementation();

            await instance.pollCourse();
            expect(instance.fetchCourses).toBeCalledTimes(1);

            jest.runOnlyPendingTimers();
            expect(instance.fetchCourses).toBeCalledTimes(2);
        });

        it('should throw from poll course and rerun polling', async () => {
            expect.assertions(2);

            const mockError = new Error('Bad!');

            jest.spyOn(instance, 'fetchCourses').mockImplementation(() => {
                throw mockError;
            });

            await instance.pollCourse();

            expect(loggerClassMock.logError).toBeCalledWith(mockError, 'Failed to fetch course');
            jest.runOnlyPendingTimers();
            expect(instance.fetchCourses).toBeCalledTimes(2);
        });
    });

    describe('fetchCourse method', () => {
        const mockError = new Error('Rejected!');

        beforeEach(() => {
            jest.spyOn(instance, 'setCurrentCourse').mockImplementation();
            mockFetcher1.fetchCourse.mockReset();
            mockFetcher2.fetchCourse.mockReset();
        });

        it('should fetchCourses', async () => {
            mockFetcher1.fetchCourse.mockReturnValueOnce(mockCourses[0]);
            mockFetcher2.fetchCourse.mockReturnValueOnce(mockCourses[1]);

            const courses = await instance.fetchCourses();

            expect(mockFetcher1.fetchCourse).toBeCalledTimes(1);
            expect(mockFetcher2.fetchCourse).toBeCalledTimes(1);
            expect(courses).toEqual([mockCourses[0], mockCourses[1]]);
        });

        it('should log rejected and fulfilled courses', async () => {
            mockFetcher1.fetchCourse.mockReturnValueOnce(Promise.resolve(mockCourses[0]));
            mockFetcher2.fetchCourse.mockReturnValueOnce(Promise.reject(mockError));

            await instance.fetchCourses();

            expect(loggerClassMock.logRejectedPromises).toBeCalledWith([{ reason: mockError, status: 'rejected' }]);
            expect(loggerClassMock.logSucceededCourses).toBeCalledWith([mockCourses[0]]);
        });

        it('should show N/A icon if all courses failed to fetch', async () => {
            mockFetcher1.fetchCourse.mockReturnValueOnce(Promise.reject(mockError));
            mockFetcher2.fetchCourse.mockReturnValueOnce(Promise.reject(mockError));

            await instance.fetchCourses();

            expect(instance.setCurrentCourse).not.toBeCalled();
            expect(setBadgeModuleMock.setBadge).toBeCalledWith(expect.objectContaining({ text: 'N/A' }));
        });

        it('should set correct currentCourse', async () => {
            mockFetcher1.fetchCourse.mockReturnValueOnce(Promise.resolve(mockCourses[2]));
            mockFetcher2.fetchCourse.mockReturnValueOnce(Promise.resolve(mockCourses[1]));

            await instance.fetchCourses();

            expect(instance.setCurrentCourse).toBeCalledWith(mockCourses[1], false);
        });
    });

    describe('setCurrentCourse method', () => {
        beforeEach(() => {
            mockCoinSoundPlay.mockReset();
            setBadgeModuleMock.setBadge.mockReset();
        });

        it('should do nothing if course is the same ', () => {
            const courseMock = { ...mockCourses[1], sellCourse: 0 };

            instance.setCurrentCourse(courseMock, false);
            expect(loggerClassMock.logCourseChange).not.toBeCalled();
            expect(setBadgeModuleMock.setBadge).not.toBeCalled();
        });

        it('should logCourse if its changed', () => {
            const courseMock = { ...mockCourses[1], sellCourse: 28.21 };

            instance.setCurrentCourse(courseMock, false);
            expect(loggerClassMock.logCourseChange).toBeCalledWith(courseMock, 0);
        });

        it('should play sound if course changed', () => {
            const courseMock = { ...mockCourses[1], sellCourse: 21.21 };

            instance.setCurrentCourse(courseMock, false);
            expect(mockCoinSoundPlay).toBeCalledTimes(1);
        });

        it('should setBadge if course changed', () => {
            const sellCourseHigher = 21.21;
            const sellCourseLower = 20.02;
            const courseMock = { ...mockCourses[1], sellCourse: sellCourseHigher };

            instance.setCurrentCourse(courseMock, false);
            expect(setBadgeModuleMock.setBadge).toBeCalledWith(
                expect.objectContaining({
                    text: sellCourseHigher.toString(),
                    iconSrc: mockCourses[1].icon,
                    color: COLORS.red,
                })
            );

            instance.setCurrentCourse({ ...courseMock, sellCourse: sellCourseLower }, false);
            expect(setBadgeModuleMock.setBadge).toBeCalledWith(
                expect.objectContaining({
                    text: sellCourseLower.toString(),
                    iconSrc: mockCourses[1].icon,
                    color: COLORS.green,
                })
            );
        });

        it('should draw red circle if isRejected', () => {
            instance.setCurrentCourse(mockCourses[1], true);
            expect(setBadgeModuleMock.setBadge).toBeCalledWith(
                expect.objectContaining({ circleColor: COLORS.redBright })
            );
        });

        it('should draw green circle if not isRejected', () => {
            instance.setCurrentCourse(mockCourses[1], false);
            expect(setBadgeModuleMock.setBadge).toBeCalledWith(
                expect.objectContaining({ circleColor: COLORS.greenBright })
            );
        });
    });
});
