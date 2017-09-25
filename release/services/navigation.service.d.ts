import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import { Router } from '@angular/router';
import { SitemapLoader, MenuItem } from 'kio-ng2-sidebar';
import { SitemapChapterService } from 'kio-ng2-sitemap';
import { PageScrollService } from 'ng2-page-scroll';
import { ScrollService } from 'kio-ng2-scrolling';
export declare class NavigationService implements SitemapLoader {
    readonly sitemapChapterService: SitemapChapterService;
    private router;
    private document;
    private pageScrollService;
    private scrollService;
    /**
     * create instance of navigation service; called at module injection time
     * @param {ActivatedRoute} private route
     * @param {Router}         private router
     */
    constructor(sitemapChapterService: SitemapChapterService, router: Router, document: HTMLDocument, pageScrollService: PageScrollService, scrollService: ScrollService);
    gotoChapter<T extends MenuItem>(menuItem: T): Observable<T>;
    private scrollTo(x, y);
    private routerSubscription;
}
