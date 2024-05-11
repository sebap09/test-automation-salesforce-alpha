import Page from './page.js';

class ProductPage extends Page {
    public open(url: string) {
        return super.open(url);
    }
}

export default new ProductPage();
