import { CourseController } from './class/course-controller.class';
import { EnvType } from './config';

declare global {
    interface Window {
        courseController: CourseController;
        config: EnvType;
    }

    const config: EnvType;
}
