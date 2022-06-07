import React, {useEffect} from 'react';
import './App.css';
import {ScanbotSdkService} from "./services/scanbot-sdk-service";
import DocumentScannerComponent from "./components/document-scanner-component"


function App() {

    return (
        <DocumentScannerComponent></DocumentScannerComponent>
    );


}

export default App;
