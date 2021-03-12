import { COLORS, NA_ICON } from '../const.js';
import { setBadge } from '../util/set-badge.util.js';
import { Course } from '../interface/course.interface';
import { CourseFetcherClass } from './course-fetcher.class.js';
import { getCoursesFromPromises, zipSettledPromises } from '../util/promise.util.js';
import { Logger } from './logger.class.js';

const POLL_TIMEOUT = 1000 * 60 * 10;
const COIN_SOUND = new Audio(chrome.runtime.getURL('public/asset/coin.mp3'));

export class CourseController {
    constructor(private courseFetchers: CourseFetcherClass[], private currentCourse = 0) {}

    async fetchCourses(): Promise<Course[]> {
        const settledPromises = await Promise.allSettled(this.courseFetchers.map((fetcher) => fetcher.fetchCourse()));
        const [fulfilledPromises, rejectedPromises] = zipSettledPromises(settledPromises);
        const courses = getCoursesFromPromises(fulfilledPromises);

        const hasRejectedPromises = rejectedPromises.length > 0;
        const hasSucceededPromises = courses.length > 0;

        Logger.logRejectedPromises(rejectedPromises);

        if (hasSucceededPromises) {
            Logger.logSucceededCourses(courses);
            this.setCurrentCourse(courses[0], hasRejectedPromises);
        } else {
            setBadge({ text: 'N/A', color: COLORS.red, iconSrc: NA_ICON, circleColor: COLORS.red });
        }

        return courses;
    }

    async pollCourse(): Promise<void> {
        try {
            await this.fetchCourses();
        } catch (e) {
            Logger.logError(e, 'Failed to fetch course');
        } finally {
            setTimeout(this.pollCourse.bind(this), POLL_TIMEOUT);
        }
    }

    setCurrentCourse(newCourse: Course, isRejectedPromisesExist: boolean): void {
        if (newCourse.sellCourse === this.currentCourse) return;

        Logger.logCourseChange(newCourse, this.currentCourse);

        const badgeColor = newCourse.sellCourse > this.currentCourse ? COLORS.red : COLORS.green;
        const circleColor = isRejectedPromisesExist ? COLORS.redBright : COLORS.greenBright;

        this.currentCourse = newCourse.sellCourse;

        COIN_SOUND.play();

        setBadge({
            text: newCourse.sellCourse.toString(),
            color: badgeColor,
            iconSrc: newCourse.icon,
            circleColor,
        });
    }
}
