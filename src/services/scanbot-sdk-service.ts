import ScanbotSDK from "scanbot-web-sdk/webpack";

export class ScanbotSdkService {

    public static instance = new ScanbotSdkService();

    license = "dni/lQpDfFMEfDd2bLLgnTPOCv71vY" +
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

    sdk?: ScanbotSDK;

    public async initialize() {
        this.sdk = await ScanbotSDK.initialize({
            licenseKey: this.license,
            engine: "/",
        });
        return this.sdk;
    }
}