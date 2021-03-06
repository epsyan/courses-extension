import { Course } from '../interface/course.interface';

export abstract class CourseFetcherClass {
    abstract name: string;
    abstract icon: string;
    abstract url: string;

    abstract fetchCourse(): Promise<Course | void>;

    async createCourseResponse(
        courseData: Pick<Course, 'sellCourse' | 'buyCourse'>
    ): Promise<Course> {
        return {
            ...courseData,
            name: this.name,
            icon: this.icon,
        };
    }

    throwFetchError(text: string): void {
        throw new Error(`%c${this.name} %cFetch Failed: ${text}`);
    }

    checkResponse(response: Response): boolean {
        if (!response.ok) {
            this.throwFetchError(`status ${response.status} given`);
        }

        return true;
    }
}
