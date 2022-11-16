// "Latest news" from mocked CMS system

import { NewsArticle } from '../entities/NewsArticle';

const newsMockArtice1Header = 'Stacking i februar';
const newsMockArticle1ImageUrl = 'https://tech.ebu.ch/files/live/sites/tech/files/shared/other/TV-cameras-in-studio.jpg';
const newsMockArtice1Body =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
const author1 = 'Frida Engell';
const newsMockArtice2Header = 'Nyt produkt fra den første mai: Sport Exclusive';
const newsMockArticle2ImageUrl = 'https://payload.cargocollective.com/1/15/490587/10129195/IMG_9725_1000.JPG';
const newsMockArtice2Body =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
const author2 = 'Bo Jensen';

const news: NewsArticle[] = [
    { id: 1, header: newsMockArtice1Header, imageUrl: newsMockArticle1ImageUrl, body: newsMockArtice1Body, author: author1, date: new Date('2022-12-04') },
    { id: 2, header: newsMockArtice2Header, imageUrl: newsMockArticle2ImageUrl, body: newsMockArtice2Body, author: author2, date: new Date('2022-12-01') },
    { id: 3, header: newsMockArtice1Header, imageUrl: null, body: newsMockArtice1Body, author: author2, date: new Date('2022-11-30') },
    { id: 4, header: newsMockArtice2Header, imageUrl: newsMockArticle1ImageUrl, body: newsMockArtice2Body, author: author1, date: new Date('2022-11-18') }
];

export const Cms_mock = {
    async getNews() {
        return news;
    }
};
