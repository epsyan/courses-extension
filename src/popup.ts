import { getHtml, toggleLoader } from './util/render.util.js';

const courseController = chrome.extension.getBackgroundPage()?.window
    .courseController;

const fetchCourse = courseController?.fetchCourse.bind(courseController);

if (!fetchCourse) {
    throw new Error('No Course Controller found');
}

(async () => {
    try {
        const courses = await fetchCourse();
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
