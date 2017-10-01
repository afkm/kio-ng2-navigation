import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import { ActivatedRoute, Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { 
  Input, Injector, ReflectiveInjector, 
  EventEmitter,
  Component, QueryList, ContentChildren, ComponentRef, ComponentFactoryResolver, 
  ViewContainerRef, ViewChild, OnInit 
} from '@angular/core';
import { 
  DataComponent, ContentDataComponent, FragmentDataComponent, 
  Factory, defaultStore, ContentMockingService,
  Annotation, mock
} from 'kio-ng2-component-routing'
//import { TestData } from './TestData'

import { KioContentModel, KioFragmentModel, KioContentState } from 'kio-ng2-data'

import { ComponentBuilderService } from '../../services/component-builder.service'
import { 
  TestDataRecord, TestDataRecordData, isTestDataRecord, isTestDataRecordData, 
  MockedContent, MockedFragment, isMockedContent, isMockedFragment 
} from '../../dev/interfaces'



const capitalize = ( value:string|string[] ):string => {
  if ( Array.isArray(value) ) {
    return value.map(capitalize).join('')
  }
  if ( value.indexOf('-') > -1 ) {
    return capitalize( value.split('-') )
  }
  return value.substr(0,1).toUpperCase() + value.substr(1).toLowerCase()
}

const describeNode = ( node:KioContentModel|KioFragmentModel, withChildTypes:boolean=true ):string => {
  let mods:string = node.modifiers.join('.')
  if ( mods ) {
    mods = '.'+mods
  }
  if ( withChildTypes && node instanceof KioFragmentModel ) {
    return `${node.type}${mods}{${node.children.map(child => describeNode(child,false)).join(',')}}`
  } else {
    return `${node.type}${mods}`
  }
}

export interface ComponentBuilderData {
  componentName?:string;
  componentNames?:string[];
  componentData?:any;
}

/**
 * TODO Kio Module 
 * Service Provider with PublicationComponents exported as value
 */

@Component({
  selector: 'component-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css'] 
})
export class ComponentBuilderComponent implements OnInit {

  constructor(
    private route : ActivatedRoute, 
    private router : Router, 
    private componentFactoryResolver : ComponentFactoryResolver,
    protected injector:Injector,
    private componentBuilderService : ComponentBuilderService
  ) { }

  @ViewChild('componentAnchor', {read: ViewContainerRef}) 
  mountPoint:ViewContainerRef

  componentNames:string[]=[]
  
  data:ComponentBuilderData={}
  dataOptions:any[];
  component:ComponentRef<ContentDataComponent|FragmentDataComponent>
  componentNode:KioContentModel|KioFragmentModel
  componentState:KioContentState=KioContentState.idle

  private mockingService:ContentMockingService=new ContentMockingService()
  private _dataOptionName:any;

  private componentNameEmitter:EventEmitter<string>=new EventEmitter()

  set dataOptionName ( optionName:any ) {
    this._dataOptionName = optionName
    if ( this.component )
    {
      this.selectOption ( optionName )
    }
  }

  selectOption ( optionName:string ) {
    const option = this.dataOptions.find ( opt => opt.name === optionName )
    if ( option )
    {
      this.componentNode = option.data
      this.componentNameEmitter.emit ( optionName )
    }
  }

  get dataOptionName () : any {
    return this._dataOptionName
  }

  mockDataForComponent ( componentName : string ) {
    let testData = this.componentBuilderService.testData.find ( data => data.componentName === componentName )
    if ( testData )
    {
      return testData.data
    }
    if ( /Component$/.test(componentName) === false ) {
      componentName += 'Component'
    }
    return this.mockingService.getFixtureForComponent(componentName)
  }

  get isMounted(){
    return this.mountPoint.length > 0
  }

  unmountComponent () {
    while ( this.mountPoint.length > 0 )
    {
     this.mountPoint.remove(0)
    }
    this.component = null
  }


  private _componentName:string

  set componentName ( name : string ) {
    if ( this._componentName !== name )
    {
      this.router.navigate(['/','dev',name])
      this._componentName = name
    }
  }

  get componentName():string {
    return this._componentName || null
  }

  getComponentItem(node:KioContentModel) {
    const {
      name,
      component,
      fixture,
      annotation
    } = this.componentBuilderService.getComponentForNode(node)
    return {
      name, 
      component, 
      fixture, 
      annotation
    }
  }

