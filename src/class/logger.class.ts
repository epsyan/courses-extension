import { Course } from '../interface/course.interface';
import { getTodayDateTime } from '../util/utils.js';

export class Logger {
    static logSucceededCourses(courses: Course[]): void {
        const [date, time] = getTodayDateTime();

        courses.forEach(({ sellCourse, name }) => {
            console.group(name);
            console.log(`Time: ${date} ${time}`);
            console.log(`New course: ${sellCourse}`);
            console.groupEnd();
        });
    }

    static logRejectedPromises(promises: PromiseRejectedResult[]): void {
        promises.forEach(({ reason }) => {
            console.log(reason.message, 'color: red', 'color: black');
        });
    }

    static logCourseChange({ name, sellCourse }: Course, oldCourse: number): void {
        console.log(`%cChange of course! ${name} with ${sellCourse}`, 'color:green');
        console.log(`%cOld course: ${oldCourse}`, 'color:green');
    }

    static logError(e: Error, text?: string): void {
        if (text !== undefined) {
            console.error(text);
        }

        console.log(e);
    }
}
