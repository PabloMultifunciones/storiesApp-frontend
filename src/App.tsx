import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Historys from './pages/Historys';
import Charts from './pages/Charts';
import Login from './pages/Login';
import Navbar from './components/navbar';

function App(props?: any) {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const cookies = new Cookies();
            const token: string = await cookies.get('Token');
            setIsLogged(token !== undefined);
        }
        fetchData();
    }, [props]);

    return (
        <Router>
            <div className='App'>
                {isLogged ? (
                    <>
                        <Navbar />
                        <Routes>
                            <Route
                                path='/historys'
                                element={<Historys />}
                            ></Route>
                            <Route path='/charts' element={<Charts />}></Route>
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path='/register' element={<Charts />}></Route>
                        <Route path='/*' element={<Login />}></Route>
                    </Routes>
                )}
            </div>
        </Router>
    );
}

const mapStateToProps = (props: any) => props.loginReducer;

export default connect(mapStateToProps, null)(App);
