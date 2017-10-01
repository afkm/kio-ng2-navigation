import 'rxjs/add/operator/filter';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { defaultStore } from 'kio-ng2-component-routing';
import { TEST_DATA } from '../dev/test-data.token';
var ComponentBuilderService = /** @class */ (function () {
    function ComponentBuilderService(router, testData) {
        var _this = this;
        this.router = router;
        this.testData = testData;
        this.toggleMountEmitter = new EventEmitter(true);
        this.isMounted = true;
        this.mountStateChange = this.toggleMountEmitter.asObservable();
        this.devRouteEvents = this.router.events.filter(function (event) { return (event instanceof RoutesRecognized) && (event.url.indexOf('/dev') === 0); }).map(function (e) { return e; });
        this.isDevRoute = this.router.events.filter(function (event) { return (event instanceof RoutesRecognized); })
            .map(function (event) { return event.url.indexOf('/dev') === 0; });
        /** Subscriptions */
        this._mountedStateSubscription = this.mountStateChange.subscribe(function (nextState) {
            _this.isMounted = nextState === true;
        });
    }
    /** public methods */
    ComponentBuilderService.prototype.mountComponent = function () {
        console.log('ComponentBuilderService::mountComponent');
        this.toggleMountEmitter.emit(true);
    };
    ComponentBuilderService.prototype.unmountComponent = function () {
        console.log('ComponentBuilderService::unmountComponent');
        this.toggleMountEmitter.emit(false);
    };
    ComponentBuilderService.prototype.selectComponentByName = function (componentName) {
        this.router.navigateByUrl("/dev/" + componentName).then(function (s) {
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    ComponentBuilderService.prototype.getComponentByName = function (componentName) {
        return this._mapComponentItem(defaultStore.getComponentByName(componentName));
    };
    ComponentBuilderService.prototype.getComponentForNode = function (node) {
        return this._mapComponentItem(defaultStore.getComponentForNode(node));
    };
    ComponentBuilderService.prototype.allComponents = function () {
        var _this = this;
        return defaultStore.map(function (componentItem, idx) { return _this._mapComponentItem(componentItem); });
    };
    /** private methods */
    ComponentBuilderService.prototype._mapComponentItem = function (componentData) {
        if (componentData === void 0) { componentData = {}; }
        var name = componentData.name, component = componentData.component, fixture = componentData.fixture, annotation = componentData.annotation;
        return {
            name: name,
            component: component,
            fixture: fixture,
            annotation: annotation
        };
    };
    ComponentBuilderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ComponentBuilderService.ctorParameters = function () { return [
        { type: Router, },
        { type: Array, decorators: [{ type: Inject, args: [TEST_DATA,] },] },
    ]; };
    return ComponentBuilderService;
}());
export { ComponentBuilderService };
//# sourceMappingURL=component-builder.service.js.map