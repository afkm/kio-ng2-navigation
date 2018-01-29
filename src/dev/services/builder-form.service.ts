import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'

import { 
  Injectable,
  EventEmitter,
  isDevMode
} from '@angular/core'
import { 
  ActivatedRoute, 
  Router,
  RoutesRecognized
} from '@angular/router'

import { defaultStore } from 'kio-ng2-component-routing'

import { ComponentBuilderData } from '../interfaces'


@Injectable()
export class ComponentBuilderFormService {

  constructor ( 
    private router:Router
    ) {

  }

  public get componentName():Observable<string> {
    return this.router.events.filter ( event => event instanceof RoutesRecognized )
    .map ( (event:RoutesRecognized) => {
      return event.url
    } )
    .startWith ( this.router.url )
    .map ( (url:string) => {
      if ( url.indexOf('/dev/') === 0 ) {
        return url.replace ( '/dev/', '' )
      }
      return undefined
    }  )
  }


  public get componentNames ():string[] {
    return defaultStore.map ( item => this._mapComponentName(item.name) )
  }

  /*public componentName:Observable<string>=this.activatedRoute.data.map ( data => {
    if ( 'componentData' in data ) {
      const componentData:ComponentBuilderData = data['componentData']
      return componentData.componentName ? this._mapComponentName ( componentData.componentName ) : componentData.componentName
    }
  } ).shareReplay(1)*/

  public setComponentName ( name:string ) {
    this.router.navigate ( ['dev',name] ).then ( (success:boolean) => {
      if ( isDevMode() ) {
        const message = success ? 'did change component name in url' : 'did NOT change component name in url'
        console.log(message, name)
      }
    } )
    .catch ( error => {
      console.error ( `Failed navigating to component building: ${error}` )
    } )
  }


  private _mapComponentName ( name:string ) {

    const cap = ( str:string ):string => {
      return str.substr(0,1).toUpperCase() + str.substr(1)
    }

    name = name.replace ( /^(publication|kio)\-/, '' )

    return name.split ('-').map ( cap ).join('')

  }

}