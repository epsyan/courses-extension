import { Course } from '../interface/course.interface';
import { rParseFloat } from './utils.js';
import { MinfinChartData } from '../class/minfin-controller.class';

const getCourseRow = ({ sellCourse, buyCourse, icon }: Course) =>
    `<tr>
<td><img src="${icon}"/></td>
<td>${rParseFloat(sellCourse)}</td>
<td>${rParseFloat(buyCourse)}</td>
<td>${rParseFloat(sellCourse - buyCourse)}</td>
</tr>`;

const toggleElem = (selector: string, show: boolean) => {
    const element = document.querySelector<HTMLElement>(selector);

    if (element !== null) {
        element.style.display = show ? 'block' : 'none';
    }
};

export const toggleLoader = (show: boolean, selector = '#loader'): void => {
    toggleElem(selector, show);
};

export const renderTable = (tableElement: Element, courses: Course[]): void => {
    const headerRow = `<tr><th>Bank</th><th>Sell</th><th>Buy</th><th>Spread</th></tr>`;
    const courseRows = courses.map(getCourseRow).join('');

    tableElement.innerHTML = `${headerRow}${courseRows}`;
};

// Chart render

const mapChartData = (chartData: MinfinChartData[], key: keyof MinfinChartData) =>
    chartData.map((dataItem) => ({
        time: new Date(dataItem.date).getTime() / 1000 + 10800, // add 3 hours to balance timezone
        value: dataItem[key],
    }));

export const renderChart = (elem: Element, chartData: MinfinChartData[]): void => {
    const chart = window.LightweightCharts.createChart(elem, { width: 242, height: 300 });

    const bidSeries = chart.addLineSeries({ color: 'green' });
    const askSeries = chart.addLineSeries({ color: 'red' });

    bidSeries.setData(mapChartData(chartData, 'bid'));
    askSeries.setData(mapChartData(chartData, 'ask'));

    chart.applyOptions({ timeScale: { timeVisible: true } });
    chart.timeScale().fitContent();
};
