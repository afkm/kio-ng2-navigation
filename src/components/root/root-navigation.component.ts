import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AbstractNavigationComponent } from '../abstract-navigation/abstract-navigation.component'
import { ComponentBuilderService } from '../../services/component-builder.service'

@Component({
  selector: 'navigation-root',
  templateUrl: './root-navigation.component.html'
})
export class RootNavigationComponent extends AbstractNavigationComponent implements OnInit, OnDestroy {

  public isDevRoute:boolean=false

  protected componentBuilderService:ComponentBuilderService=this.injector.get(ComponentBuilderService)

  private devRouteSub=this.componentBuilderService.isDevRoute.subscribe ( isDevRoute => {
    this.isDevRoute = isDevRoute
  } )

  public ngOnInit () {}

  public ngOnDestroy () {
    this.devRouteSub.unsubscribe()
  }

  
}
