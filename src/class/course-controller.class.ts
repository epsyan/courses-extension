import { COIN_SOUND, GREEN_COLOR, NA_ICON, RED_COLOR } from '../const.js'
import { setBadge } from '../util/set-badge.util.js'

const POLL_TIMEOUT = 1000 * 60 * 10

/**

 * @typedef RejectedCourse
 * @type {object}
 * @property {string} reason
 */

export class CourseController {
    #currentCourse = 0
    #courseFetchers = []

    constructor(courseFetchers) {
        this.#courseFetchers = courseFetchers
    }

    async fetchCourse() {
        const settledPromises = await Promise.allSettled(
            this.#courseFetchers.map((fetcher) => fetcher.fetchCourse())
        )
        const fulfilledPromises = settledPromises
            .filter(({ status }) => status === 'fulfilled')
            .map(({ value }) => ({ ...value }))
            .sort(({ sellCourse: a }, { sellCourse: b }) => a - b)

        const rejectedPromises = settledPromises.filter(
            ({ status }) => status === 'rejected'
        )

        this.processRejectedCourses(
            rejectedPromises,
            fulfilledPromises.length > 0
        )
        this.processFulfilledCourses(
            fulfilledPromises,
            rejectedPromises.length > 0
        )

        return fulfilledPromises
    }

    /**
     *  @return Promise<void>
     */
    async pollCourse() {
        try {
            this.fetchCourse()
        } catch (e) {
            console.error('Failed to fetch course')
            console.log(e)
        } finally {
            setTimeout(() => this.pollCourse(), POLL_TIMEOUT)
        }
    }

    /**
     * @param {Course[]} courses
     * @param {boolean} isRejectedPromisesExist
     */
    processFulfilledCourses(courses, isRejectedPromisesExist) {
        if (courses.length === 0) return

        courses.forEach(this.#logCourse.bind(this))
        this.setCourse(courses[0], isRejectedPromisesExist)
    }

    /**
     * @param {RejectedCourse[]} rejectedCourses
     * @param {boolean} isFulfilledPromisesExist
     */
    processRejectedCourses(rejectedCourses, isFulfilledPromisesExist) {
        rejectedCourses.forEach(({ reason }) => {
            console.log(reason.message, 'color: red', 'color: black')
        })

        if (isFulfilledPromisesExist === false) {
            setBadge('N/A', RED_COLOR, NA_ICON, RED_COLOR)
        }
    }

    /**
     * @param {Course} newCourse
     * @param {boolean} isRejectedPromisesExist
     */
    setCourse({ sellCourse, name, icon }, isRejectedPromisesExist) {
        if (sellCourse === this.#currentCourse) return
        const badgeColor =
            sellCourse > this.#currentCourse ? RED_COLOR : GREEN_COLOR
        const circleColor = isRejectedPromisesExist ? '#ef0000' : '#00bc00'

        console.log(`Change of course! ${name} with ${sellCourse}`)
        console.log(`old course: ${this.#currentCourse}`)

        this.#currentCourse = sellCourse
        COIN_SOUND.play()

        setBadge(sellCourse.toString(), badgeColor, icon, circleColor)
    }

    /**
     * @param {Course} newCourse
     */
    #logCourse({ name, sellCourse }) {
        const dateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`

        console.group(name)
        console.log(`Time: ${dateTime}`)
        console.log(`New course: ${sellCourse}`)
        console.groupEnd()
    }
}