  mountComponentWithNode ( node:KioContentModel|KioFragmentModel, componentName:string=this._componentName ) {
    
    this.data.componentName = componentName

    const componentItem = this.componentBuilderService.getComponentByName(this._componentName)
    if ( !componentItem ) {
      console.error('No component found for name "%s"', this._componentName)
      return
    }
    const routedComponentItem = this.getComponentItem(node)
    if ( !routedComponentItem || componentItem.component !== routedComponentItem.component ) {
      console.warn(`Expected component ${this._componentName}Component but got ${routedComponentItem && routedComponentItem.name}`)
    }
    this.component = Factory.createComponentItemOnViewContainer ( 
      componentItem,
      this.componentFactoryResolver,
      this.mountPoint,
      this.componentNode
    );
    
    if ( 'setupChildren' in this.component.instance && 'function' === typeof this.component.instance['setupChildren'] ) {
      this.component.instance['setupChildren']()
    }
    //(<any>this.component.instance).onNodeUpdate()

    //this.component = <ComponentRef<KioAbstractComponent<KioContentModel>>>this.mountPoint.createComponent(resolvedComponent)
    if ( !node )
    {
      throw Error ( 'no fixture available for "' + this._componentName + '"!' )
    }
    if ( Array.isArray ( node ) )
    {
      this.dataOptions = node
      if ( this.dataOptionName )
      {
        const idx = node.findIndex ( item => item.name === this.dataOptionName )
        if ( idx === -1 )
        {
          this.dataOptionName = node[0].name
        }
      }else
      {
        this.dataOptionName = node[0].name
      }
      this.selectOption ( this.dataOptionName )
    }
    return this.component

  }

  mountComponent() {
    this.unmountComponent()
    if ( !this._componentName )
      return
    
    const mockedData = this.mockDataForComponent(this._componentName)
    
    if ( !mockedData ) {
      console.error ( `Could not find mocked data for ${this._componentName}` )
      return
    }

    this.componentNode = this.dataToNode ( mockedData )
    console.group('mocked node')
    console.log(describeNode(this.componentNode))
    console.groupEnd()

    return this.mountComponentWithNode ( this.componentNode, this._componentName )
    

    //componentRef.instance.node = this.node
  }

  private componentData:Observable<TestDataRecord>=this.componentBuilderService.routeData.filter ( r => r.length < 2 ).map ( r => {
    if ( r.length === 1 ) {
      return r[0]
    } else {
      return undefined
    }
  } )


  private dataToNode ( data:TestDataRecordData|TestDataRecordData[]|TestDataRecord|MockedContent|MockedFragment|string ):KioContentModel|KioFragmentModel {

    const fillContentNode = ( data:any ) => {
      if ( !('cuid' in data) || data['cuid'].indexOf('[mock') === -1 ) {
        data.cuid = mock.cuid()
      }

      if ( data instanceof KioContentModel || data instanceof KioFragmentModel ) {
        return data
      }

      if ( !data.type ) {
        data.type = data.type || ( 'children' in data ? 'fragment' : 'txt' )
      }
      data.modifiers = data.modifiers || []
      data.locale = data.locale || 'de_DE'
      return data
    }

    if ( Array.isArray(data) ) {
      return this.dataToNode(data[0])
    }
    if ( isMockedFragment ( data ) ) {
      return new KioFragmentModel ( fillContentNode({
        ...data,
        children: data.children.map ( c => this.dataToNode ( c ) )
      }) )
    } else if ( isMockedContent ( data ) ) {
      return new KioContentModel ( fillContentNode(data) )
    } else if ( isTestDataRecord ( data ) || isTestDataRecordData ( data ) ) {
      return this.dataToNode ( data.data )
    } else {
      return this.dataToNode ( mock.mockContent(data) )
    }

  }

  private componentElement=this.componentData.concatMap ( (data:TestDataRecord,idx:number) => {
    const node:KioContentModel|KioFragmentModel = this.dataToNode ( data )
    return Observable.of(this.componentBuilderService.getComponentForNode ( node ))
  } )

  private routeTestDataSub=this.componentBuilderService.routeData.subscribe ( records => {
    console.log('route test data: ', records )
  } )



  ngOnInit() {
    this.componentNames = this.componentBuilderService.allComponents().map ( c => capitalize(c.name.replace(/(kio|publication)\-/,'')))
    this.route.params.subscribe ( ( params ) => {
      if ( params["ComponentName"] ) {
        this._componentName = params["ComponentName"].replace(/Component$/,'')
        this.mountComponent()
      } else {
        this.unmountComponent()
      }
    } )
  }
}
