import axios from 'axios';
import logger from '../../logger.ts';
import dataLoader from '../data/data-loader.ts'
import { post } from "../utils/http-requests/crud-helper.ts";

class SalesforceApiCalls{
    public async generateAuthorizationToken(){
        const result=await post(`${dataLoader.orgData.authEndpoint}`,
        {
            grant_type:"client_credentials",
            client_id:process.env.CONSUMER_KEY as string,
            client_secret:process.env.CONSUMER_SECRET as string
        },
        {
            "Content-Type":"application/x-www-form-urlencoded"
        }
                    
        );
        const access_token: string=result["access_token"];

        if(access_token!==undefined){
            logger.info("Access token fetched!")
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
    }

    public async createAccount(){
        const accountData = dataLoader.generateAccountData();

        await post(`${dataLoader.marketData.account.apiUrl}`,dataLoader.marketData.account.defaultData);
    }
}

export default new SalesforceApiCalls();