import { Course } from '../../interface/course.interface';
import { CourseFetcherClass } from '../course-fetcher.class.js';

export class AlfaBankCourseFetcher extends CourseFetcherClass {
    name = 'AlfaBank';
    icon = '../public/asset/alfa.png';
    url = `${config.corsAnywhereUrl}https://alfabank.ua`; // TODO: move to env

    async fetchCourse(): Promise<Course | void> {
        const response = await this.fetchAndCheckResponse();
        const html = await response.text();
        const courses = this.extractCourses(html);

        if (courses) {
            return this.createCourseResponse(courses);
        }

        this.throwFetchError('no courses found');
    }

    private extractCourses(html: string): Pick<Course, 'buyCourse' | 'sellCourse'> | void {
        const courses = [...html.matchAll(/class="rate-number"/g)]
            .map(({ index }) => index)
            .filter((index): index is number => index !== undefined)
            .map((index) => html.slice(index, index + 120).match(/\d+\.\d+/));

        if (courses[8] && courses[8][0] && courses[9] && courses[9][0]) {
            return {
                buyCourse: +courses[8][0],
                sellCourse: +courses[9][0],
            };
        }
    }
}
