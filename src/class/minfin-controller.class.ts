export type MinfinChartData = {
    date: string;
    bid: string;
    ask: string;
};

export class MinfinController {
    url = `${config.corsAnywhereUrl}https://minfin.com.ua/data/currency/ib/usd.ib.today.json?202105021431`;

    async fetch(): Promise<MinfinChartData[]> {
        const response = await fetch(this.url);
        return response.json();
    }
}
