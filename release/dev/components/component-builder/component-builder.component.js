import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentBuilderService } from '../../../services/component-builder.service';
import { Factory } from 'kio-ng2-component-routing';
var ComponentBuilderComponent = /** @class */ (function () {
    function ComponentBuilderComponent(componentFactoryResolver, componentBuilderService, activatedRoute) {
        var _this = this;
        this.componentFactoryResolver = componentFactoryResolver;
        this.componentBuilderService = componentBuilderService;
        this.activatedRoute = activatedRoute;
        this.componentDataSource = this.activatedRoute.data.filter(function (data) {
            return ('componentData' in data);
        }).map(function (d) { return d['componentData']; });
        /** observable of initialized data componentRef matching route */
        this.componentRef = this.componentDataSource.mergeMap(function (data, idx) {
            _this.unmount();
            _this.error = undefined;
            if (!data) {
                return Observable.never();
            }
            else {
                var componentItem = _this.componentBuilderService.getComponentByName(data.componentName);
                if (!componentItem || !componentItem.component) {
                    return Observable.throw("Failed to get component by name: " + data.componentName + ".");
                }
                var componentRef = Factory.createComponentItemOnViewContainer(componentItem, _this.componentFactoryResolver, _this.mountPoint, data.node);
                _this._setupComponent(componentRef);
                return Observable.of(componentRef);
            }
        });
    }
    ComponentBuilderComponent.prototype.unmount = function () {
        while (this.mountPoint.length > 0) {
            this.mountPoint.remove(0);
        }
        this.component = undefined;
    };
    ComponentBuilderComponent.prototype._assignTestData = function (data) {
        if (data) {
            this.componentName = data.componentName;
            this.componentNode = data.node;
        }
        else {
            this.componentNode = undefined;
            this.componentName = undefined;
        }
    };
    ComponentBuilderComponent.prototype._setupComponent = function (component) {
        if (('setupChildren' in component.instance) && ('function' === typeof component.instance['setupChildren'])) {
            component.instance['setupChildren']();
        }
    };
    ComponentBuilderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._componentData = this.componentRef.subscribe(function (componentRef) {
            console.log('component ref', componentRef);
            _this.component = componentRef;
        }, function (error) {
            _this.error = error;
            console.error(error);
        });
    };
    ComponentBuilderComponent.prototype.ngOnDestroy = function () {
        this._componentData.unsubscribe();
    };
    ComponentBuilderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'component-builder',
                    templateUrl: './component-builder.component.html'
                },] },
    ];
    /** @nocollapse */
    ComponentBuilderComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: ComponentBuilderService, },
        { type: ActivatedRoute, },
    ]; };
    ComponentBuilderComponent.propDecorators = {
        'mountPoint': [{ type: ViewChild, args: ['componentAnchor', { read: ViewContainerRef },] },],
    };
    return ComponentBuilderComponent;
}());
export { ComponentBuilderComponent };
//# sourceMappingURL=component-builder.component.js.map