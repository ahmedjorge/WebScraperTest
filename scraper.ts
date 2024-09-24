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

    // Enquanto houver páginas
    while (hasNextPage) {
        const url = `https://webscraper.io/test-sites/e-commerce/static/computers/laptops?page=${page}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Verifica se existem laptops nesta página
        const laptopsOnPage: Laptop[] = $('.thumbnail').toArray().map((element) => {
            const title = $(element).find('.caption h4 a').text();
            const price = $(element).find('.caption .price').text().replace('$', '');
            const description = $(element).find('.caption p').text();
            const imageUrl = $(element).find('img').attr('src') || '';


            return {
                title,
                price: parseFloat(price),
                description,
                imageUrl
            };
        }).filter((laptop) => laptop.title.toLowerCase().includes(marca));

        allLaptops = allLaptops.concat(laptopsOnPage);

        // Verifica se há um botão de "próxima página" para continuar
        const nextPageButton = $('.pagination li').last();
        hasNextPage = !nextPageButton.hasClass('disabled');

        // Passa para a próxima página
        page++;
    }

    // Retorna a lista de laptops ordenada por preço
    return allLaptops.sort((a, b) => a.price - b.price);
}
