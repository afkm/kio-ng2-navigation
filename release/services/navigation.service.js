import { Injectable, Inject } from '@angular/core';
import { SitemapChapterService } from 'kio-ng2-sitemap';
import { Router, NavigationError, NavigationEnd, RoutesRecognized } from '@angular/router';
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';
import { ScrollService } from 'kio-ng2-scrolling';
import { Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
var NavigationService = /** @class */ (function () {
    /**
     * create instance of navigation service; called at module injection time
     * @param {ActivatedRoute} private route
     * @param {Router}         private router
     */
    function NavigationService(sitemapChapterService, router, document, pageScrollService, scrollService, angulartics, angulartics2GoogleAnalytics) {
        var _this = this;
        this.sitemapChapterService = sitemapChapterService;
        this.router = router;
        this.document = document;
        this.pageScrollService = pageScrollService;
        this.scrollService = scrollService;
        this.angulartics = angulartics;
        this.angulartics2GoogleAnalytics = angulartics2GoogleAnalytics;
        this.routerSubscription = this.router.events.subscribe(function (event) {
            if (event instanceof RoutesRecognized && _this.sitemapChapterService.config.pagingEnabled === true) {
                _this.scrollTo(0, 0);
            }
            if (event instanceof NavigationError) {
                if (event.url !== '/error') {
                    _this.router.navigateByUrl('/error');
                }
            }
            if (event instanceof NavigationEnd) {
                _this.trackCurrentURL();
            }
        });
        this.trackCurrentURL();
    }
    NavigationService.prototype.gotoChapter = function (menuItem) {
        var _this = this;
        var chapter = this.sitemapChapterService.chapterForCUID(menuItem.cuid);
        if (this.sitemapChapterService.config.pagingEnabled === true) {
            return this.sitemapChapterService.gotoChapter(chapter).mapTo(menuItem);
        }
        else {
            var el = PageScrollInstance.simpleInstance(this.document, "#" + menuItem.cuid);
            var pageScrollFinish = el._pageScrollFinish;
            this.scrollService.pause.emit();
            this.pageScrollService.start(el);
            return pageScrollFinish.take(1).mapTo(menuItem).map(function (menuItem) {
                _this.scrollService.resume.emit(true);
                return menuItem;
            });
        }
    };
    NavigationService.prototype.scrollTo = function (x, y) {
        window.scrollTo(x, y);
    };
    NavigationService.prototype.trackCurrentURL = function () {
        this.angulartics2GoogleAnalytics.pageTrack(this.router.url);
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: SitemapChapterService, },
        { type: Router, },
        { type: HTMLDocument, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: PageScrollService, },
        { type: ScrollService, },
        { type: Angulartics2, decorators: [{ type: Inject, args: [Angulartics2,] },] },
        { type: Angulartics2GoogleAnalytics, decorators: [{ type: Inject, args: [Angulartics2GoogleAnalytics,] },] },
    ]; };
    return NavigationService;
}());
export { NavigationService };
//# sourceMappingURL=navigation.service.js.map