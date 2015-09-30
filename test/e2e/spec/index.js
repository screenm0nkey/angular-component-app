'use strict';

describe('angular-cmelion generator homepage', function () {
    var page = new protractor.Page();
      // enable this when debugging browser issues. due to $timeout bug angular is never ready.

    it('should have page title', function () {
        expect(page.getTitle()).toEqual('Sales Link 2');
    });

    it('should have app component', function () {
        expect(browser.isElementPresent(by.css('.app-component'))).toBe(true);
    });

    it('should have inquiry grid', function () {
        expect(browser.isElementPresent(by.css('[grid-name="inquiryGrid"]'))).toBe(true);
    });

    it('should have traderAxe grid', function () {
        expect(browser.isElementPresent(by.css('[grid-name="traderAxeGrid"]'))).toBe(true);
    });

    it('should have tickerActivity grid', function () {
        expect(browser.isElementPresent(by.css('[grid-name="tickerActivityGrid"]'))).toBe(true);
    });

    it('should have clientActivity grid', function () {
        expect(browser.isElementPresent(by.css('[grid-name="clientActivityGrid"]'))).toBe(true);
    });

    it('should have trader simpleMatches grid', function () {
        expect(browser.isElementPresent(by.css('[grid-name="simpleMatchesGrid"]'))).toBe(true);
    });
});

