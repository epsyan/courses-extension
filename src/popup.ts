import { renderChart, renderTable, toggleLoader } from './util/render.util.js';
import { getMethodFromBackgroundPage } from './util/chrome.util.js';

const fetchCourses = getMethodFromBackgroundPage('courseController', 'fetchCourses');
const fetchMinfin = getMethodFromBackgroundPage('minfinController', 'fetch');

(async () => {
    try {
        const [courses, minfinData] = await Promise.all([fetchCourses(), fetchMinfin()]);
        const tableElement = document.querySelector('table');
        const chartElement = document.querySelector('.chart');

        tableElement && renderTable(tableElement, courses);
        chartElement && renderChart(chartElement, minfinData);
    } catch (e) {
        console.error(e);
    } finally {
        toggleLoader(false);
    }
})();
