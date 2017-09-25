import { Component, ViewEncapsulation } from '@angular/core';
import { LocaleService } from 'kio-ng2-i18n';
import { SitemapService } from 'kio-ng2-sitemap';
import { Router, NavigationStart, NavigationCancel, NavigationError, NavigationEnd } from '@angular/router';
var shortenLocale = function (locale) { return locale.split('_')[0]; };
var LanguageSelectorComponent = /** @class */ (function () {
    function LanguageSelectorComponent(localeService, sitemapService, router) {
        var _this = this;
        this.localeService = localeService;
        this.sitemapService = sitemapService;
        this.router = router;
        this.locales = this.localeService.localesSupported;
        this.localeIndex = this.locales.indexOf(this.localeService.currentLocale);
        // @TODO: this has got to be toggled until new lang content is fetched
        this.isUpdating = false;
        this.localeChangeSubscription = this.localeService.changes
            .subscribe(function (locale) {
            //window.afkm.logger.add(this,[`update locale index with "%s"`,[locale]])
            _this.localeIndex = _this.locales.indexOf(locale);
        });
        this.routerSubscription = this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                _this.isUpdating = true;
            }
            else if ((event instanceof NavigationError)
                || (event instanceof NavigationCancel)
                || (event instanceof NavigationEnd)) {
                _this.isUpdating = false;
            }
        });
    }
    LanguageSelectorComponent.prototype.shortLocale = function (locale) {
        return locale.substr(0, 2);
    };
    Object.defineProperty(LanguageSelectorComponent.prototype, "nextLocale", {
        get: function () {
            var nextLocaleIndex = (this.localeIndex + 1 < this.locales.length) ? this.localeIndex + 1 : 0;
            return this.locales[nextLocaleIndex];
        },
        enumerable: true,
        configurable: true
    });
    LanguageSelectorComponent.prototype.isCurrentLocale = function (lang) {
        return this.localeService.current === lang;
    };
    LanguageSelectorComponent.prototype.switchLocale = function (nextLocale) {
        this.isUpdating = true;
        var lang = nextLocale.substr(0, 2);
        return this.sitemapService.switchToLocale(nextLocale).mapTo(true);
        /*return Observable.of (nextLocale.substr(0,2)
                .flatMap ( lang => {
                  return
                } )
                .catch ( error => {
                  console.log('Failed to switch locale to: %s', nextLocale)
                  console.error(error)
                  return Observable.throw(error)
                })*/
    };
    LanguageSelectorComponent.prototype.toggleLocale = function () {
        var nextLocale = this.nextLocale;
        this.switchLocale(nextLocale).subscribe(function (done) {
            //window.afkm.logger.add(this,[`switched locale to ${nextLocale}`,[done]])
        }, console.error, function () {
            //window.afkm.logger.add(this,[`completed switching locale to ${nextLocale}`])
        });
        /*this.localeService.updateLocale(this.nextLocale).subscribe( locale => {}, error => {
          console.log('Failed to update locale')
          console.error(error)
          this.isUpdating = false
        },()=> {
          this.isUpdating = false
        })*/
    };
    //private _debug_router=window.afkm.logger.observe(this.router,'events')
    LanguageSelectorComponent.prototype.ngOnDestroy = function () {
        this.localeChangeSubscription.unsubscribe();
        this.routerSubscription.unsubscribe();
    };
    LanguageSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'language-selector',
                    templateUrl: './language-selector.component.html',
                    styleUrls: ['./language-selector.component.css'],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    LanguageSelectorComponent.ctorParameters = function () { return [
        { type: LocaleService, },
        { type: SitemapService, },
        { type: Router, },
    ]; };
    return LanguageSelectorComponent;
}());
export { LanguageSelectorComponent };
//# sourceMappingURL=language-selector.component.js.map