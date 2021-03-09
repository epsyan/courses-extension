import { setBadge } from '../set-badge.util';

describe('setBadge util tests', () => {
    global.chrome = {
        ...global.chrome,
        browserAction: {
            ...global.chrome?.browserAction,
            setBadgeText: jest.fn(),
            setBadgeBackgroundColor: jest.fn(),
            setIcon: jest.fn(),
        },
    };
    HTMLCanvasElement.prototype.getContext = jest.fn();

    it('should change badge text, color and icon', () => {
        const mockTxt = 'mockTxt';
        const mockColor = '#ccc';
        const iconSrc = 'icon.src';
        const mockIconColor = '#fff';

        setBadge(mockTxt, mockColor, iconSrc, mockIconColor);

        expect(global.chrome.browserAction.setBadgeText).toBeCalledWith({ text: mockTxt });
        expect(global.chrome.browserAction.setBadgeBackgroundColor).toBeCalledWith({ color: mockColor });

        // expect(global.chrome.browserAction.setIcon).toBeCalledWith({ color: mockColor }); // TODO: think how to test it
    });
});
