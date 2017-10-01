import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
var LONG_TEXT = "Aorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
var SHORT_TEXT = "Lorem ip&shy;sum dolor sit amet";
import { isTestDataRecordData, isMockedContent, isMockedFragment } from '../interfaces';
import { TEST_DATA } from '../test-data.token';
import { ComponentBuilderService } from '../../services/component-builder.service';
import { mock } from 'kio-ng2-component-routing';
import { KioContentModel, KioFragmentModel } from 'kio-ng2-data';
var ComponentDataResolver = /** @class */ (function () {
    function ComponentDataResolver(builderService, testData) {
        this.builderService = builderService;
        this.testData = testData;
    }
    ComponentDataResolver.prototype.resolve = function (route, state) {
        var componentName = route.paramMap.get('ComponentName');
        var data = this.testData.slice();
        if (componentName) {
            data = data.filter(function (rec) { return rec.componentName === componentName; });
        }
        if (data.length === 1) {
            return Observable.of({
                componentName: componentName,
                node: this.testDataRecordToComponentData(data[0])
            });
        }
        else {
            return Observable.never();
        }
    };
    ComponentDataResolver.prototype.testDataRecordDataToComponentNode = function (testDataRecordData) {
        if ('string' === typeof testDataRecordData) {
            if ('txt' === testDataRecordData) {
                return this.mockContentModel({
                    type: 'txt'
                });
            }
            return mock.mockContent(testDataRecordData);
        }
        else if (isMockedFragment(testDataRecordData)) {
            return this.mockFragmentModel(testDataRecordData);
        }
        else if (isMockedContent(testDataRecordData)) {
            return this.mockContentModel(testDataRecordData);
        }
        else if (isTestDataRecordData(testDataRecordData)) {
            return this.testDataRecordDataToComponentNode(testDataRecordData.data);
        }
        else if (Array.isArray(testDataRecordData)) {
            return this.testDataRecordDataToComponentNode(testDataRecordData[0]);
        }
        else {
            return undefined;
        }
    };
    ComponentDataResolver.prototype.testDataRecordToComponentData = function (testDataRecord) {
        return this.testDataRecordDataToComponentNode(testDataRecord.data);
    };
    ComponentDataResolver.prototype.fillCuid = function (data) {
        if (data.cuid) {
            if (/[a-z0-9]{25}/.test(data.cuid)) {
                return data.cuid;
            }
            else if (/\w+\=.*/.test(data.cuid)) {
                return mock.cuid(data.cuid);
            }
            else {
                return data.cuid;
            }
        }
        else if (data.type === 'txt') {
            return mock.cuid("text=" + LONG_TEXT);
        }
        else {
            return mock.cuid();
        }
    };
    ComponentDataResolver.prototype.fillContentNode = function (data) {
        return {
            cuid: this.fillCuid(data),
            type: data.type || 'txt',
            locale: data.locale || 'de_DE',
            modifiers: (data.modifiers || []).slice(),
            headers: data.headers || {}
        };
    };
    ComponentDataResolver.prototype.fragmentData = function (data) {
        var contentData = this.fillContentNode(data);
        return Object.assign(data, contentData, data);
    };
    ComponentDataResolver.prototype.mockModel = function (data) {
        if (data instanceof KioContentModel) {
            return data;
        }
        if (isMockedFragment(data)) {
            return this.mockFragmentModel(data);
        }
        else {
            return this.mockContentModel(data);
        }
    };
    ComponentDataResolver.prototype.mockContentModel = function (data) {
        var contentData = this.fillContentNode(data);
        return new KioContentModel(contentData);
    };
    ComponentDataResolver.prototype.mockFragmentModel = function (data) {
        var _this = this;
        var contentData = this.fragmentData(data);
        contentData.children = contentData.children.map(function (child) { return _this.mockModel(child); });
        //data = { ...this.fillContentNode ( data ), ...data, type: 'fragment' }
        return new KioFragmentModel(contentData);
    };
    ComponentDataResolver.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ComponentDataResolver.ctorParameters = function () { return [
        { type: ComponentBuilderService, },
        { type: Array, decorators: [{ type: Inject, args: [TEST_DATA,] },] },
    ]; };
    return ComponentDataResolver;
}());
export { ComponentDataResolver };
//# sourceMappingURL=component-data.resolver.js.map