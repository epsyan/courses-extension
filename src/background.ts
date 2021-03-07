import { CourseController } from './class/course-controller.class.js';
import { MonoBankCourseFetcher } from './class/course-fetchers/mono-bank.course-fetcher.class.js';
import { AlfaBankCourseFetcher } from './class/course-fetchers/alfa-bank.course-fetcher.class.js';

window.courseController = new CourseController([
    new MonoBankCourseFetcher(),
    new AlfaBankCourseFetcher(),
]);

window.courseController.pollCourse();
