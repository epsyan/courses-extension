import { CourseController } from './class/course-controller.class';
import { MinfinController } from './class/minfin-controller.class';
import { EnvType } from './config';
import { createChart } from 'lightweight-charts';

declare global {
    export interface Window {
        courseController: CourseController;
        minfinController: MinfinController;
        LightweightCharts: {
            createChart: createChart;
        };
        config: EnvType;
    }

    const config: EnvType;
}
