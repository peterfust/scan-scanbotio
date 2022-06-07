import React, {useEffect} from "react";
import { ScanbotSdkService } from "../services/scanbot-sdk-service";
import { DocumentDetectionResult } from "scanbot-web-sdk/@types";

function onDocumentDetected(result: DocumentDetectionResult) {
   console.log("Document detected: ", result)
  }

function onDocumentDetectionError(e: Error) {
    console.log(e.name + ': ' + e.message);
  }
function DocumentScannerComponent() {
    
    useEffect(() => {
        const init = async () => {
            await ScanbotSdkService.instance.createDocumentScanner(
                onDocumentDetected,
                onDocumentDetectionError,
            );
            await ScanbotSdkService.instance.setLicenseFailureHandler((error: any) => {
                console.log('Handler.....')
            });
        }
        init()
            // make sure to catch any error
            .catch(console.error); 
    }, []);



    return (
      <div style={{ height: "100%" }}> 
        <div
          id={ScanbotSdkService.DOCUMENT_SCANNER_CONTAINER}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
}
export default DocumentScannerComponent; 