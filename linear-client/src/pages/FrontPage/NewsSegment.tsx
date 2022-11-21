import { Box, Typography, Divider, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../assets/appText';
import { NewsArticle } from '../../entities/NewsArticle';
import { Cms_mock } from '../../network/textCms_mock';

const NewsSegment = () => {
    const navigate = useNavigate();
    const [article, setArticle] = useState<NewsArticle>();

    useEffect(() => {
        Cms_mock.getNews().then((result) => {
            if (result.length > 0) setArticle(result[0]);
        });
    }, []);

    return (
        <div>
            <Typography variant="h2">{appText.newsTitleHeader()}</Typography>
            <Divider />
            <Box sx={{ paddingTop: 1 }}>
                {article?.header && (
                    <div>
                        <Typography variant="h3">{article.header}</Typography>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                            {article.body}
                        </Typography>
                    </div>
                )}
            </Box>
            <Button
                size="small"
                sx={{ paddingLeft: 0 }}
                onClick={() => {
                    navigate('/news');
                }}
            >
                {appText.statusReadMore()}
            </Button>
        </div>
    );
};

export default observer(NewsSegment);
