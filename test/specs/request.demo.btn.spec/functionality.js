import {
    expect
} from 'chai';

import clientSel from '../../selectors/client.sel';
import reqFormSel from '../../selectors/req.demo.form.sel';
import constElem from '../constants';
import reqFormData from '../../data/request.form.data';
import errorsExp from '../../expected/errors.contact.form.exp';
import errorSel from '../../selectors/errors.contact.form.sel';

describe('Request Demo Btn Nav Bar redirects from Home Page to Demo Page', () => {

    it('Should redirect from Home Page to Demo Page', () => {
        browser.url('/');
        let requestDemoBtnNavBar = $(clientSel.requestDemoBtn);
        requestDemoBtnNavBar.waitForDisplayed(3000);
        requestDemoBtnNavBar.click();
        expect(constElem.demoUrl).to.equal(browser.getUrl());
    });
});

describe('Request Demo Btn Action - Demo Page - Form Section - Submit Request ', () => {

    it('Should displayed <Must be valid email. example@yourdomain.com> notification when user set invalid email', () => {
        browser.url(constElem.demoUrl);

        $(clientSel.demoPageH1).scrollIntoView();
        $(reqFormSel.firstNameField).setValue(reqFormData.firstName);
        $(reqFormSel.lastNameField).setValue(reqFormData.lastName);
        $(reqFormSel.phoneField).setValue(reqFormData.phoneNumber);
        $(reqFormSel.businessEmailField).setValue(reqFormData.businessEmail);
        $(reqFormSel.companyNameField).setValue(reqFormData.companyName);
        $(reqFormSel.sizeOfSupportTeamField).click();
        $(reqFormSel.sizeOfSupportTeamField).selectByVisibleText(reqFormData.sizeOfSupportTeam);
        $(reqFormSel.countryField).click();
        $(reqFormSel.countryField).selectByVisibleText(reqFormData.country);
        // Click outside of the dropdown menu to close it.
        $("//body").click();

        // Close the Set Cookie notification
        $(clientSel.cookieSel).click();

        let requestDemoBtn = $(reqFormSel.requestDemoSubmitBtn);
        requestDemoBtn.scrollIntoView(false);
        requestDemoBtn.waitForDisplayed(3000);
        requestDemoBtn.click();

        // Compare email field error message - actual to expexted
        $(errorSel.errorEmailSel).waitForDisplayed(3000);
        let actualText = $(errorSel.errorEmailSel).getText();
        expect(actualText).to.equal(errorsExp.errorEmailMsg);
    });
});