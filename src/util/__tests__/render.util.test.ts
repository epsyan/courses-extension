import { rParseFloat } from '../utils';
import { getHtml, toggleLoader } from '../render.util';
import { mockCourses } from '../../mock/course.mock';

jest.mock('./../utils.js', () => ({ rParseFloat }), { virtual: true });

describe('render utils tests', () => {
    describe('getHtml', () => {
        it('should return proper html', () => {
            expect(getHtml(mockCourses)).toMatchInlineSnapshot(`
                "<tr><th>Bank</th><th>Sell</th><th>Buy</th><th>Spread</th></tr><tr>
                <td><img src=\\"mock.png\\"/></td>
                <td>17.2</td>
                <td>28.11</td>
                <td>-10.91</td>
                </tr><tr>
                <td><img src=\\"mock-bank.png\\"/></td>
                <td>172.22</td>
                <td>280.11</td>
                <td>-107.88</td>
                </tr><tr>
                <td><img src=\\"really-bank.png\\"/></td>
                <td>11237.21</td>
                <td>2811.11</td>
                <td>8426.1</td>
                </tr>"
            `);
        });
    });

    describe('toggleLoader', () => {
        document.body.innerHTML = '<div><div id="custom-loader"></div></div>';

        it('should toggle loader', () => {
            toggleLoader(false, '#custom-loader');
            expect(document.querySelector<HTMLElement>('#custom-loader')?.style.display).toBe('none');

            toggleLoader(true, '#custom-loader');
            expect(document.querySelector<HTMLElement>('#custom-loader')?.style.display).toBe('block');
        });
    });
});
