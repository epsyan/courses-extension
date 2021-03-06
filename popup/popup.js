import { rParseFloat } from "../util/utils.js";

const fetchCourse = chrome.extension
  .getBackgroundPage()
  .window.courseController.fetchCourse.bind(
    chrome.extension.getBackgroundPage().window.courseController
  );

const toggleElem = (selector, show) => {
  document.querySelector(selector).style.display = show ? "block" : "none";
};

const createCourseRow = ({ sellCourse, buyCourse, icon }) =>
  `<tr>
<td><img src="${icon}"/></td>
<td>${sellCourse}</td>
<td>${buyCourse}</td>
<td>${rParseFloat(sellCourse - buyCourse)}</td>
</tr>`;

const headerRow = `<tr><th>Bank</th><th>Sell</th><th>Buy</th><th>Spread</th></tr>`;

(async () => {
  try {
    const courses = await fetchCourse();
    const courseRows = courses.map(createCourseRow).join("");

    document.querySelector("table").innerHTML = `${headerRow}${courseRows}`;
  } catch (e) {
    console.log(e);
  } finally {
    toggleElem("#loader", false);
  }
})();
