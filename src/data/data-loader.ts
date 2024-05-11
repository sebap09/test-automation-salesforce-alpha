import { faker } from '@faker-js/faker';
import data from '../../resources/data.json' with { type: "json" }; ;
import validationData from '../../resources/validation-messages.json' with { type: "json" };
import logger from "../../logger.ts";

class DataLoader {
    orgData: any;
    marketData: any;
    marketValidationData: any;
    public loadMarketData(){
        const org: string=process.env.ORG ?? "";
        const market: string=process.env.MARKET ?? "";

        const orgData=data[org as keyof typeof data];
        this.orgData=orgData;

        this.marketData=orgData[market as keyof typeof orgData];
        logger.info("Loading market data: " + JSON.stringify(this.marketData));

        const orgValidationData=validationData[org as keyof typeof validationData];
        this.marketValidationData=orgValidationData[market as keyof typeof orgValidationData];
        logger.info("Loading validation data: " + JSON.stringify(this.marketValidationData));
    }

    public generateAccountData(){
        let data = this.marketData.account.defaultData;
        data.Name = `${faker.company.name()} API created`;
        return data;
    }
}

export default new DataLoader();