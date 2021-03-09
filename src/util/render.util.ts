import { Course } from '../interface/course.interface';
import { rParseFloat } from './utils.js';

const getCourseRow = ({ sellCourse, buyCourse, icon }: Course) =>
    `<tr>
<td><img src="${icon}"/></td>
<td>${rParseFloat(sellCourse)}</td>
<td>${rParseFloat(buyCourse)}</td>
<td>${rParseFloat(sellCourse - buyCourse)}</td>
</tr>`;

const toggleElem = (selector: string, show: boolean) => {
    const element = document.querySelector<HTMLElement>(selector);

    if (element !== null) {
        element.style.display = show ? 'block' : 'none';
    }
};

export const getHtml = (courses: Course[]): string => {
    const headerRow = `<tr><th>Bank</th><th>Sell</th><th>Buy</th><th>Spread</th></tr>`;
    const courseRows = courses.map(getCourseRow).join('');

    return `${headerRow}${courseRows}`;
};

export const toggleLoader = (show: boolean, selector = '#loader'): void => {
    toggleElem(selector, show);
};
