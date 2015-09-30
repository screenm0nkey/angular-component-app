'use strict';

describe('Header - Actions menu', function(){
	var page = new protractor.Page('slgrid', 'sl-grid/column-configurator');

	it('should open column configurator', function(){
//        browser.refresh();
		var modal = page.slgrid.openColumnConfigurator();

        expect(modal.isOpen()).toBeTruthy();
	});
});




