import { ActivatedRoute, Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { 
  Input, Injector, ReflectiveInjector, 
  Component, QueryList, ContentChildren, ComponentRef, ComponentFactoryResolver, 
  ViewContainerRef, ViewChild, OnInit 
} from '@angular/core';
import { 
  DataComponent, ContentDataComponent, FragmentDataComponent, 
  Factory, defaultStore, ContentMockingService,
  Annotation
} from 'kio-ng2-component-routing'
import { TestData } from './TestData'

import { KioContentModel, KioFragmentModel, KioContentState } from 'kio-ng2-data'


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
    protected injector:Injector
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
    }
  }

  get dataOptionName () : any {
    return this._dataOptionName
  }

  mockDataForComponent ( componentName : string ) {
    let testData = TestData.find ( data => data.componentName === componentName )
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
    } = defaultStore.getComponentForNode(node)
    return {
      name, 
      component, 
      fixture, 
      annotation
    }
  }

  mountComponent() {
    this.unmountComponent()
    if ( !this._componentName )
      return
    
    this.data.componentName = this._componentName
    //const SelectedComponent : LazyLoad.KioComponent<KioContentModel> = PublicationComponents.find ( comp => comp.name === this._componentName + 'Component' )
    //const resolvedComponent = this.componentFactoryResolver.resolveComponentFactory(SelectedComponent)
    //const resolvedComponent = LazyLoad.createFactoryForComponentItem(this.componentFactoryResolver,SelectedComponent)
    
    const mockedNode = this.mockDataForComponent(this._componentName)
    console.group('mocked node')
    console.log(describeNode(mockedNode))
    console.groupEnd()
    const componentItem = defaultStore.getComponentByName(this._componentName)
    if ( !componentItem ) {
      console.error('No component found for name "%s"', this._componentName)
      return
    }
    const routedComponentItem = this.getComponentItem(mockedNode)
    if ( !routedComponentItem || componentItem.component !== routedComponentItem.component ) {
      console.warn(`Expected component ${this._componentName}Component but got ${routedComponentItem && routedComponentItem.name}`)
    }
    this.componentNode = mockedNode;
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
    if ( !mockedNode )
    {
      throw Error ( 'no fixture available for "' + this._componentName + '"!' )
    }
    if ( Array.isArray ( mockedNode ) )
    {
      this.dataOptions = mockedNode
      if ( this.dataOptionName )
      {
        const idx = mockedNode.findIndex ( item => item.name === this.dataOptionName )
        if ( idx === -1 )
        {
          this.dataOptionName = mockedNode[0].name
        }
      }else
      {
        this.dataOptionName = mockedNode[0].name
      }
      this.selectOption ( this.dataOptionName )
    }
    /*else 
    {
      this.component.instance.node = mockedNode
    }*/
    return this.component
    //componentRef.instance.node = this.node
  }

  ngOnInit() {
    this.componentNames = defaultStore.map ( c => capitalize(c.name.replace(/(kio|publication)\-/,'')))
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
