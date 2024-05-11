import { Given, When, Then } from '@wdio/cucumber-framework';
import { faker } from '@faker-js/faker';
import genericComponents from '../components/generic-components.js';

When(/^I fill "(.*)" to "(.*)" account form input field$/, async function(
    value: "Random Account Name" | "Random Phone Number" | "Random Postal Code" | "Random City" | "Random Province" | "Random Country", 
    name: "Name") {
    let updatedValue: string=value;
    
    const valuesMap = new Map<string, string>([
        ["Random Account Name", faker.company.name()],
        ["Random Phone Number", faker.phone.number()],
        ["Random Postal Code", faker.location.zipCode()],
        ["Random City", faker.location.city()],
        ["Random Province", faker.location.state()],
        ["Random Country", faker.location.country()],
    ]);

    if(valuesMap.has(updatedValue))
        updatedValue=valuesMap.get(value) as string;

    switch(value){
        case "Random Account Name":
            const accountData={name:valuesMap.get(value)};
            this.sharedSession.accountData=accountData;
            break;
    }

    await genericComponents.fillValueToInputFieldByName(name,updatedValue);
});

When(/^I fill "(.*)" to "(.*)" account form text area$/, async (value: "Random Street", name: "Name") => {
    let updatedValue: string=value;

    const valuesMap = new Map<string, string>([
        ["Random Street", faker.location.street()]
    ]);

    if(valuesMap.has(updatedValue))
        updatedValue=valuesMap.get(value) as string;


    await genericComponents.fillValueToTextAreaByName(name,updatedValue);
});