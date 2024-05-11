import { browser } from '@wdio/globals'

export default class Page {
    public open (url: string) {
        return browser.url(url);
    }
}
