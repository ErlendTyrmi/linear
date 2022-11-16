import { Box, Divider, List, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../assets/text';
import { NewsArticle } from '../entities/NewsArticle';
import { Cms_mock } from '../network/textCms_mock';
import { customColors } from '../theme';

const NewsPage = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);

    useEffect(() => {
        Cms_mock.getNews().then((result) => {
            setNews(result);
        });
    }, []);

    const items = (news as NewsArticle[])?.map((article: NewsArticle) => (
        <Box key={article.id} sx={{ marginBottom: 3, maxWidth: 600 }}>
            <Typography variant="h2">{article.header}</Typography>
            <Divider />
            {article.imageUrl && (
                <Box sx={{ height: '320px', overflow: 'hidden', backgroundImage: `url(${article.imageUrl})`, backgroundSize: 'cover' }}>{/* <img src={article.imageUrl} width="100%" /> */}</Box>
            )}
            <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                {article.body}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" textAlign="right" padding={1}>
                {article.author} | {article.date.getDate()} {appText.metaLocaleMonth(article.date.getMonth())} {article.date.getFullYear()}
            </Typography>
        </Box>
    ));

    return (
        <Box sx={{ marginLeft: 3, marginRight: 3 }}>
            <Typography variant="h1">{appText.newsTitleHeader()}</Typography>
            <List>{items}</List>
        </Box>
    );
};
export default observer(NewsPage);
