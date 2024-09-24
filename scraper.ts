import axios from 'axios';
import * as cheerio from 'cheerio';

type Laptop = {
    title: string;
    price: number;
    description: string;
    imageUrl: string
};

export async function Laptops(marca: string): Promise<Laptop[]> {
    let page = 1;
    let hasNextPage = true;
    let allLaptops: Laptop[] = [];

    marca = marca.replace(/\s+/g, '').toLowerCase();

    while (hasNextPage) {
        let url = `https://webscraper.io/test-sites/e-commerce/static/computers/laptops?page=${page}`;
        let { data } = await axios.get(url);
        let $ = cheerio.load(data);

        let laptopsOnPage: Laptop[] = $('.card.thumbnail').toArray().map((element) => {
            let title = $(element).find('.caption h4 a').text();
            let price = $(element).find('.caption .price').text().replace('$', '');
            let description = $(element).find('.caption p').text();
            let imageUrl = $(element).find('img').attr('src') || '';

            return {
                title,
                price: parseFloat(price),
                description,
                imageUrl
            };
        }).filter((laptop) => laptop.title.toLowerCase().includes(marca));

        allLaptops = allLaptops.concat(laptopsOnPage);

        let nextPageButton = $('.pagination li').last();
        hasNextPage = !nextPageButton.hasClass('disabled');

        page++;
    }

    return allLaptops.sort((a, b) => a.price - b.price);
}
