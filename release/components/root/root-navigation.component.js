var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { AbstractNavigationComponent } from '../abstract-navigation/abstract-navigation.component';
import { ComponentBuilderService } from '../../services/component-builder.service';
var RootNavigationComponent = /** @class */ (function (_super) {
    __extends(RootNavigationComponent, _super);
    function RootNavigationComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDevRoute = false;
        _this.componentBuilderService = _this.injector.get(ComponentBuilderService);
        _this.devRouteSub = _this.componentBuilderService.isDevRoute.subscribe(function (isDevRoute) {
            _this.isDevRoute = isDevRoute;
        });
        return _this;
    }
    RootNavigationComponent.prototype.ngOnInit = function () { };
    RootNavigationComponent.prototype.ngOnDestroy = function () {
        this.devRouteSub.unsubscribe();
    };
    RootNavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'navigation-root',
                    templateUrl: './root-navigation.component.html'
                },] },
    ];
    /** @nocollapse */
    RootNavigationComponent.ctorParameters = function () { return []; };
    return RootNavigationComponent;
}(AbstractNavigationComponent));
export { RootNavigationComponent };
//# sourceMappingURL=root-navigation.component.js.map