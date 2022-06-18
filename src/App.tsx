import React, {useEffect} from 'react';
import './App.css';
import {Scanner} from "./components/scanner/Scanner";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {Layout} from "./pages/Layout";
import {QrCodeGenerator} from "./components/qrcodegenerator/QrCodeGenerator";
import {ScanbotSdkService} from "./services/scanbot-sdk-service";
import {render} from "react-dom";

function App() {


    useEffect(() => {
        const init = async () => {
            console.log("initializing scanbot sdk")
            await ScanbotSdkService.instance.initialize();
            console.log("scanbot initialized")

        }

        const verifyLicence = async () => {
            await ScanbotSdkService.instance.setLicenseFailureHandler((error: any) => {
               console.log("License has been expired" +  error)
            });
        }
        init()
            // make sure to catch any error
            .catch(console.error);
        verifyLicence().catch(console.error);
    }, [])

        return (
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Scanner/>}/>
                    <Route path="qrcode" element={<QrCodeGenerator/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );



}

export default App;
