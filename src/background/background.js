"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const course_controller_class_1 = require("../class/course-controller.class");
const mono_bank_course_fetcher_class_js_1 = require("../class/mono-bank-course-fetcher.class.js");
const alfa_bank_course_fetcher_class_js_1 = require("../class/alfa-bank-course-fetcher.class.js");
window.courseController = new course_controller_class_1.CourseController([
    new mono_bank_course_fetcher_class_js_1.MonoBankCourseFetcher(),
    new alfa_bank_course_fetcher_class_js_1.AlfaBankCourseFetcher(),
]);
window.courseController.pollCourse();
//# sourceMappingURL=background.js.map