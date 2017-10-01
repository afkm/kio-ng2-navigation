import { Observable } from 'rxjs/Observable'

import { 
  Component,
  OnDestroy
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { TestDataRecord, ComponentBuilderData } from '../../interfaces'
import { ComponentBuilderService } from '../../../services/component-builder.service'
import { ComponentBuilderFormService } from '../../services/builder-form.service'


@Component({
  selector: 'component-builder-form',
  templateUrl: './component-builder-form.component.html'
})
export class ComponentBuilderForm implements OnDestroy {

  constructor ( 
      protected builderService:ComponentBuilderService,
      protected builderFormService:ComponentBuilderFormService,
      protected activatedRoute:ActivatedRoute
    ) {

  }

  public componentNames:string[]=this.builderFormService.componentNames.slice()

  public componentName:Observable<string>=this.builderFormService.componentName

  public currentComponentName:string

  public componentState:number=0

  public isMounted:boolean=false

  private _componentSub = this.componentName.subscribe ( name => {
    this.currentComponentName = name
  } )

  private _mountStateChangeSub=this.builderService.mountStateChange.subscribe ( nextState => {
    this.isMounted = nextState
  } )

  public ngOnDestroy() {
    this._componentSub.unsubscribe ()
    this._mountStateChangeSub.unsubscribe ()
  }

  public updateCurrentComponentName ( e:Event ) {
    const targetSelect:HTMLSelectElement = e.target as HTMLSelectElement
    console.log('update component name', targetSelect.value )
    this.builderFormService.setComponentName ( targetSelect.value )
  }

  public mountComponent () {
    this.builderService.mountComponent ()
  }

  public unmountComponent () {
    this.builderService.unmountComponent ()
  }

 
}