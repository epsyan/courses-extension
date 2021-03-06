import { CourseFetcherClass } from "./course-fetcher.class.js";
const ALFA_URL = "http:localhost:8080/https://alfabank.ua";
const ICON_URL = "../asset/alfa.png";

export class AlfaBankCourseFetcher extends CourseFetcherClass {
  // async fetchCourse() {
  // this.throwFetchError("test");
  // return 12.2; new Promise((resolve) => {
  //   setTimeout(
  //     () => resolve({ course: 12.2, name: "alfa", icon: ICON_URL }),
  //     0
  //   );
  // });

  // return 12.2;
  // }

  async fetchCourse() {
    const response = await fetch(ALFA_URL);

    if (response.ok === false) {
      this.throwFetchError(`status ${response.status} given`);
    }

    const html = await response.text();

    const courses = [...html.matchAll('class="rate-number"')]
      .map(({ index }) => index)
      .map((index) => html.slice(index, index + 120).match(/\d+\.\d+/));

    if (courses.length > 9) {
      return {
        buyCourse: +courses[8][0],
        sellCourse: +courses[9][0],
        name: this.constructor.name,
        icon: ICON_URL,
      };
    }

    this.throwFetchError("re-login to cors-anywhere?");
  }
}
