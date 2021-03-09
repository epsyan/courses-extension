import * as promiseUtil from './../util/promise.util';
import * as renderUtil from './../util/render.util';
import * as setBadgeUtil from './../util/set-badge.util';

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
jest.mock('./../util/promise.util.js', () => promiseUtil, { virtual: true });
jest.mock('./../util/render.util.js', () => renderUtil, { virtual: true });
jest.mock('./../util/set-badge.util.js', () => setBadgeUtil, { virtual: true });
