import 'rxjs/add/operator/mergeMap';
import { Injectable, isDevMode } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { defaultStore } from 'kio-ng2-component-routing';
var ComponentBuilderFormService = /** @class */ (function () {
    function ComponentBuilderFormService(router) {
        this.router = router;
    }
    Object.defineProperty(ComponentBuilderFormService.prototype, "componentName", {
        get: function () {
            return this.router.events.filter(function (event) { return event instanceof RoutesRecognized; })
                .map(function (event) {
                return event.url;
            })
                .startWith(this.router.url)
                .map(function (url) {
                if (url.indexOf('/dev/') === 0) {
                    return url.replace('/dev/', '');
                }
                return undefined;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentBuilderFormService.prototype, "componentNames", {
        get: function () {
            var _this = this;
            return defaultStore.map(function (item) { return _this._mapComponentName(item.name); });
        },
        enumerable: true,
        configurable: true
    });
    /*public componentName:Observable<string>=this.activatedRoute.data.map ( data => {
      if ( 'componentData' in data ) {
        const componentData:ComponentBuilderData = data['componentData']
        return componentData.componentName ? this._mapComponentName ( componentData.componentName ) : componentData.componentName
      }
    } ).shareReplay(1)*/
    ComponentBuilderFormService.prototype.setComponentName = function (name) {
        this.router.navigateByUrl("/dev/" + name).then(function (success) {
            if (isDevMode()) {
                console.log('did change component name in url', name);
            }
        })
            .catch(console.error);
    };
    ComponentBuilderFormService.prototype._mapComponentName = function (name) {
        var cap = function (str) {
            return str.substr(0, 1).toUpperCase() + str.substr(1);
        };
        name = name.replace(/^(publication|kio)\-/, '');
        return name.split('-').map(cap).join('');
    };
    ComponentBuilderFormService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ComponentBuilderFormService.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return ComponentBuilderFormService;
}());
export { ComponentBuilderFormService };
//# sourceMappingURL=builder-form.service.js.map