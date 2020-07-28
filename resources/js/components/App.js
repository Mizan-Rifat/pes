import React from "react"
import ReactDOM from 'react-dom';
import Routes from "./Routes";


export default function App() {
    return (
        <Routes />
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
