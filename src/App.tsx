import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ScanbotSDK from 'scanbot-web-sdk/webpack'
import {ScanbotSdkService} from "./services/scanbot-sdk-service";
import DocumentScannerComponent from "./components/document-scanner-component"


 
function App() {
    
    
    const [scanbotSDK, setScanbotSDK] = useState(new ScanbotSDK());

    useEffect(() => {    
        const init = async () => {
            let scanbotSDK = await ScanbotSdkService.instance.initialize();
            //setScanbotSDK(scanbotSDK);
        }
        init()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    return ( 
        <DocumentScannerComponent></DocumentScannerComponent> 
    );

    
}

export default App;
