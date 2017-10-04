import { Observable } from 'rxjs/Observable';
import { SitemapLoader, MenuItem } from 'kio-ng2-sidebar';
import { SitemapChapterService } from 'kio-ng2-sitemap';
import { Router } from '@angular/router';
import { PageScrollService } from 'ng2-page-scroll';
import { ScrollService } from 'kio-ng2-scrolling';
import { Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
export declare class NavigationService implements SitemapLoader {
    readonly sitemapChapterService: SitemapChapterService;
    private router;
    private document;
    private pageScrollService;
    private scrollService;
    private angulartics;
    private angulartics2GoogleAnalytics;
    /**
     * create instance of navigation service; called at module injection time
     * @param {ActivatedRoute} private route
     * @param {Router}         private router
     */
    constructor(sitemapChapterService: SitemapChapterService, router: Router, document: HTMLDocument, pageScrollService: PageScrollService, scrollService: ScrollService, angulartics: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics);
    gotoChapter<T extends MenuItem>(menuItem: T): Observable<T>;
    private scrollTo(x, y);
    private routerSubscription;
    private trackCurrentURL();
}
