import { Given, When, Then } from '@wdio/cucumber-framework';
import { faker } from '@faker-js/faker';
import genericComponents from '../components/generic-components.js';

When(/^I fill "(.*)" to "(.*)" product form input field$/, async function(
    value: "Random Product Name" | "Random Product Code", 
    label: "Product Name" | "Product Code") {
    let updatedValue: string=value;
    
    const valuesMap = new Map<string, string>([
        ["Random Product Name", faker.commerce.productName()],
        ["Random Product Code", faker.string.numeric()]
    ]);

    if(valuesMap.has(updatedValue))
        updatedValue=valuesMap.get(value) as string;

    switch(value){
        case "Random Product Name":
            const productData={name:valuesMap.get(value)};
            this.sharedSession.productData=productData;
            break;
    }

    await genericComponents.fillValueToInputFieldByLabel(label,updatedValue);
});

When(/^I fill "(.*)" to "(.*)" product form text area$/, async (value: "Random Product Description", label: "Product Description") => {
    let updatedValue: string=value;

    const valuesMap = new Map<string, string>([
        ["Random Product Description", faker.commerce.productDescription()]
    ]);

    if(valuesMap.has(updatedValue))
        updatedValue=valuesMap.get(value) as string;


    await genericComponents.fillValueToTextAreaByLabel(label,updatedValue);
});