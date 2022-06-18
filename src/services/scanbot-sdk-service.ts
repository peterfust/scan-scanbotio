import ScanbotSDK from "scanbot-web-sdk/webpack";
import {
    DocumentScannerConfiguration,
    IDocumentScannerHandle,
    PdfGenerationOptions,
    PdfGenerator
} from "scanbot-web-sdk/@types";
import {ImageUtils} from "../utils/image-utils";


export class ScanbotSdkService {

    public static instance = new ScanbotSdkService();

    static DOCUMENT_SCANNER_CONTAINER = "document-scanner-view";
    documentScanner?: IDocumentScannerHandle;

    license = "g8q1VWdM1l2PAW9oKbjcYYgxBTy0zq" +
        "4Je+DnSEamaMEW76Cll4RqdzMxEYF/" +
        "FZHnhU7t/Zt/vKDCR7U0DSEwOp2K38" +
        "C1AGBM3HqST/aDohUlBimMLYOqLuYv" +
        "PgqiyLEdyH90pZrv1HmONekPYo5MAQ" +
        "SW5oUXU0GEud+7zGCqi4Um9zwgOkjS" +
        "5KETmRhhn+hmpg9CRNA4zK24ukorTN" +
        "FxxFhe0YHeXwkMgOwzD00jfVpxbq1l" +
        "i8Ce0nmPfg9Ilo1+O0Xdydu332Usmp" +
        "BE1DO256tauqDwBddBbtLowsfNaPQV" +
        "DKQrKnAwcD/H/FYKVLggMCORk47e0z" +
        "9KuK5be1/nIw==\nU2NhbmJvdFNESw" +
        "psb2NhbGhvc3R8c2Nhbi1zY2FuYm90" +
        "aW8udmVyY2VsLmFwcAoxNjU2MjAxNT" +
        "k5CjgzODg2MDcKOA==\n";

    sdk?: ScanbotSDK;

    public async initialize() {
        this.sdk = await ScanbotSDK.initialize({
            licenseKey: this.license,
            engine: "/",
        });
        return this.sdk;
    }

    public async createDocumentScanner(detectionCallback: any, errorCallback: (e: Error) => void) {
        const config: DocumentScannerConfiguration = {
            onDocumentDetected: detectionCallback,
            containerId: ScanbotSdkService.DOCUMENT_SCANNER_CONTAINER,
            text: {
                hint: {
                    OK: "Capturing your document...",
                    OK_SmallSize: "The document is too small. Try moving closer.",
                    OK_BadAngles:
                        "This is a bad camera angle. Hold the device straight over the document.",
                    OK_BadAspectRatio:
                        "Rotate the device sideways, so that the document fits better into the screen.",
                    OK_OffCenter: "Try holding the device at the center of the document.",
                    Error_NothingDetected:
                        "Please hold the device over a document to start scanning.",
                    Error_Brightness: "It is too dark. Try turning on a light.",
                    Error_Noise: "Please move the document to a clear surface.",
                },
            },
        };

        if (this.sdk) {
            try {
                this.documentScanner = await this.sdk!.createDocumentScanner(config);
            } catch (e) {
                errorCallback(e as Error);
            }
        }
    }

    public disposeDocumentScanner() {
        this.documentScanner?.dispose();
    }

    async setLicenseFailureHandler(callback: any) {
        await this.setLicenceTimeout(callback);
    }

    private async setLicenceTimeout(callback: any) {
        // Scanbot WebSDK does not offer real-time license failure handler. Simply loop to check it manually
        const info = await this.sdk?.getLicenseInfo();
        if (info && info.status !== "Trial" && info.status !== "Okay") {
            callback(info.description);
        } else {
            setTimeout(() => {
                this.setLicenceTimeout(callback);
            }, 2000);
        }
    }

    async generatePDF(pages: any[]) {
        const options: PdfGenerationOptions = {
            standardPaperSize: "A4",
            landscape: true,
        };
        const generator: PdfGenerator = await this.sdk!.beginPdf(options);

        for (const page of pages) {
            let image = page.filtered ?? page.cropped ?? page.original;
            image = await ImageUtils.downscale(this.sdk!, image);
            await generator.addPage(image);
        }

        return await generator.complete();
    }

    async createBlurDetector() {
        return this.sdk?.createBlurDetector();
    }
}