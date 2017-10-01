import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentBuilderService } from '../../../services/component-builder.service';
import { ComponentBuilderFormService } from '../../services/builder-form.service';
var ComponentBuilderForm = /** @class */ (function () {
    function ComponentBuilderForm(builderService, builderFormService, activatedRoute) {
        var _this = this;
        this.builderService = builderService;
        this.builderFormService = builderFormService;
        this.activatedRoute = activatedRoute;
        this.componentNames = this.builderFormService.componentNames.slice();
        this.componentName = this.builderFormService.componentName;
        this.componentState = 0;
        this.isMounted = false;
        this._componentSub = this.componentName.subscribe(function (name) {
            _this.currentComponentName = name;
        });
        this._mountStateChangeSub = this.builderService.mountStateChange.subscribe(function (nextState) {
            _this.isMounted = nextState;
        });
    }
    ComponentBuilderForm.prototype.ngOnDestroy = function () {
        this._componentSub.unsubscribe();
        this._mountStateChangeSub.unsubscribe();
    };
    ComponentBuilderForm.prototype.updateCurrentComponentName = function (e) {
        var targetSelect = e.target;
        console.log('update component name', targetSelect.value);
        this.builderFormService.setComponentName(targetSelect.value);
    };
    ComponentBuilderForm.prototype.mountComponent = function () {
        this.builderService.mountComponent();
    };
    ComponentBuilderForm.prototype.unmountComponent = function () {
        this.builderService.unmountComponent();
    };
    ComponentBuilderForm.decorators = [
        { type: Component, args: [{
                    selector: 'component-builder-form',
                    templateUrl: './component-builder-form.component.html'
                },] },
    ];
    /** @nocollapse */
    ComponentBuilderForm.ctorParameters = function () { return [
        { type: ComponentBuilderService, },
        { type: ComponentBuilderFormService, },
        { type: ActivatedRoute, },
    ]; };
    return ComponentBuilderForm;
}());
export { ComponentBuilderForm };
//# sourceMappingURL=component-builder-form.component.js.map