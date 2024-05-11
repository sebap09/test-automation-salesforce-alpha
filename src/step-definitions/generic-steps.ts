import { Given, When, Then } from '@wdio/cucumber-framework';
import { setWorldConstructor } from '@cucumber/cucumber';
import { expect } from 'chai';
import LoginPage from '../pages/login.page.ts';
import AccountPage from '../pages/account.page.ts';
import ProductPage from '../pages/product.page.ts';
import genericComponents from '../components/generic-components.js';
import { Button } from '../data/data-types';
import dataLoader from '../data/data-loader.ts'
import CustomWorld from "../../customWorld.ts";

const pages = {
    login: LoginPage,
    account: AccountPage,
    product: ProductPage
}

setWorldConstructor(CustomWorld);

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open(dataLoader.marketData[page].url);
});

When(/^I fill "(.*)" "(.*)" to "(\w+)" input field$/, async (user: "adminUser", value: string, name: string) => {
    const valuesMap = new Map<string, string>([
        ["login", dataLoader.marketData[user].username],
        ["password", dataLoader.marketData[user].password]
    ]);

    if(valuesMap.has(value))
        value=valuesMap.get(value) as string;

    await genericComponents.fillValueToInputFieldById(name,value);
});

When(/^I click "(\w+)" button$/, async (button: Button) => {
    await genericComponents.clickButtonByName(button);
});

When(/^I click "(\w+)" button from pop up$/, async (button: Button) => {
    await genericComponents.clickButtonFromPopUp(button);
});

When(/^I click "(\w+)" button of type input$/, async (button: Button) => {
    await genericComponents.clickButtonOfTypeInput(button);
});

When(/^I wait for a page to load$/, async () => {
    await browser.waitForAPageToLoad();
});

Then(/^I verify I am logged in$/, async () => {
    expect(await genericComponents.isHeaderDisplayed("oneHeader")).to.equals(true);
});

When(/^I click data target selection name of type "(\w+)", "(\w+)" and "(\w+)"$/, async (element: "StandardButton", object: "Account", label: "New") => {
    await genericComponents.clickDataTargetSelectionName(element, object, label);
});

When(/^I select "(.*)" from "(.*)" object form dropdown$/, async (value: "Competitor" | "Banking", label: "Type" | "Industry") => {
    await genericComponents.selectDropdownValue(label,value);
});

Then(/^I verify success toast with "(.*)" message$/, async function(message: "accountCreated" | "productCreated") {
    let placeholderValue: string;
    switch(message){
        case "accountCreated":
            placeholderValue = this.sharedSession.accountData.name;
            break;
        case "productCreated":
            placeholderValue = this.sharedSession.productData.name;
            break;
    }

    const validationMessage: string=dataLoader.marketValidationData.success[message].replace("PLACEHOLDER",placeholderValue);
    expect(await genericComponents.getSuccessToastText()).to.have.string(validationMessage);
});

When(/^I toggle checkbox with "(.*)" label to (true|false)$/, async (label: "Active", toBeChecked: "true" | "false") => {
    await genericComponents.toggleCheckboxByLabel(label,toBeChecked==="true");
});