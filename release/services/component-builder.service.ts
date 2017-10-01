import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/filter'

import { Injectable, Inject, EventEmitter } from '@angular/core'
import { Router, RoutesRecognized } from '@angular/router'

import { 
  DataComponent, ContentDataComponent, FragmentDataComponent, 
  Factory, defaultStore, ContentMockingService,
  Annotation
} from 'kio-ng2-component-routing'
import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'

import { TestDataRecord, TestDataRecordData } from '../dev/interfaces'
import { TEST_DATA } from '../dev/test-data.token'


@Injectable()
export class ComponentBuilderService {

  constructor (
    protected router:Router,
    @Inject(TEST_DATA) public testData:TestDataRecord[]
    ) {

  }


  private toggleMountEmitter:EventEmitter<boolean>=new EventEmitter(true)

  public isMounted:boolean=true

  public mountStateChange:Observable<boolean>=this.toggleMountEmitter.asObservable()

  public devRouteEvents:Observable<RoutesRecognized>=this.router.events.filter ( event => (event instanceof RoutesRecognized) && (event.url.indexOf('/dev') === 0) ).map ( (e:RoutesRecognized):RoutesRecognized => e )

  public isDevRoute:Observable<boolean>=this.router.events.filter ( event => (event instanceof RoutesRecognized) )
    .map ( (event:RoutesRecognized) => event.url.indexOf('/dev') === 0 )

  /** Subscriptions */

  private _mountedStateSubscription=this.mountStateChange.subscribe ( nextState => {
    this.isMounted = nextState === true
  } )

  /** public methods */

  public mountComponent () {
    console.log('ComponentBuilderService::mountComponent')
    this.toggleMountEmitter.emit ( true )
  }

  public unmountComponent () {
    console.log('ComponentBuilderService::unmountComponent')
    this.toggleMountEmitter.emit ( false )
  }

  public selectComponentByName ( componentName:string ) {
    this.router.navigateByUrl ( `/dev/${componentName}` ).then ( s => {

    } )
    .catch ( error => {
      console.error(error)
    } )
  }

  public getComponentByName ( componentName:string ) {
    return this._mapComponentItem ( defaultStore.getComponentByName ( componentName ) )
  }

  public getComponentForNode ( node:KioContentModel|KioFragmentModel ) {
    return this._mapComponentItem ( defaultStore.getComponentForNode ( node ) ) 
  }

  public allComponents () {
    return defaultStore.map ( ( componentItem, idx ) => this._mapComponentItem ( componentItem ) )
  }

  /** private methods */

  private _mapComponentItem ( componentData:any={} ) {
    const {
      name,
      component,
      fixture,
      annotation
    } = componentData

    return {
      name,
      component,
      fixture,
      annotation
    }
  }

}
