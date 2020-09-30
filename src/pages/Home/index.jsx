import React, { useCallback } from 'react';
import Header from '../../components/Header';
import './index.css';
const HomePage = () => {

    const onBack = useCallback(() => {
        // window.history.back();
    }, []);

    return (
        <>
            <Header
                title="民生银行"
                onBack={onBack}
            />
            <h1 className="title">This is Home Page</h1>
        </>
    );
}

export default HomePage;