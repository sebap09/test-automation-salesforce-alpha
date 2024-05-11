import axios, { AxiosError, AxiosResponse } from "axios";
import logger from "../../../logger.ts";
import dataLoader from "../../data/data-loader.ts";


async function createRequest(method:string, url: string, body: any, headers?: any){
    const baseURL: string = `${dataLoader.orgData.domainName}`;
    const response = await axios({
        method: method,
        url: `${baseURL}${url}`,
        headers: headers,
        data: body
    })
    .then(async function (response: AxiosResponse) {
        logger.info(`Request fulfilled successfully with status: ${response.status}`);
        return response.data;
    })
    .catch(async function (error: AxiosError) {
        if(error.response){
            logger.error("Request was made and the server responded with a status code!");
            logger.error(`Error status: ${error.response.status}`);
            logger.error(`Error data: ${JSON.stringify(error.response.data)}`);
            logger.error(`Error headers: ${JSON.stringify(error.response.headers)}`);
        } else if(error.request){
            logger.error("Request was made but no response was received!");
            logger.error(`Error data: ${JSON.stringify(error.request)}`);
        }else{
            logger.error("Something happened in setting up the request that triggered an Error!");
            logger.error(`Error message: ${error.message}`);
        }
    });

    return response;
}

export async function get(url: string, body: any, headers?: any){
        return createRequest("get",url,body,headers);
}

export async function post(url: string, body: any, headers?: any){
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    return createRequest("post",url,body,headers);
}

export async function put(url: string, body: any, headers?: any){
    return createRequest("put",url,body,headers);
}

export async function remove(url: string, body: any, headers?: any){
    return createRequest("delete",url,body,headers);
}