import { getHtml, toggleLoader } from './util/render.util.js';

const courseController = chrome.extension.getBackgroundPage()?.window.courseController;
const fetchCourses = courseController?.fetchCourses.bind(courseController);

if (!fetchCourses) {
    throw new Error('No Course Controller found');
}

(async () => {
    try {
        const courses = await fetchCourses();
        const tableElement = document.querySelector('table');

        if (tableElement) {
            tableElement.innerHTML = getHtml(courses);
        }
    } catch (e) {
        console.error(e);
    } finally {
        toggleLoader(false);
    }
})();
