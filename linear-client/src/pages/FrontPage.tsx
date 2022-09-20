import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import store from '../stores/store';

const FrontPage = () => {
    const [dirty, setDirty] = useState(false);
    useEffect(() => {
        if (dirty === false || store.test.data === '') store.test.getTest();
        setDirty(true);
    }, []);

    return (
        <div>
            <h1>This is the content</h1>
            <p>{store.test.data}</p>
        </div>
    );
};

export default observer(FrontPage);
