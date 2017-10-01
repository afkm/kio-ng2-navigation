import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponentBuilderService } from '../../services/component-builder.service'

@Component({
  selector: 'content-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor ( protected componentBuilderService:ComponentBuilderService ) {

  } 

  public isDevRoute:boolean=false

  private devRouteSub=this.componentBuilderService.isDevRoute.subscribe ( isDevRoute => {
    this.isDevRoute = isDevRoute
  } )

  public ngOnInit () {}

  public ngOnDestroy () {
    this.devRouteSub.unsubscribe()
  }

}
