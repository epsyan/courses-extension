const CONSTModule = jest.requireActual('./../const');

export const mockCoinSoundPlay = jest.fn();

jest.mock(
    './../const.js',
    () => ({
        ...CONSTModule,
        COIN_SOUND: { play: mockCoinSoundPlay },
    }),
    { virtual: true }
);
