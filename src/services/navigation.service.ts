import { Observable } from 'rxjs/Observable'
import { Injectable, Inject } from '@angular/core'
import { SitemapNavigation, SitemapLoader, MenuItem } from 'kio-ng2-sidebar'
import { SITEMAP_CONFIG, SitemapChapter, ChapterConfig, SitemapService, SitemapChapterService } from 'kio-ng2-sitemap'
import { Router, NavigationStart, NavigationError, NavigationEnd, RoutesRecognized } from '@angular/router'
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll'
import { DOCUMENT } from '@angular/platform-browser';
import { ScrollService } from 'kio-ng2-scrolling'
import { Angulartics2Module, Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
import { GlobalsService } from 'kio-ng2-globals'
import { KioPublicationModel } from 'kio-ng2-data'


@Injectable()
export class NavigationService implements SitemapLoader {

  /**
   * create instance of navigation service; called at module injection time 
   * @param {ActivatedRoute} private route  
   * @param {Router}         private router 
   */ 
  constructor ( 
    readonly sitemapChapterService:SitemapChapterService,
    private router : Router,
    @Inject(DOCUMENT) private document:HTMLDocument,
    private pageScrollService : PageScrollService,
    private scrollService : ScrollService,
    @Inject(Angulartics2) private angulartics : Angulartics2,
    @Inject(Angulartics2GoogleAnalytics) private angulartics2GoogleAnalytics : Angulartics2GoogleAnalytics,
    @Inject(GlobalsService) private globalsService:GlobalsService
   ) { 

    this.trackCurrentURL () 

  }

  public contentSitemapChapters:Observable<SitemapChapter[]>=Observable.defer(()=>{
    if ( this.sitemapChapterService.config.pagingEnabled === true ) {
      // single chapter emission
      return this.sitemapChapterService.models.map ( model => [model] )
    } else {
      return this.sitemapChapterService.allModels
    }    
  })

  public contentSitemapChapterPublications:Observable<KioPublicationModel[]>=this.contentSitemapChapters.concatMap ( (sitemapChapters:SitemapChapter[]) => {
    return Observable.of(...sitemapChapters).concatMap ( sitemapChapter => {
      return sitemapChapter.data.map ( result => result.data )
    } ).toArray()
  } )

  public gotoChapter <T extends MenuItem> ( menuItem:T ):Observable<T> {
    
    const chapter = this.sitemapChapterService.chapterForCUID ( menuItem.cuid )
    
    if ( this.sitemapChapterService.config.pagingEnabled === true ) {
    
      return this.sitemapChapterService.gotoChapter ( chapter ).mapTo ( menuItem )
    
    } else {
    
      const el = PageScrollInstance.simpleInstance(this.document,`#${menuItem.cuid}`)
      const pageScrollFinish:Observable<boolean>=(<any>el)._pageScrollFinish
    
      this.scrollService.pause.emit()
      this.pageScrollService.start(el)
    
      return pageScrollFinish.take(1).mapTo(menuItem).map( menuItem => {
        
        this.scrollService.resume.emit(true)
        return menuItem
      
      })
    
    }

  }


  private resetPage ( ):void {
    window.scrollTo(0,0)
  }

  private routerSubscription=this.router.events.subscribe ( ( event ) => {
    if ( event instanceof NavigationStart && this.sitemapChapterService.config.pagingEnabled === true ) {
      this.globalsService.hide()
    }

    if ( event instanceof RoutesRecognized && this.sitemapChapterService.config.pagingEnabled === true ) {
      this.resetPage()
    }

    if ( event instanceof NavigationError ) {
      if ( event.url !== '/error' ) {
        this.router.navigateByUrl('/error')
      }
    }

    if ( event instanceof NavigationEnd ) {
      this.trackCurrentURL ()
      if ( this.sitemapChapterService.config.pagingEnabled ) {
        setTimeout(()=>{
          this.globalsService.show()
        },500)
      }
    }
  } )


  private trackCurrentURL () {
    try{
      this.angulartics2GoogleAnalytics.pageTrack(this.router.url) 
    } catch ( e ) {

    }
  }

}
