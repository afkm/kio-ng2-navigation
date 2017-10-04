import { AbstractNavigationComponent } from '../abstract-navigation/abstract-navigation.component';
import { KioPublicationModel } from 'kio-ng2-data';
import { PageScrollService } from 'ng2-page-scroll';
export declare class ContentNavigationComponent extends AbstractNavigationComponent {
    pagingEnabled: boolean;
    chapterModels: KioPublicationModel[];
    protected pageScrollService: PageScrollService;
    protected document: HTMLDocument;
    private sitemapServiceResetSub;
    private sitemapServiceSubscription;
}
