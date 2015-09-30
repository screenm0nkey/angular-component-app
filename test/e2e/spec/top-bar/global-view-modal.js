'use strict';

describe('Header - Actions menu', function(){
    var page = new protractor.Page('topbar', 'top-bar/global-view-modal');
    var modal;

    it('should open Global View Modal', function(){
        modal = page.topbar.getGlobalViewModal().open();
        expect(modal.isOpen()).toBeTruthy();
    });


    describe('No assigned cost centres', function () {
        it('should display message to "add" cost centres', function () {
            modal.clickButton('Create view');
            expect(modal.getAssignedLength()).toBe(0);
            expect(modal.getAssignedText()).toBe('Please add at least one item from the available cost centers.');
        });

        it('should stop modal from saving or creating new views', function () {
            expect(modal.buttonEnabled('Create view')).toBeFalsy();
            expect(modal.buttonEnabled('Save')).toBeFalsy();
        });

        it('should allow Cancel and Delete buttons', function () {
            expect(modal.buttonEnabled('Create view')).toBeFalsy();
            expect(modal.buttonEnabled('Save')).toBeFalsy();
            modal.clickButton('Delete view');
        });
    });




    describe('Remove cost centre', function () {
        it('should move cost centre to "available"', function () {
            modal.selectView('emlondon');
            expect(modal.getAssignedLength()).toBe(4);
            expect(modal.getAvailableLength()).toBe(14);
            modal.removeCostCentre();
            expect(modal.getAssignedLength()).toBe(3);
            expect(modal.getAvailableLength()).toBe(15);
        });
    });


    describe('Add cost centre', function () {
        it('should move cost centre to "available"', function () {
            modal.selectView('emGlasgow');
            expect(modal.getAssignedLength()).toBe(2);
            expect(modal.getAvailableLength()).toBe(15);
            modal.addCostCentre();
            expect(modal.getAssignedLength()).toBe(3);
            expect(modal.getAvailableLength()).toBe(14);
        });
    });


    describe('Add all available', function () {
        it('should add all cost centres to assigned', function () {
            modal.addAllAvailable();
            expect(modal.getAvailableLength()).toBe(0);
            expect(modal.getAssignedLength()).toBe(15);
        });
    });


    describe('Delete all views', function () {
        it('should leave lists empty', function(){
            modal.deleteViews();
            expect(modal.getAssignedLength()).toBe(0);
            expect(modal.getAvailableLength()).toBe(0);
        });

        it('should disable buttons', function(){
            expect(modal.buttonEnabled('Remove all')).toBeFalsy();
            expect(modal.buttonEnabled('Delete view')).toBeFalsy();
            expect(modal.buttonEnabled('View all')).toBeFalsy();
            expect(modal.buttonEnabled('Add all')).toBeFalsy();
            expect(modal.buttonEnabled('Assigned Expand all')).toBeFalsy();
            expect(modal.buttonEnabled('Available Expand all')).toBeFalsy();
        });

        it('should leave cancel, save and create enabled', function(){
            expect(modal.buttonEnabled('Create view')).toBeTruthy();
            expect(modal.buttonEnabled('Cancel')).toBeTruthy();
            expect(modal.buttonEnabled('Save')).toBeTruthy();
        });
    });

    it('should close the Global View Modal', function(){
        modal.close();
        expect(modal.isClosed()).toBeTruthy();
    });
});




