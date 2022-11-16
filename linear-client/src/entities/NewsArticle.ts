export interface NewsArticle {
    id: number;
    header: string;
    imageUrl: string | null;
    body: string;
    author: string;
    date: Date;
}
