import * as renderUtil from './../util/render.util';

jest.mock(
    './../util/utils.js',
    () => ({
        rParseFloat: jest.fn(),
        getTodayDateTime: jest.fn(),
    }),
    {
        virtual: true,
    }
);

const actualPromise = jest.requireActual('./../util/promise.util');

jest.mock('./../util/promise.util.js', () => actualPromise, { virtual: true });
jest.mock('./../util/render.util.js', () => renderUtil, { virtual: true });
