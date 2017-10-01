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
import { Component, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AbstractNavigationComponent } from '../abstract-navigation/abstract-navigation.component';
import { PageScrollService } from 'ng2-page-scroll';
var ContentNavigationComponent = /** @class */ (function (_super) {
    __extends(ContentNavigationComponent, _super);
    function ContentNavigationComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pagingEnabled = _this.navigationService.sitemapChapterService.config.pagingEnabled;
        _this.pageScrollService = _this.injector.get(PageScrollService);
        _this.document = _this.injector.get(DOCUMENT);
        _this.sitemapServiceResetSub = _this.navigationService.sitemapChapterService.allModels.subscribe(function (m) {
            _this.chapterModels = [];
        });
        _this.sitemapServiceSubscription = _this.navigationService.sitemapChapterService.models
            .concatMap(function (sitemapChapter) { return sitemapChapter.data; })
            .subscribe(function (model) {
            if (_this.navigationService.sitemapChapterService.config.pagingEnabled === true) {
                _this.chapterModels = [model.data];
            }
            else {
                _this.chapterModels.push(model.data);
            }
        });
        return _this;
    }
    ContentNavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'navigation-content',
                    templateUrl: './content-navigation.component.html',
                    styleUrls: [
                        './content-navigation.component.css'
                    ],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    ContentNavigationComponent.ctorParameters = function () { return []; };
    return ContentNavigationComponent;
}(AbstractNavigationComponent));
export { ContentNavigationComponent };
//# sourceMappingURL=content-navigation.component.js.map