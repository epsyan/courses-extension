const actualUtils = jest.requireActual('./../util/utils');
jest.mock('./../util/utils.js', () => actualUtils, { virtual: true });

const actualPromise = jest.requireActual('./../util/promise.util');
jest.mock('./../util/promise.util.js', () => actualPromise, { virtual: true });

const actualRender = jest.requireActual('./../util/render.util');
jest.mock('./../util/render.util.js', () => actualRender, { virtual: true });
