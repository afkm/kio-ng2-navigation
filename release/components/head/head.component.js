import { Component } from '@angular/core';
import { ComponentBuilderService } from '../../services/component-builder.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(componentBuilderService) {
        var _this = this;
        this.componentBuilderService = componentBuilderService;
        this.isDevRoute = false;
        this.devRouteSub = this.componentBuilderService.isDevRoute.subscribe(function (isDevRoute) {
            _this.isDevRoute = isDevRoute;
        });
    }
    HeaderComponent.prototype.ngOnInit = function () { };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.devRouteSub.unsubscribe();
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'content-head',
                    templateUrl: './head.component.html',
                    styleUrls: ['./head.component.css']
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: ComponentBuilderService, },
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=head.component.js.map