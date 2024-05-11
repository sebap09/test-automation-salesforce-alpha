import { Given, When, Then } from '@wdio/cucumber-framework';
import salesforceApiCalls from '../api/salesforce-api-calls.ts';

Given(/^I generate authorization token$/, async () => {
  await salesforceApiCalls.generateAuthorizationToken();
});

Given(/^I create Account through API$/, async () => {
  await salesforceApiCalls.createAccount();
});