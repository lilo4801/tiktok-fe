import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from './store/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const userAlreadyLogin = async () => {
            try {
                const action = getMe();
                const actionResult = await dispatch(action);
                const result = unwrapResult(actionResult);
            } catch (error) {}
        };
        userAlreadyLogin();
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
