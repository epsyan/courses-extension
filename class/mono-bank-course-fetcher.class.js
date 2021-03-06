import { CourseFetcherClass } from "./course-fetcher.class.js";
import { rParseFloat } from "../util/utils.js";

const MONO_URL = "https://api.monobank.ua/bank/currency";
const ICON_URL = "../asset/mono.jpg";
const UAH_CURRENCY_CODE = 980;
const USD_CURRENCY_CODE = 840;

export class MonoBankCourseFetcher extends CourseFetcherClass {
  // async fetchCourse() {
  // this.throwFetchError("test mono");
  // return { course: 12, name: "mono", icon: ICON_URL };
  // }

  async fetchCourse() {
    const response = await fetch(MONO_URL);

    if (response.ok === false) {
      this.throwFetchError(`status ${response.status} given`);
    }

    const responseJson = await response.json();
    const course = responseJson.find(
      ({ currencyCodeA, currencyCodeB }) =>
        currencyCodeA === USD_CURRENCY_CODE &&
        currencyCodeB === UAH_CURRENCY_CODE
    );

    return {
      buyCourse: rParseFloat(course.rateBuy),
      sellCourse: rParseFloat(course.rateSell),
      name: this.constructor.name,
      icon: ICON_URL,
    };
  }
}
