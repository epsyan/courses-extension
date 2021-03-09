import { Course } from '../interface/course.interface';

type StripVoid<T> = T extends void ? never : T;

export const zipSettledPromises = <T>(
    settledPromises: PromiseSettledResult<T>[]
): [PromiseFulfilledResult<StripVoid<T>>[], PromiseRejectedResult[]] => [
    settledPromises.filter(
        (promise): promise is PromiseFulfilledResult<StripVoid<T>> => promise.status === 'fulfilled'
    ),
    settledPromises.filter((promise): promise is PromiseRejectedResult => promise.status === 'rejected'),
];

export const getCoursesFromPromises = (fulfilledPromises: PromiseFulfilledResult<Course>[]): Course[] =>
    fulfilledPromises.map(({ value }) => ({ ...value })).sort(({ sellCourse: a }, { sellCourse: b }) => a - b);
