import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { DOCUMENT } from '@angular/platform-browser';
import { AbstractNavigationComponent } from '../abstract-navigation/abstract-navigation.component'
import { SitemapChapter, ChapterResolver } from 'kio-ng2-sitemap'
import { KioPublicationModel } from 'kio-ng2-data'
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll'


@Component({
  selector: 'navigation-content',
  templateUrl: './content-navigation.component.html',
  styleUrls: [
    './content-navigation.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ContentNavigationComponent extends AbstractNavigationComponent {

  public pagingEnabled:boolean=this.navigationService.sitemapChapterService.config.pagingEnabled

  public chapterModels:KioPublicationModel[]

  protected chapterResolver:ChapterResolver=this.injector.get(ChapterResolver)

  protected pageScrollService: PageScrollService = this.injector.get(PageScrollService)
  
  protected document:HTMLDocument=this.injector.get(DOCUMENT)
  
  private sitemapServiceSubscription=Observable.defer(():Observable<SitemapChapter[]>=>this.navigationService.sitemapChapterService.config.pagingEnabled ? this.navigationService.sitemapChapterService.models.map( c => [c]) : this.navigationService.sitemapChapterService.allModels)
  .flatMap ( chapters => {
    return Observable.of(...chapters)
  } )
  .concatMap ( (sitemapChapter:SitemapChapter) => sitemapChapter.data )
  .subscribe ( (model) => {
    if ( this.navigationService.sitemapChapterService.config.pagingEnabled === true ) {
      this.chapterModels = [model.data]
    } else {
      this.chapterModels = [model.data]
    }
  } )
  
}
