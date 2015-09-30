'use strict';

var COMPONENT_CLASS = '.subscription-manager-component';
function prefixClass (str) {
    str = str ||'';
    return [COMPONENT_CLASS, str].join(' ');
}

// page object
var po = {
    getGlobalViewModal : function () {
        return po.gvm;
    },

    gvm : {
        // ACTIONS
        // ********
        open : function () {
           element(by.css('.subscription-settings-icon')).click();
           return po.gvm;
        },

        close : function () {
            protractor.utils.closeModal({
                css : prefixClass('[data-action="cancel"]')
            });
            return po.gvm;
        },

        deleteView : function () {
            element(by.css(prefixClass('button[data-action="delete-view"]'))).click();
            return po.gvm;
        },

        deleteViews : function () {
            // there are two default views
            po.gvm.deleteView().deleteView();
        },

        removeAllAssigned : function () {
            element(by.css(prefixClass('button[title="Remove all"]'))).click();
        },

        addAllAvailable : function () {
            element(by.css(prefixClass('button[title="Add all"]'))).click();
        },

        removeCostCentre : function () {
            element(by.css(prefixClass('.assigned .nested-list'))).all(by.tagName('li')).get(1).click();
        },

        addCostCentre : function () {
            element(by.css(prefixClass('.available .nested-list'))).all(by.tagName('li')).get(4).click();
        },

        selectView : function (viewName) {
            protractor.utils.clickOnListItem({
                css : prefixClass('.views .list-group li a'),
                itemText : viewName
            });
        },

        clickButton : function (text) {
            element(by.css(prefixClass('button[title="'+text+'"]'))).click();
        },


        // EXPECTATIONS (return promises)
        // ************
        isOpen : function () {
            return protractor.utils.isModalOpen();
        },

        isClosed : function () {
            return protractor.utils.isModalClosed();
        },

        getAssignedLength : function () {
            return protractor.utils.getNgRepeatItemCount('cs in vm.assignedCostCentreData');
        },

        getAvailableLength : function () {
            return protractor.utils.getNgRepeatItemCount('cs in vm.availableCostCentreData');
        },

        getAssignedText : function () {
            return element(by.css(prefixClass('.please-add'))).getText();
        },

        buttonEnabled : function (text) {
            var css;
            if (text === 'Assigned Expand all') {
                css = '.assigned button[title="Expand all"]';
            }
            else if (text === 'Available Expand all') {
                css = '.available button[title="Expand all"]';
            }
            else {
                css= 'button[title="'+text+'"]';
            }
            return protractor.utils.elementIsEnabled(prefixClass(css));
        }
    }
};

module.exports = po;