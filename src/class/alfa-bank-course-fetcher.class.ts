import { CourseFetcherClass } from './course-fetcher.class';
import { Course } from '../interface/course.interface';

export class AlfaBankCourseFetcher extends CourseFetcherClass {
    name = 'AlfaBank';
    icon = '../asset/alfa.png';
    url = 'http:localhost:8080/https://alfabank.ua'; // TODO: move to env

    async fetchCourse(): Promise<Course | void> {
        const response = await fetch(this.url);

        if (this.checkResponse(response)) {
            const html = await response.text();

            const courses = this.extractCourses(html);
            if (courses) {
                return this.createCourseResponse(courses);
            }
        }
    }

    private extractCourses(
        html: string
    ): Pick<Course, 'buyCourse' | 'sellCourse'> | void {
        const courses = [...html.matchAll(/class="rate-number"/)]
            .map(({ index }) => index)
            .filter((index): index is number => index !== undefined)
            .map((index) => html.slice(index, index + 120).match(/\d+\.\d+/));

        if (courses[8] && courses[8][0] && courses[9] && courses[9][0]) {
            return {
                buyCourse: +courses[8][0],
                sellCourse: +courses[9][0],
            };
        }

        this.throwFetchError('no courses found');
    }
}
