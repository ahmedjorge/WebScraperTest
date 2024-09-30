import axios from 'axios';
import * as cheerio from 'cheerio';

type Laptop = {
    title: string;
    price: number;
    description: string;
    imageUrl: string,
    link: string;
    prices: HD[]
};

type HD = {
    volume: number,
    price?: number
}

function prepareString (str: string): string {
    return str.replace(/\s+/g, '').toLowerCase();
}

export async function Laptops(brand: string): Promise<Laptop[]> {
    let page = 1;
    let allLaptops: Laptop[] = [];
    let hasNextPage = true;

    let site = `https://webscraper.io`;
    brand = prepareString(brand);

    while (hasNextPage) {
        let url = `${site}/test-sites/e-commerce/static/computers/laptops?page=${page}`;
        let { data } = await axios.get(url);
        let $ = cheerio.load(data);

        $('.card.thumbnail').each( async (_, element) => {
            let title = $(element).find('.caption h4 a').attr("title") || "";
            let price = +($(element).find('.caption .price').text().replace('$', '') || 0);
            let link = $(element).find('.caption a[href]').attr('href') || '';
            let description = $(element).find('.caption p').text();
            let imageUrl = $(element).find('img').attr('src') || '';

            let linkProd = `${site}${link}`;
            let { data } = await axios.get(linkProd);
            let $$ = cheerio.load(data);
            let hds : HD[] = [];

            $$(".swatches").find(".swatch").map((_, element)=> {
                if(!$$(element).is(":disabled")){
                    let volume = +($$(element).attr("value") || 0);
                    let priceByHD = price;

                    if(volume === 256){
                        priceByHD += 20;
                    }else if(volume === 512){
                        priceByHD += 40;
                    }else if(volume === 1024){
                        priceByHD += 60;
                    }

                    hds.push({
                        volume: +volume,
                        price: priceByHD
                    })
                }
            });

            console.log(hds);

            allLaptops.push( {
                title,
                price: +price,
                description,
                imageUrl: `${site}${imageUrl}`,
                link: linkProd,
                prices: hds
            });
        });

        let nextPageButton = $('.pagination li').last();

        hasNextPage = !nextPageButton.hasClass('disabled');
        page++;

    }

    let laptops = allLaptops.filter(({title, description}) => prepareString(title).includes(brand) || prepareString(description).includes(brand))

    return laptops.sort((a, b) => a.price - b.price);
}
