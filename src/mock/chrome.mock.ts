global.chrome = {
    ...global.chrome,
    browserAction: {
        ...global.chrome?.browserAction,
        setBadgeText: jest.fn(),
        setBadgeBackgroundColor: jest.fn(),
        setIcon: jest.fn(),
    },
    runtime: {
        ...global.chrome?.runtime,
        getURL: jest.fn(),
    },
};
