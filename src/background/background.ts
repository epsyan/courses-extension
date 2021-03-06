import { CourseController } from "../class/course-controller.class";
import { MonoBankCourseFetcher } from "../class/mono-bank-course-fetcher.class.js";
import { AlfaBankCourseFetcher } from "../class/alfa-bank-course-fetcher.class.js";

// @ts-ignore
window.courseController = new CourseController([
  new MonoBankCourseFetcher(),
  new AlfaBankCourseFetcher(),
]);

// @ts-ignore
window.courseController.pollCourse();
