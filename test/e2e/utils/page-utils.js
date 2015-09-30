/* jshint ignore:start */
'use strict';

var pageObjectUtils = {

	/*
		checks element for attribute and attribute value. returns boolean.
		protractor.utils.elementHasAttribute({
		 	css : '.clients-menu-component',
		 	attr : 'list-visible',
			attrVal : 'true'
		});
	 */
    elementHasAttribute : function(opts){
		opts = opts || opts;
		var deferred = protractor.promise.defer();

		element(by.css(opts.css))
			.getAttribute(opts.attr)
			.then(function(attr){
				deferred.fulfill(attr === opts.attrVal);
			});

		return deferred.promise;
	},

    // even though the disabled dom atrribute is disabled="disabled" the actual
    // property value is either 'true' for disabled or null
    elementIsEnabled : function(css){
        return pageObjectUtils.elementHasAttribute({
            css : css,
            attr : 'disabled',
            attrVal : null
        });
    },


	/*
 		finds dom elements. returns the count length of the search.
	 	protractor.utils.getItemCount('div.client.link');
		protractor.utils.getItemCount({
		 	modelName: 'vm.bloombergPanel',
		 	css: 'option'
		})
	 */
	getItemCount : function (opts) {
		opts = opts || opts;
		var deferred = protractor.promise.defer();

		if (opts.modelName) {
			element(by.model(opts.modelName)).all(by.css(opts.css)).then(function (options) {
				deferred.fulfill(options.length);
			});
		} else {
			if (Object.prototype.toString.call(opts).slice(8,-1) === 'String') {
				element.all(by.css(opts)).then(function(items){
					deferred.fulfill(items.length);
				});
			}
		}

		return deferred.promise;
	},

    /*
     returns the item count in an ng-repeat list.
     protractor.utils.getNgRepeatItemCount('cs in vm.somelist');
     */
    getNgRepeatItemCount : function (repeater) {
        var deferred = protractor.promise.defer();

        element.all(by.repeater(repeater)).then(function(rows) {
            deferred.fulfill(rows.length);
        });

        return deferred.promise;
    },


	/*
		finds element in ng-repeat. searches by 'itemText'. returns boolean.
		 protractor.utils.findItemInNgRepeat({
			 ngRepeat: 'settings in vm.userSettings',
			 tagName: 'span',
			 itemText: 'Bloomberg'
		 })
	 */
	findItemInNgRepeat : function (opts) {
		opts = opts || opts;
		var deferred = protractor.promise.defer();

		var items = element.all(by.repeater(opts.ngRepeat)).map(function (elm) {
			return elm.element(by.css(opts.tagName)).getText();
		});

		items.then(function (result) {
			result = result.indexOf(opts.itemText)>=0;
			if (!result) {
				console.error(['Cannot find "', opts.itemText, '" in ng-repeat for "', opts.ngRepeat, '"'].join(''));
			}
			deferred.fulfill(result);
		});

		return deferred.promise;
	},



	/*
		finds item in a list using text value. searches by 'itemText'. returns boolean.
		 protractor.utils.findItemInList({
			 css: '.clients-list span',
			 itemText: 'Primary'
		 });
	 */
	findItemInList : function (opts) {
		opts = opts || opts;
		var deferred = protractor.promise.defer();

		var items = element.all(by.css(opts.css)).map(function (elm) {
			return elm.getText();
		});

		items.then(function (result) {
			result = result.indexOf(opts.itemText)>=0;
			if (!result) {
				console.error(['Cannot find "', opts.itemText, '" using css "', opts.css, '"'].join(''));
			}
			deferred.fulfill(result);
		});

		return deferred.promise;
	},


	/*
	 	checks modal is open. returns boolean.
	 	protractor.utils.isModalOpen();
	 	protractor.utils.isModalOpen({
	 		modal : '.some-modal-class-or-id'
	 	});
	 */
	isModalOpen : function (opts) {
		opts = opts || {};
		var deferred = protractor.promise.defer();

		var modal = element(by.css(opts.modal || '.modal-dialog'));

		modal.isDisplayed().then(function (visible) {
			deferred.fulfill(visible);
		});

		return deferred.promise;
	},


	/*
		checks modal is closed. returns boolean.
		protractor.utils.isModalClosed();
		protractor.utils.isModalClosed({
	 		modal : '.modal-class'
		 });
	 */
	isModalClosed : function (opts) {
		opts = opts || {};
		var deferred = protractor.promise.defer();

		element(by.css(opts.modal || '.modal-dialog')).isPresent().then(function(present){
			deferred.fulfill(!present);
		});

		return deferred.promise;
	},


	/*
		closes modal. returns boolean.
		 protractor.utils.closeModal();
		 protractor.utils.closeModal({
	 		modal : '.modal-class'
			css : '.close-button'
		 })
	 */
	closeModal: function (opts) {
		opts = opts || {};
		var deferred = protractor.promise.defer();

		element(by.css(opts.modal || '.modal-dialog')).element(by.css(opts.css || '.settings-close')).click().then(function () {
			pageObjectUtils.isModalClosed(opts).then(deferred.fulfill);
		});

		return deferred.promise;
	},


	/*
		actions a click on an element in a drop down menu. returns boolean.
		utils.openModalFromDropdownMenuItem({
			 css: '.menu-class-or-id',
             buttonCss : 'button-class-or-id'
			 tagName: 'span',
			 itemText: 'Settings'
		 });
	 */
    clickOnDropdownMenuItem: function (opts) {
        opts = opts || {};
        opts.buttonCss = opts.buttonCss || opts.css;
        
        var deferred = protractor.promise.defer();

        element(by.css(opts.buttonCss)).click().then(function () {
            element.all(by.css(opts.css + ' ' + opts.tagName)).then(function (items) {
                items.forEach(function (item) {
                    item.getText().then(function (text) {
                        if (text === opts.itemText) {
                            item.click().then(function () {
                                deferred.fulfill(true);
                            });
                        }
                    });
                });
            });
        });

        return deferred.promise;
    },


    /*
     clicks on bootstrap drop-down menu and displays bootstrap modal. returns boolean when modal is open.
         utils.openModalFromDropdownMenuItem({
         css: '.menu-class-or-id',
         tagName: 'span',
         itemText: 'Settings',
         modal : '.modal-dialog'
     });
     */
    clickOnListItem : function (opts) {
        element.all(by.css(opts.css)).then(function (rows) {
            rows.forEach(function (row) {
                row.getText().then(function (text) {
                    if (opts.itemText === text) {
                        row.click();
                    }
                });
            });
        });
    },


	/*
		 clicks on bootstrap drop-down menu and displays bootstrap modal. returns boolean when modal is open.
		 utils.openModalFromDropdownMenuItem({
			css: '.menu-class-or-id',
			tagName: 'span',
			itemText: 'Settings',
	 		modal : '.modal-dialog'
		 });
	 */
 	openModalFromDropdownMenuItem: function (opts) {
        opts = opts || {};
        var deferred = protractor.promise.defer();

        pageObjectUtils.clickOnDropdownMenuItem(opts).then(function () {
			pageObjectUtils.isModalOpen(opts).then(deferred.fulfill);
        });

        return deferred.promise;
    }

};


module.exports = pageObjectUtils;
/* jshint ignore:end */