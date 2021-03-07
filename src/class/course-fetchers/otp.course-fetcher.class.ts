import { CourseFetcherClass } from '../course-fetcher.class.js';
import { Course } from '../../interface/course.interface';
import { getTodayDate, isDefined } from '../../util/utils.js';
import { CORS_ANYWHERE_URL, USD_CURRENCY_CODE } from '../../const.js';

const API_URL = `${CORS_ANYWHERE_URL}https://ru.otpbank.com.ua/local/components/otp/utils.exchange_rate_arc/exchange_rate_by_date.php?curr_date=%d%&ib_code=otp_bank_currency_rates`;

type OTPCourse = {
    items: Array<{
        NAME: string;
        BUY: string;
        SELL: string;
    }>;
};

export class OtpCourseFetcher extends CourseFetcherClass {
    name = 'Otp';
    url = API_URL;
    icon = '../public/asset/otp.jpeg';

    async fetchCourse(): Promise<Course | void> {
        this.url = API_URL.replace('%d', getTodayDate());

        const response = await this.fetchAndCheckResponse();
        const responseJson: OTPCourse = await response.json();
        const course = responseJson.items.find(({ NAME }) => NAME === USD_CURRENCY_CODE);

        if (isDefined(course)) {
            return this.createCourseResponse({
                buyCourse: +course.BUY,
                sellCourse: +course.SELL,
            });
        }

        this.throwFetchError('No course found');
    }
}
