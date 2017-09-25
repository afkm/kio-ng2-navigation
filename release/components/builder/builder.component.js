import { ActivatedRoute, Router } from '@angular/router';
import { Injector, Component, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Factory, defaultStore, ContentMockingService } from 'kio-ng2-component-routing';
import { TestData } from './TestData';
import { KioFragmentModel, KioContentState } from 'kio-ng2-data';
var capitalize = function (value) {
    if (Array.isArray(value)) {
        return value.map(capitalize).join('');
    }
    if (value.indexOf('-') > -1) {
        return capitalize(value.split('-'));
    }
    return value.substr(0, 1).toUpperCase() + value.substr(1).toLowerCase();
};
var describeNode = function (node, withChildTypes) {
    if (withChildTypes === void 0) { withChildTypes = true; }
    var mods = node.modifiers.join('.');
    if (mods) {
        mods = '.' + mods;
    }
    if (withChildTypes && node instanceof KioFragmentModel) {
        return "" + node.type + mods + "{" + node.children.map(function (child) { return describeNode(child, false); }).join(',') + "}";
    }
    else {
        return "" + node.type + mods;
    }
};
/**
 * TODO Kio Module
 * Service Provider with PublicationComponents exported as value
 */
var ComponentBuilderComponent = /** @class */ (function () {
    function ComponentBuilderComponent(route, router, componentFactoryResolver, injector) {
        this.route = route;
        this.router = router;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.componentNames = [];
        this.data = {};
        this.componentState = KioContentState.idle;
        this.mockingService = new ContentMockingService();
    }
    Object.defineProperty(ComponentBuilderComponent.prototype, "dataOptionName", {
        get: function () {
            return this._dataOptionName;
        },
        set: function (optionName) {
            this._dataOptionName = optionName;
            if (this.component) {
                this.selectOption(optionName);
            }
        },
        enumerable: true,
        configurable: true
    });
    ComponentBuilderComponent.prototype.selectOption = function (optionName) {
        var option = this.dataOptions.find(function (opt) { return opt.name === optionName; });
        if (option) {
            this.componentNode = option.data;
        }
    };
    ComponentBuilderComponent.prototype.mockDataForComponent = function (componentName) {
        var testData = TestData.find(function (data) { return data.componentName === componentName; });
        if (testData) {
            return testData.data;
        }
        if (/Component$/.test(componentName) === false) {
            componentName += 'Component';
        }
        return this.mockingService.getFixtureForComponent(componentName);
    };
    Object.defineProperty(ComponentBuilderComponent.prototype, "isMounted", {
        get: function () {
            return this.mountPoint.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ComponentBuilderComponent.prototype.unmountComponent = function () {
        while (this.mountPoint.length > 0) {
            this.mountPoint.remove(0);
        }
        this.component = null;
    };
    Object.defineProperty(ComponentBuilderComponent.prototype, "componentName", {
        get: function () {
            return this._componentName || null;
        },
        set: function (name) {
            if (this._componentName !== name) {
                this.router.navigate(['/', 'dev', name]);
                this._componentName = name;
            }
        },
        enumerable: true,
        configurable: true
    });
    ComponentBuilderComponent.prototype.getComponentItem = function (node) {
        var _a = defaultStore.getComponentForNode(node), name = _a.name, component = _a.component, fixture = _a.fixture, annotation = _a.annotation;
        return {
            name: name,
            component: component,
            fixture: fixture,
            annotation: annotation
        };
    };
    ComponentBuilderComponent.prototype.mountComponent = function () {
        var _this = this;
        this.unmountComponent();
        if (!this._componentName)
            return;
        this.data.componentName = this._componentName;
        //const SelectedComponent : LazyLoad.KioComponent<KioContentModel> = PublicationComponents.find ( comp => comp.name === this._componentName + 'Component' )
        //const resolvedComponent = this.componentFactoryResolver.resolveComponentFactory(SelectedComponent)
        //const resolvedComponent = LazyLoad.createFactoryForComponentItem(this.componentFactoryResolver,SelectedComponent)
        var mockedNode = this.mockDataForComponent(this._componentName);
        console.group('mocked node');
        console.log(describeNode(mockedNode));
        console.groupEnd();
        var componentItem = defaultStore.getComponentByName(this._componentName);
        if (!componentItem) {
            console.error('No component found for name "%s"', this._componentName);
            return;
        }
        var routedComponentItem = this.getComponentItem(mockedNode);
        if (!routedComponentItem || componentItem.component !== routedComponentItem.component) {
            console.warn("Expected component " + this._componentName + "Component but got " + (routedComponentItem && routedComponentItem.name));
        }
        this.componentNode = mockedNode;
        this.component = Factory.createComponentItemOnViewContainer(componentItem, this.componentFactoryResolver, this.mountPoint, this.componentNode);
        if ('setupChildren' in this.component.instance && 'function' === typeof this.component.instance['setupChildren']) {
            this.component.instance['setupChildren']();
        }
        //(<any>this.component.instance).onNodeUpdate()
        //this.component = <ComponentRef<KioAbstractComponent<KioContentModel>>>this.mountPoint.createComponent(resolvedComponent)
        if (!mockedNode) {
            throw Error('no fixture available for "' + this._componentName + '"!');
        }
        if (Array.isArray(mockedNode)) {
            this.dataOptions = mockedNode;
            if (this.dataOptionName) {
                var idx = mockedNode.findIndex(function (item) { return item.name === _this.dataOptionName; });
                if (idx === -1) {
                    this.dataOptionName = mockedNode[0].name;
                }
            }
            else {
                this.dataOptionName = mockedNode[0].name;
            }
            this.selectOption(this.dataOptionName);
        }
        /*else
        {
          this.component.instance.node = mockedNode
        }*/
        return this.component;
        //componentRef.instance.node = this.node
    };
    ComponentBuilderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentNames = defaultStore.map(function (c) { return capitalize(c.name.replace(/(kio|publication)\-/, '')); });
        this.route.params.subscribe(function (params) {
            if (params["ComponentName"]) {
                _this._componentName = params["ComponentName"].replace(/Component$/, '');
                _this.mountComponent();
            }
            else {
                _this.unmountComponent();
            }
        });
    };
    ComponentBuilderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'component-builder',
                    templateUrl: './builder.component.html',
                    styleUrls: ['./builder.component.css']
                },] },
    ];
    /** @nocollapse */
    ComponentBuilderComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
        { type: Router, },
        { type: ComponentFactoryResolver, },
        { type: Injector, },
    ]; };
    ComponentBuilderComponent.propDecorators = {
        'mountPoint': [{ type: ViewChild, args: ['componentAnchor', { read: ViewContainerRef },] },],
    };
    return ComponentBuilderComponent;
}());
export { ComponentBuilderComponent };
//# sourceMappingURL=builder.component.js.map