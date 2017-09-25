import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { LocaleService } from 'kio-ng2-i18n';
import { SitemapService } from 'kio-ng2-sitemap';
import { Router } from '@angular/router';
export declare class LanguageSelectorComponent implements OnDestroy {
    private localeService;
    protected sitemapService: SitemapService;
    private router;
    constructor(localeService: LocaleService, sitemapService: SitemapService, router: Router);
    locales: string[];
    localeIndex: number;
    isUpdating: boolean;
    protected localeChangeSubscription: any;
    private routerSubscription;
    shortLocale(locale: string): string;
    readonly nextLocale: string;
    isCurrentLocale(lang: string): boolean;
    protected switchLocale(nextLocale: string): Observable<boolean>;
    toggleLocale(): void;
    ngOnDestroy(): void;
}
