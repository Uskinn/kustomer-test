import {
    expect
} from 'chai';

import exp from '../expected/client.exp';
import clientSel from '../selectors/client.sel';

// Check if we are on tne kustomer.com website. More checks could/should be added.
describe('ELEMENTS EXISTS', () => {

    it('Request Demo Btn Nav Bar', () => {
        browser.url('/');
        let requestDemoBtnNavBar = $(clientSel.requestDemoBtn).isDisplayed();
        expect(requestDemoBtnNavBar).to.exist;
    });

    it('Favicon', function () {
        browser.url('/favicon.ico');
        let icon = $(clientSel.faviconImg);
        let width = icon.getCSSProperty('width').parsed.value;
        let height = icon.getCSSProperty('height').parsed.value;
        let size = `${width}x${height}`;
        expect(size).to.equal(exp.faviconSize);
    });
});