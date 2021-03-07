import { Course } from '../interface/course.interface';
import { rParseFloat } from '../util/utils.js';

export abstract class CourseFetcherClass {
    abstract name: string;
    abstract icon: string;
    abstract url: string;

    abstract fetchCourse(): Promise<Course | void>;

    async createCourseResponse(courseData: Pick<Course, 'sellCourse' | 'buyCourse'>): Promise<Course> {
        return {
            buyCourse: rParseFloat(courseData.buyCourse),
            sellCourse: rParseFloat(courseData.sellCourse),
            name: this.name,
            icon: this.icon,
        };
    }

    throwFetchError(text: string): void {
        throw new Error(`%c${this.name} %cFetch Failed: ${text}`);
    }

    async fetchAndCheckResponse(): Promise<Response> {
        const response = await fetch(this.url);

        if (!response.ok) {
            this.throwFetchError(`status ${response.status} given`);
        }

        return response;
    }
}
