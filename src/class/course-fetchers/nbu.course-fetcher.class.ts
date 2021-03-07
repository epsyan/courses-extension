import { CourseFetcherClass } from '../course-fetcher.class.js';
import { Course } from '../../interface/course.interface';
import { isDefined } from '../../util/utils.js';
import { USD_CURRENCY_CODE } from '../../const.js';

type NBUCourse = {
    rate: number;
    cc: string;
};

export class NBUCourseFetcher extends CourseFetcherClass {
    name = 'NBU';
    url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    icon = '../public/asset/nbu.jpeg';

    async fetchCourse(): Promise<Course | void> {
        const response = await this.fetchAndCheckResponse();
        const responseJson: NBUCourse[] = await response.json();
        const course = responseJson.find(({ cc }) => cc === USD_CURRENCY_CODE);

        if (isDefined(course)) {
            return this.createCourseResponse({
                buyCourse: course.rate,
                sellCourse: course.rate,
            });
        }

        this.throwFetchError('No course found');
    }
}
