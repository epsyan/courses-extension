import { CourseController } from './class/course-controller.class.js';
import { MonoBankCourseFetcher } from './class/course-fetchers/mono.course-fetcher.class.js';
import { AlfaBankCourseFetcher } from './class/course-fetchers/alfa.course-fetcher.class.js';
import { UniversalBankCourseFetcher } from './class/course-fetchers/universal.course-fetcher.class.js';
import { PrivatCourseFetcher } from './class/course-fetchers/privat.course-fetcher.class.js';
import { OtpCourseFetcher } from './class/course-fetchers/otp.course-fetcher.class.js';

window.courseController = new CourseController([
    new MonoBankCourseFetcher(),
    new AlfaBankCourseFetcher(),
    // new NBUCourseFetcher(),
    new UniversalBankCourseFetcher(),
    new PrivatCourseFetcher(),
    new OtpCourseFetcher(),
]);

window.courseController.pollCourse();
