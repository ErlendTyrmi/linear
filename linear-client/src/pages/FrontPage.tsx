import { useEffect, useState } from 'react';
import { linearAPI } from '../network/api';

export const FrontPage = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        linearAPI.get('/weatherforecast').then((response: any) => {
            console.log(response.status);
            console.log(response.data);
            // if ((response.status as number) !== 200) {
            //     setData('No cookies 4 U');
            // } else {
            //     setData(response.data[0].date.toString());
            // }
        });
    }, []);

    return (
        <div>
            <h1>This is the content</h1>
            <p>{data}</p>
        </div>
    );
};
