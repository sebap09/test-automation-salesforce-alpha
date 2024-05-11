import { $ } from '@wdio/globals'
import { Button } from '../data/data-types';
import logger from '../../logger.ts';

class GenericComponents{
    
    /**
     * define selectors using getter methods
     */
    private get successToast () {
        return $(`//div[@role='alertdialog' and @data-key='success']/div[contains(@class,'toastContent')]`);
    }

    /**
     * define selectors using getter methods with arguments
     */

    private getButtonByName(name: Button) {
        return $(`//button[@name='${name}']`);
    }

    private getButtonFromPopUp(title: Button) {
        return $(`//div[@class='actionsContainer']//button[@title='${title}']`);
    }

    private getInputById(id: string | Button) {
        return $(`//input[@id='${id}']`);
    }

    private getInputByName(name: string) {
        return $(`(//input[@name='${name}'])[1]`);
    }

    private getInputByLabel(label: string) {
        return $(`//label/span[text()='${label}']/../following-sibling::input`);
    }

    private getTextAreaByName(name: string) {
        return $(`(//textarea[@name='${name}'])[1]`);
    }

    private getTextAreaByLabel(label: string) {
        return $(`//label/span[text()='${label}']/../following-sibling::textarea`);
    }

    private getHeaderById(id: "oneHeader") {
        return $(`//header[@id='${id}']`);
    }

    private getDataTargetSelectionName(element: string, object: string, label: string) {
        return $(`//*[@data-target-selection-name='sfdc:${element}.${object}.${label}']`);
    }

    private getDropdownButton(label: string) {
        return $(`//button[@role='combobox' and contains(@aria-label,'${label}')]`);
    }

    private getDropdownOptions(label: string) {
        return $$(`//div[contains(@class,'slds-is-open')]/div[contains(@aria-label,'${label}')]/lightning-base-combobox-item`);
    }

    private getCheckboxByLabel(label: string) {
        return $(`//label/span[text()='${label}']/../following-sibling::input[@type='checkbox']`);
    }

    /**
     * element methods
     */

    public async fillValueToInputFieldById(id: string, value: string){
        await this.getInputById(id).setValue(value);
    }

    public async fillValueToInputFieldByName(name: string, value: string){
        await this.getInputByName(name).setValue(value);
    }

    public async fillValueToInputFieldByLabel(label: string, value: string){
        await this.getInputByLabel(label).setValue(value);
    }

    public async fillValueToTextAreaByName(name: string, value: string){
        await this.getTextAreaByName(name).setValue(value);
    }

    public async fillValueToTextAreaByLabel(label: string, value: string){
        await this.getTextAreaByLabel(label).setValue(value);
    }

    public async clickButtonByName(name: Button){
        await (await this.getButtonByName(name)).click();
    }

    public async clickButtonFromPopUp(title: Button){
        await (await this.getButtonFromPopUp(title)).click();
    }

    public async clickButtonOfTypeInput(name: Button){
        await (await this.getInputById(name)).click();
    }

    private async clickDropdownButton(label: string){
        await (await this.getDropdownButton(label)).click();
    }

    private async clickDropdownOption(label: string,value: string){
        (await this.getDropdownOptions(label)).forEach(async (element) => {
            if(await element.getText()===value){
                logger.info("Clicking ["+(await element.getText())+ "] value");
                await element.click();
            }
        });
    }

    private async waitForDropdownOptions(label: string){
        (await this.getDropdownOptions(label)).forEach(async (element) => await element.waitForDisplayed({
            timeout: 6_000,
            interval: 1_000
        }))
    }

    private async waitForDropdownButtonAttribute(label: string, attribute: string, value: string){
        return (await this.getDropdownButton(label)).waitForAnAttribute(attribute,value);
    }

    public async selectDropdownValue(label: string, value: string){
        await this.clickDropdownButton(label);
        await this.waitForDropdownOptions(label);
        await this.clickDropdownOption(label,value);
        await this.waitForDropdownButtonAttribute(label,"data-value",value);
    }

    public async isHeaderDisplayed(id: "oneHeader"){
        await (await this.getHeaderById(id)).waitForDisplayed();
        return (await this.getHeaderById(id)).isDisplayed();
    }

    public async clickDataTargetSelectionName(element: string, object: string, label: string){
        await (await this.getDataTargetSelectionName(element,object,label)).click();
    }

    public async getSuccessToastText(){
        return (await this.successToast).getText();
    }

    public async toggleCheckboxByLabel(label: string, toBeChecked: boolean){
        const currentStatus: boolean=(await (await this.getCheckboxByLabel(label)).isSelected());

        if(currentStatus!==toBeChecked)
            await (await this.getCheckboxByLabel(label)).click();

        await browser.waitForAPageToLoad();
    }

}

export default new GenericComponents();