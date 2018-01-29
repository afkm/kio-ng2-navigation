import { Injectable, Inject } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
const LONG_TEXT:string = "Aorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

const SHORT_TEXT:string = "Lorem ip&shy;sum dolor sit amet"

import { 
  TestDataRecordData, isTestDataRecordData, 
  TestDataRecord, isTestDataRecord, 
  ComponentBuilderData, isComponentBuilderData ,
  MockedContent, isMockedContent,
  MockedFragment, isMockedFragment
} from '../interfaces'

import { TEST_DATA } from '../test-data.token'
import { ComponentBuilderService } from '../../services/component-builder.service'
import { mock } from 'kio-ng2-component-routing'

import { KioContentModel, KioFragmentModel, KioContent, KioFragment } from 'kio-ng2-data'



@Injectable()
export class ComponentDataResolver implements Resolve<ComponentBuilderData> {

  constructor ( 
    private builderService:ComponentBuilderService,
    @Inject(TEST_DATA) readonly testData:TestDataRecord[]
    ) {

  }

  resolve ( route:ActivatedRouteSnapshot, state:RouterStateSnapshot ):Observable<ComponentBuilderData> {

    const componentName:string = route.paramMap.get('ComponentName')
    
    let data = this.testData.slice()
    if ( componentName ) {
      data = data.filter ( rec => rec.componentName === componentName )
    }

    if ( data.length === 1 ) {
      return Observable.of({
        componentName ,
        node: this.testDataRecordToComponentData ( data[0] )
      })
    } else {
      return Observable.throw(new Error(`Failed to select data for component "${componentName}". ${data.length} candidates`))
    }
    
  }

  testDataRecordDataToComponentNode ( testDataRecordData:TestDataRecordData|TestDataRecordData[]|string|MockedContent|MockedFragment ):KioContentModel|KioFragmentModel {
    
    if ( 'string' === typeof testDataRecordData ) {

      if ( 'txt' === testDataRecordData ) {
        return this.mockContentModel ( {
          type: 'txt'
        } )
      } 
      return mock.mockContent ( testDataRecordData )
    } else if ( isMockedFragment ( testDataRecordData ) ) {
      return this.mockFragmentModel ( testDataRecordData )
    } else if ( isMockedContent ( testDataRecordData ) ) {
      return this.mockContentModel ( testDataRecordData )
    } else if ( isTestDataRecordData (testDataRecordData) ) {
      return this.testDataRecordDataToComponentNode ( testDataRecordData.data )
    } else if ( Array.isArray ( testDataRecordData ) ) {
      return this.testDataRecordDataToComponentNode ( testDataRecordData [0] )
    } else {
      return undefined
    }
  }

  testDataRecordToComponentData ( testDataRecord:TestDataRecord ) {

    return this.testDataRecordDataToComponentNode ( testDataRecord.data )

  }

  protected fillCuid ( data:MockedContent ) {

    if ( data.cuid ) {
      if ( /[a-z0-9]{25}/.test(data.cuid) ) {
        return data.cuid
      } else if ( /\w+\=.*/.test(data.cuid) ) {
        return mock.cuid ( data.cuid )
      } else {
        return data.cuid
      }      
    } else if ( data.type === 'txt' ) {
      return mock.cuid ( `text=${LONG_TEXT}` )
    } else {
      return mock.cuid()
    }

  }

  protected fillContentType ( data:MockedContent ) {
    if ( data.type ) {
      return data.type
    }

    if ( data['children'] ) {
      return 'fragment'
    }

    return 'txt'
  }

  protected fillContentNode ( data:MockedContent ):KioContent {

    return {
      cuid: this.fillCuid(data),
      type: this.fillContentType(data),
      locale: data.locale || 'de_DE',
      modifiers: (data.modifiers || []).slice(),
      headers: data.headers || {}
    }

  }

  protected fragmentData ( data:MockedFragment ):KioFragment {
    const contentData:KioContent = this.fillContentNode ( data )
    return Object.assign(data,contentData,data)
  }

  protected mockModel ( data:MockedContent|MockedFragment ) {

    if ( data instanceof KioContentModel ) {
      return data
    }

    if ( isMockedFragment ( data ) ) {
      return this.mockFragmentModel ( data )
    } else {
      return this.mockContentModel ( data )
    }

  }

  protected mockContentModel ( data:MockedContent ) {
    const contentData = this.fillContentNode ( data )
    return new KioContentModel ( contentData )
  }

  protected mockFragmentModel ( data:MockedFragment ) {
    const contentData = this.fragmentData ( data )

    contentData.children = contentData.children.map ( child => this.mockModel ( child ) )
    //data = { ...this.fillContentNode ( data ), ...data, type: 'fragment' }
    return new KioFragmentModel ( contentData )
  }

}
