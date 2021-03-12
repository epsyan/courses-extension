import { CourseController } from './class/course-controller.class.js';
import { MonoBankCourseFetcher } from './class/course-fetchers/mono.course-fetcher.class.js';
import { AlfaBankCourseFetcher } from './class/course-fetchers/alfa.course-fetcher.class.js';
import { UniversalBankCourseFetcher } from './class/course-fetchers/universal.course-fetcher.class.js';
import { PrivatCourseFetcher } from './class/course-fetchers/privat.course-fetcher.class.js';
import { OtpCourseFetcher } from './class/course-fetchers/otp.course-fetcher.class.js';
import { NBUCourseFetcher } from './class/course-fetchers/nbu.course-fetcher.class.js';
import { CourseFetcherClass } from './class/course-fetcher.class.js';

import { ENV } from './env.js';
import { getConfig } from './config.js';

window.config = getConfig(ENV);

const courseFetchers = [
    config.mono && new MonoBankCourseFetcher(),
    config.alfa && new AlfaBankCourseFetcher(),
    config.nbu && new NBUCourseFetcher(),
    config.universal && new UniversalBankCourseFetcher(),
    config.privat && new PrivatCourseFetcher(),
    config.otp && new OtpCourseFetcher(),
].filter((f): f is CourseFetcherClass => f instanceof CourseFetcherClass);

window.courseController = new CourseController(courseFetchers);

window.courseController.pollCourse();
