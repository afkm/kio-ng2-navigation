import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, Scheduler } from 'rxjs'
import { LocaleService } from 'kio-ng2-i18n'
import { SitemapService } from 'kio-ng2-sitemap'

import { Router, NavigationStart, NavigationCancel, NavigationError, NavigationEnd } from '@angular/router'

const shortenLocale = locale => locale.split('_')[0]

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageSelectorComponent implements OnDestroy {

  constructor(private localeService:LocaleService, protected sitemapService:SitemapService, private router:Router) { }

  locales:string[]=this.localeService.localesSupported
  localeIndex:number=this.locales.indexOf(this.localeService.currentLocale)


  // @TODO: this has got to be toggled until new lang content is fetched
  isUpdating:boolean = false

  protected localeChangeSubscription=this.localeService.changes
    .subscribe((locale)=>{
      //window.afkm.logger.add(this,[`update locale index with "%s"`,[locale]])
      this.localeIndex = this.locales.indexOf(locale)
    })
  
  protected routerSubscription=this.router.events.subscribe(
    event => {
      if ( event instanceof NavigationStart )
      {
        this.isUpdating = true
      }
      else if (
          ( event instanceof NavigationError )
          || ( event instanceof NavigationCancel )
          || ( event instanceof NavigationEnd )
        )
      {
        this.isUpdating = false
      }
    }
  )

  shortLocale ( locale:string ) {
    return locale.substr(0,2)
  }

  get nextLocale():string{
    const nextLocaleIndex = ( this.localeIndex + 1 < this.locales.length ) ? this.localeIndex + 1 : 0
    return this.locales[nextLocaleIndex]
  }

  isCurrentLocale( lang:string ) {
    return this.localeService.current === lang
  }

  protected switchLocale ( nextLocale:string ):Observable<boolean> {
    this.isUpdating = true
    const lang = nextLocale.substr(0,2)
    return this.sitemapService.switchToLocale(nextLocale).mapTo(true)
    /*return Observable.of (nextLocale.substr(0,2)
            .flatMap ( lang => {
              return 
            } )
            .catch ( error => {
              console.log('Failed to switch locale to: %s', nextLocale)
              console.error(error)
              return Observable.throw(error)
            })*/
  }

  toggleLocale(){    
    const nextLocale = this.nextLocale 
    this.switchLocale(nextLocale).subscribe(done => {
      //window.afkm.logger.add(this,[`switched locale to ${nextLocale}`,[done]])
    },
      console.error,
      () => {
        //window.afkm.logger.add(this,[`completed switching locale to ${nextLocale}`])
      })
    /*this.localeService.updateLocale(this.nextLocale).subscribe( locale => {}, error => {
      console.log('Failed to update locale')
      console.error(error)
      this.isUpdating = false
    },()=> {
      this.isUpdating = false
    })*/
  }

  //private _debug_router=window.afkm.logger.observe(this.router,'events')

  ngOnDestroy(){
    this.localeChangeSubscription.unsubscribe()
    this.routerSubscription.unsubscribe()
  }

}
