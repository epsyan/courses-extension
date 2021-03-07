import { CourseFetcherClass } from '../course-fetcher.class.js';
import { Course } from '../../interface/course.interface';
import { isDefined } from '../../util/utils.js';

const UAH_CURRENCY_CODE = 980;
const USD_CURRENCY_CODE = 840;

type MonoCourse = {
    currencyCodeA: number;
    currencyCodeB: number;
    rateBuy: number;
    rateSell: number;
};

export class MonoBankCourseFetcher extends CourseFetcherClass {
    name = 'MonoBank';
    url = 'https://api.monobank.ua/bank/currency';
    icon = '../public/asset/mono.jpg';

    async fetchCourse(): Promise<Course | void> {
        const response = await this.fetchAndCheckResponse();
        const responseJson: MonoCourse[] = await response.json();
        const course = responseJson.find(
            ({ currencyCodeA, currencyCodeB }) =>
                currencyCodeA === USD_CURRENCY_CODE && currencyCodeB === UAH_CURRENCY_CODE
        );

        if (isDefined(course)) {
            return this.createCourseResponse({
                buyCourse: course.rateBuy,
                sellCourse: course.rateSell,
            });
        }

        this.throwFetchError('No course found');
    }
}
