import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/mergeMap'

import { 
  Component, 
  ComponentFactory, ComponentFactoryResolver, 
  Input, 
  Inject,
  EventEmitter,
  OnInit, OnDestroy,
  ViewChild, ViewContainerRef,
  ComponentRef
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { ComponentBuilderService } from '../../../services/component-builder.service'
import { 
  TestDataRecord, TestDataRecordData, MockedContent, MockedFragment, 
  isMockedContent, isMockedFragment, isTestDataRecordData,
  ComponentBuilderData, isComponentBuilderData
} from '../../interfaces'

import { Factory, FragmentDataComponent, ContentDataComponent } from 'kio-ng2-component-routing'

import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'


@Component({
  selector: 'component-builder',
  templateUrl: './component-builder.component.html'
})
export class ComponentBuilderComponent implements OnInit, OnDestroy {

  constructor ( 
    protected componentFactoryResolver:ComponentFactoryResolver,
    protected componentBuilderService:ComponentBuilderService,
    protected activatedRoute:ActivatedRoute
  ) {

  }
  
  @ViewChild('componentAnchor', {read: ViewContainerRef}) 
  mountPoint:ViewContainerRef

  public error:Error

  public componentName:string
  public componentNode:KioContentModel|KioFragmentModel
  public component:ComponentRef<ContentDataComponent|FragmentDataComponent>

  public componentDataSource:Observable<ComponentBuilderData>=this.activatedRoute.data.filter ( data => {
    return ( 'componentData' in data )
  } ).map ( d => d['componentData'] )

  
  /** observable of initialized data componentRef matching route */
  public componentRef:Observable<ComponentRef<FragmentDataComponent|ContentDataComponent>>=this.componentDataSource.mergeMap ( (data:ComponentBuilderData,idx:number) => {
    this.unmount ()
    this.error = undefined
    if ( !data ) {
      return Observable.never()
    } else {
      const componentItem = this.componentBuilderService.getComponentByName ( data.componentName )
      if ( !componentItem || !componentItem.component ) {
        return Observable.throw ( `Failed to get component by name: ${data.componentName}.` )
      }
      const componentRef = Factory.createComponentItemOnViewContainer ( componentItem, this.componentFactoryResolver, this.mountPoint, data.node )
      this._setupComponent ( componentRef )
      return Observable.of(componentRef)
    }
  } )

  private _componentData:Subscription

  private unmount () {
    while ( this.mountPoint.length > 0 ) {
      this.mountPoint.remove(0)
    }
    this.component = undefined
  }

  private _assignTestData ( data:ComponentBuilderData ) {

    if ( data ) {
      this.componentName = data.componentName
      this.componentNode = data.node
    } else {
      this.componentNode = undefined
      this.componentName = undefined
    }

  }

  private _setupComponent ( component:ComponentRef<FragmentDataComponent|ContentDataComponent> ) {
    if ( ( 'setupChildren' in component.instance ) && ( 'function' === typeof component.instance['setupChildren'] ) ) {
      component.instance['setupChildren'] ()
    }
  }




  public ngOnInit () {
    this._componentData=this.componentRef.subscribe ( componentRef => {

      console.log('component ref', componentRef )

      this.component = componentRef

    }, ( error:Error ) => {
      this.error = error
      console.error(error)
    } )
  }

  public ngOnDestroy () {
    this._componentData.unsubscribe()
  }

}