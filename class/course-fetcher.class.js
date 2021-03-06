export class CourseFetcherClass {
  /**
   * @type {number}
   */
  #currentCourse = 0;

  /**
   *  @return Promise<{ sellCourse: number, buyCourse: number, name: string, icon: string}>
   */
  async fetchCourse() {}

  /**
   * @param {string} text
   * @returns {string}
   */
  throwFetchError = (text) => {
    throw new Error(`%c${this.constructor.name} %cFetch Failed: ${text}`);
  };
}
