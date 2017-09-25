import { Inject, Injector } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
var AbstractNavigationComponent = /** @class */ (function () {
    function AbstractNavigationComponent(navigationService, injector) {
        this.navigationService = navigationService;
        this.injector = injector;
    }
    /** @nocollapse */
    AbstractNavigationComponent.ctorParameters = function () { return [
        { type: NavigationService, decorators: [{ type: Inject, args: [NavigationService,] },] },
        { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
    ]; };
    return AbstractNavigationComponent;
}());
export { AbstractNavigationComponent };
//# sourceMappingURL=abstract-navigation.component.js.map