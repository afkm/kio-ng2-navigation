import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { DOCUMENT } from '@angular/platform-browser';
import { AbstractNavigationComponent } from '../abstract-navigation/abstract-navigation.component'
import { SitemapChapter } from 'kio-ng2-sitemap'
import { NavigationConfig } from '../../interfaces/navigation-config'
import { NAVIGATION_CONFIG } from '../../config.token'
import { KioPublicationModel, KioFragment } from 'kio-ng2-data'
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll'
import { ChapterClassResolver } from '../../resolver/chapter-class.resolver'


@Component({
  selector: 'navigation-content',
  templateUrl: './content-navigation.component.html',
  styleUrls: [
    './content-navigation.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ContentNavigationComponent extends AbstractNavigationComponent {

  public config:NavigationConfig=this.injector.get(NAVIGATION_CONFIG)

  public chapterClassResolver:ChapterClassResolver=this.injector.get(ChapterClassResolver)

  public pagingEnabled:boolean=this.navigationService.sitemapChapterService.config.pagingEnabled

  public chapterModels:KioPublicationModel[]

  protected pageScrollService: PageScrollService = this.injector.get(PageScrollService)
  
  protected document:HTMLDocument=this.injector.get(DOCUMENT)
  
  private sitemapServiceSubscription=this.navigationService.contentSitemapChapterPublications
  .subscribe ( (models) => {
    this.chapterModels = models.slice()
  }, error => {
    console.error(`Failed to load content navigation. ${error}`)
  } )
  
}
