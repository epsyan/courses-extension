import { CourseFetcherClass } from '../course-fetcher.class.js';
import { Course } from '../../interface/course.interface';
import { getTodayDateTime, isDefined } from '../../util/utils.js';
import { USD_CURRENCY_CODE } from '../../const.js';

type OTPCourse = {
    items: Array<{
        NAME: string;
        BUY: string;
        SELL: string;
    }>;
};

export class OtpCourseFetcher extends CourseFetcherClass {
    name = 'Otp';
    url = '';
    icon = '../public/asset/otp.jpeg';

    async fetchCourse(): Promise<Course | void> {
        this.url = this.getTodayApiUrl();

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

    private getTodayApiUrl(): string {
        const [todayDate] = getTodayDateTime();

        return `${window.config.corsAnywhereUrl}https://ru.otpbank.com.ua/local/components/otp/utils.exchange_rate_arc/exchange_rate_by_date.php?curr_date=%d%&ib_code=otp_bank_currency_rates`.replace(
            '%d',
            todayDate
        );
    }
}
