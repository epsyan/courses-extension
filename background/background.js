import { CourseController } from "../class/course-controller.class.js";
import { MonoBankCourseFetcher } from "../class/mono-bank-course-fetcher.class.js";
import { AlfaBankCourseFetcher } from "../class/alfa-bank-course-fetcher.class.js";

window.courseController = new CourseController([
  new MonoBankCourseFetcher(),
  new AlfaBankCourseFetcher(),
]);

window.courseController.pollCourse();
