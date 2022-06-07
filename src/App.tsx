import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ScanbotSDK from 'scanbot-web-sdk/webpack'

function App() {

    const [scanbotSDK, setScanbotSDK] = useState(new ScanbotSDK());

    useEffect(() => {    
        const LICENSE_KEY =
            "dni/lQpDfFMEfDd2bLLgnTPOCv71vY" +
            "1KxHqjdfbVToNc7yPEO1iOVZKS6jjn" +
            "J9AQUYYlTh+t5IsoUifswgcUU5zDBF" +
            "FfekIr/5rGa00ZDXLDKdcwEV+Jr3yl" +
            "aBEv1PnO9nuL3K+8izhrhnlrr3RLsR" +
            "mDASJrU4773HuFeQi1+usrQFUUdL/b" +
            "FdaREUG2KFE+kmLBBAXYTDDVjytJTU" +
            "Y1dTK0Id6AFU76uU8CkQ9/b/2R9mnd" +
            "ZNptsPQqNyjQsIkrBQN+yBtih80jqi" +
            "mO/8ucQUkq3GhPLHi9NVoqz+yf+3hY" +
            "14tlUPQRUlj26E+XQoHhXTNKbH1zHn" +
            "Mvm+NuP2R9nQ==\nU2NhbmJvdFNESw" +
            "psb2NhbGhvc3R8d3d3LmV4YW1wbGUu" +
            "Y29tCjE2NTUyNTExOTkKODM4ODYwNw" +
            "o4\n";
        const init = async () => {
            let scanbotSDK = await ScanbotSDK.initialize({
                licenseKey: LICENSE_KEY,    
                // optional engine path where ScanbotSDK.Core.js and ScanbotSDK.Asm.wasm are served    
                engine: "static/js/"
            });
            setScanbotSDK(scanbotSDK);
        }
        init()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        </div>
    );
}

export default App;
