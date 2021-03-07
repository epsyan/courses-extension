import { COIN_SOUND, GREEN_COLOR, NA_ICON, RED_COLOR } from '../const.js';
import { setBadge } from '../util/set-badge.util.js';
import { Course } from '../interface/course.interface';
import { CourseFetcherClass } from './course-fetcher.class.js';

const POLL_TIMEOUT = 1000 * 60 * 10;

export class CourseController {
    constructor(
        private courseFetchers: CourseFetcherClass[],
        private currentCourse = 0
    ) {}

    async fetchCourse(): Promise<Course[]> {
        const settledPromises = await Promise.allSettled(
            this.courseFetchers.map((fetcher) => fetcher.fetchCourse())
        );
        const fulfilledPromises = settledPromises
            .filter(
                (promise): promise is PromiseFulfilledResult<Course> =>
                    promise.status === 'fulfilled'
            )
            .map(({ value }) => ({ ...value }))
            .sort(({ sellCourse: a }, { sellCourse: b }) => a - b);

        const rejectedPromises = settledPromises.filter(
            (promise): promise is PromiseRejectedResult =>
                promise.status === 'rejected'
        );

        this.processRejectedCourses(
            rejectedPromises,
            fulfilledPromises.length > 0
        );
        this.processFulfilledCourses(
            fulfilledPromises,
            rejectedPromises.length > 0
        );

        return fulfilledPromises;
    }

    async pollCourse(): Promise<void> {
        try {
            await this.fetchCourse();
        } catch (e) {
            console.error('Failed to fetch course');
            console.log(e);
        } finally {
            setTimeout(() => this.pollCourse(), POLL_TIMEOUT);
        }
    }

    processFulfilledCourses(
        courses: Course[],
        isRejectedPromisesExist: boolean
    ): void {
        if (courses.length === 0) return;

        courses.forEach(this.logCourse.bind(this)); // TODO: why bind?
        this.setCourse(courses[0], isRejectedPromisesExist);
    }

    processRejectedCourses(
        rejectedCourses: PromiseRejectedResult[],
        isFulfilledPromisesExist: boolean
    ): void {
        rejectedCourses.forEach(({ reason }) => {
            console.log(reason.message, 'color: red', 'color: black');
        });

        if (!isFulfilledPromisesExist) {
            setBadge('N/A', RED_COLOR, NA_ICON, RED_COLOR);
        }
    }

    setCourse(
        { sellCourse, name, icon }: Course,
        isRejectedPromisesExist: boolean
    ): void {
        if (sellCourse === this.currentCourse) return;
        const badgeColor =
            sellCourse > this.currentCourse ? RED_COLOR : GREEN_COLOR;
        const circleColor = isRejectedPromisesExist ? '#ef0000' : '#00bc00';

        console.log(`Change of course! ${name} with ${sellCourse}`);
        console.log(`old course: ${this.currentCourse}`);

        this.currentCourse = sellCourse;
        COIN_SOUND.play();

        setBadge(sellCourse.toString(), badgeColor, icon, circleColor);
    }

    logCourse({ name, sellCourse }: Course) {
        const dateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

        console.group(name);
        console.log(`Time: ${dateTime}`);
        console.log(`New course: ${sellCourse}`);
        console.groupEnd();
    }
}
