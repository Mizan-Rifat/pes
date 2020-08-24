import React from "react"
import ReactDOM from 'react-dom';
import Routes from "./Routes";


import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {reducers} from '@reducers';

const adminStore = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk)),
)


export default function App() {
    return (
        <Provider store={adminStore}>
            <Routes />
        </Provider>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
