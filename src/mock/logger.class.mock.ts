const loggerModuleMock = jest.requireMock('./../class/logger.class');
export const loggerClassMock = loggerModuleMock.Logger;

jest.mock('./../class/logger.class.js', () => loggerModuleMock, {
    virtual: true,
});
