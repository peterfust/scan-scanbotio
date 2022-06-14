import {DocumentDetectionResult} from "scanbot-web-sdk/@types";
import React, {useEffect} from "react";
import Button from "../button/Button";
import "./Scanner.css"
import axios from "axios";
import Pages from "../../model/pages";
import {ScanbotSdkService} from "../../services/scanbot-sdk-service";

export interface IMetadata {
    fileName: string,
    customerId: string,
    consultantId: string,
    processId: string
}

export const Scanner = () => {

    useEffect(() => {

        const init = async () => {
            await ScanbotSdkService.instance.initialize();

        }
        init()
            // make sure to catch any error
            .catch(console.error);
    }, [])


    const scanDocument = async () => {
        await ScanbotSdkService.instance.createDocumentScanner(
            onDocumentDetected,
            onDocumentScannerError,
        );
    }

    const onDocumentScannerError = (e: Error) => {
        console.log(e.name + ': ' + e.message);
        alert(e.name + ': ' + e.message);

        ScanbotSdkService.instance.disposeDocumentScanner()
    }

    const onDocumentDetected = async (result: DocumentDetectionResult) => {
        Pages.instance.add(result);
        ScanbotSdkService.instance.sdk?.utils.flash();

        const blurDetector = await ScanbotSdkService.instance.createBlurDetector();
        console.log('estimateBlurrinessOnBuffer', await blurDetector?.estimateBlurrinessOnBuffer(result.original));
        await blurDetector?.release();
    }

    const upload = async () => {
        if (Pages.instance.get().length > 1) {
            const bytes = await ScanbotSdkService.instance.generatePDF(
                Pages.instance.get()
            );

            let search = window.location.search;
            let params = new URLSearchParams(search);
            let customerId = params.get('customerId') || '';
            let consultantId = params.get('consultantId') || '';

            const blob = new Blob([bytes], {type: `application/pdf`});
            uploadBlob(blob, {processId: 'TEST', fileName: 'test.pdf', customerId, consultantId})
        }
    }

    const uploadBlob = (file: Blob, metadata: IMetadata) => {
        let data = new FormData();
        data.append('metadata', JSON.stringify(metadata));
        data.append('file', file, metadata.fileName);
        axios.post("/path/to/api", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    return (
        <div>
            <div
                id={ScanbotSdkService.DOCUMENT_SCANNER_CONTAINER}
                style={{width: "100%", height: "100%"}}
            />
            <div className="controlbar">
                {/* @ts-ignore */}
                <Button onClick={scanDocument}>Scan your Documents</Button>
                {/* @ts-ignore */}
                <Button onClick={upload}>Send to AXA</Button>
            </div>
        </div>
    );
}
