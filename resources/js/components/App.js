import React from "react"
import ReactDOM from 'react-dom';
import Result from "./Result";


export default function App() {
    return (
        <div>
            <Result />         
        </div>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
