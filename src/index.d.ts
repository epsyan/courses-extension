import { CourseController } from './class/course-controller.class';

declare global {
    interface Window {
        courseController: CourseController;
    }
}
