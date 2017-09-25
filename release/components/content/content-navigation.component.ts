import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core'
import { DOCUMENT } from '@angular/platform-browser';
import { AbstractNavigationComponent } from '../abstract-navigation/abstract-navigation.component'
import { SitemapChapter } from 'kio-ng2-sitemap'
import { KioPublicationModel } from 'kio-ng2-data'
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll'


@Component({
  selector: 'kio-navigation-content',
  templateUrl: './content-navigation.component.html',
  styleUrls: [
    './content-navigation.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ContentNavigationComponent extends AbstractNavigationComponent {

  protected pageScrollService: PageScrollService = this.injector.get(PageScrollService)
  protected document:HTMLDocument=this.injector.get(DOCUMENT)

  public chapterModels:KioPublicationModel[]

  private sitemapServiceResetSub=this.navigationService.sitemapChapterService.allModels.subscribe ( m => {
    this.chapterModels = []
  } )

  private sitemapServiceSubscription=this.navigationService.sitemapChapterService.models
  .concatMap ( sitemapChapter => sitemapChapter.data )
  .subscribe ( (model) => {
    if ( this.navigationService.sitemapChapterService.config.pagingEnabled === true ) {
      this.chapterModels = [model.data]
    } else {
      this.chapterModels.push ( model.data )
    }
  } )
  
}
