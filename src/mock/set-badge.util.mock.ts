export const setBadgeModuleMock = jest.requireMock('./../util/set-badge.util');

jest.mock('./../util/set-badge.util.js', () => setBadgeModuleMock, {
    virtual: true,
});
