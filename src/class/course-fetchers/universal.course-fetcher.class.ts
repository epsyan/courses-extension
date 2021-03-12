import { CourseFetcherClass } from '../course-fetcher.class.js';
import { Course } from '../../interface/course.interface';
import { isDefined } from '../../util/utils.js';
import { USD_CURRENCY_CODE } from '../../const.js';

export class UniversalBankCourseFetcher extends CourseFetcherClass {
    name = 'UniversalBank';
    url = `${config.corsAnywhereUrl}https://www.universalbank.com.ua`;
    icon = '../public/asset/universal.png';

    async fetchCourse(): Promise<Course | void> {
        const response = await this.fetchAndCheckResponse();
        const html = await response.text();
        const courses = this.extractCourses(html);

        if (courses) {
            return this.createCourseResponse(courses);
        }
    }

    private extractCourses(html: string): Pick<Course, 'buyCourse' | 'sellCourse'> | void {
        const dom = document.createElement('html');
        dom.innerHTML = html;

        for (const tableElem of dom.querySelectorAll('.rate')) {
            const currencyCell = tableElem.querySelector<HTMLElement>('.currency');

            if (isDefined(currencyCell) && currencyCell.innerText.trim() === USD_CURRENCY_CODE) {
                if (isDefined(currencyCell.parentNode)) {
                    const courses = [...currencyCell.parentNode.children]
                        .filter((child) => /\d{2}\.\d{2}$/.test(child.innerHTML.trim()))
                        .map((child) => child.innerHTML.trim());

                    return {
                        buyCourse: +courses[0],
                        sellCourse: +courses[1],
                    };
                }
            }
        }

        this.throwFetchError('no courses found');
    }
}
