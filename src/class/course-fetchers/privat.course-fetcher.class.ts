import { CourseFetcherClass } from '../course-fetcher.class.js';
import { Course } from '../../interface/course.interface';
import { isDefined } from '../../util/utils.js';
import { USD_CURRENCY_CODE } from '../../const.js';

type PrivatCourse = {
    buy: string;
    sale: string;
    base_ccy: string;
    ccy: string;
};

export class PrivatCourseFetcher extends CourseFetcherClass {
    name = 'Privat';
    url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    icon = '../public/asset/privat.png';

    async fetchCourse(): Promise<Course | void> {
        const response = await this.fetchAndCheckResponse();
        const responseJson: PrivatCourse[] = await response.json();
        const course = responseJson.find(({ ccy }) => ccy === USD_CURRENCY_CODE);

        if (isDefined(course)) {
            return this.createCourseResponse({
                buyCourse: +course.buy,
                sellCourse: +course.sale,
            });
        }

        this.throwFetchError('No course found');
    }
}
