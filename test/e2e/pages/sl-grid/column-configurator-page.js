'use strict';

var pageObject = {

    openColumnConfigurator : function () {
        protractor.utils.clickOnDropdownMenuItem({
            buttonCss : '[grid-name="inquiryGrid"] .options-menu-component button.btn-square',
            css: '[grid-name="inquiryGrid"] .options-menu-component .dropdown-menu',
            tagName: 'li',
            itemText: 'Configure columns...'
        });

        return pageObject.columnConfigurator;
    },

    columnConfigurator : {
        close : function () {
            return protractor.utils.closeModal({
                css : ''
            });
        },

        isOpen : function () {
            return protractor.utils.isModalOpen();
        },

        isClosed : function () {
            return protractor.utils.isModalClosed();
        }
    }
};

module.exports = pageObject;