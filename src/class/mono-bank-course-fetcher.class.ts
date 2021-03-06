import { CourseFetcherClass } from './course-fetcher.class';
import { Course } from '../interface/course.interface';
import { rParseFloat } from '../util/utils';

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
    icon = '../asset/mono.jpg';

    async fetchCourse(): Promise<Course | void> {
        const response = await fetch(this.url);

        if (!response.ok) {
            this.throwFetchError(`status ${response.status} given`);
        }

        const responseJson: MonoCourse[] = await response.json();
        const course = responseJson.find(
            ({ currencyCodeA, currencyCodeB }) =>
                currencyCodeA === USD_CURRENCY_CODE &&
                currencyCodeB === UAH_CURRENCY_CODE
        );

        if (MonoBankCourseFetcher.isMonoCourse(course)) {
            return this.createCourseResponse({
                buyCourse: rParseFloat(course.rateBuy),
                sellCourse: rParseFloat(course.rateSell),
            });
        }

        this.throwFetchError('No course found');
    }

    private static isMonoCourse(course?: MonoCourse): course is MonoCourse {
        return course !== undefined;
    }
}
