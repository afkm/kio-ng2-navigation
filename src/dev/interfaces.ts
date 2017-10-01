import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'

export interface MockedContent {

  cuid?: string

  locale?: string

  type?: 'txt'|'src'|'fragment'|string

  headers?: any

  modifiers?: string[]

}


export interface MockedFragment extends MockedContent {

  name?: string

  children: (MockedContent|MockedFragment)[]

  type?: 'fragment'

}



export interface TestDataRecordData {

  /**
   * name of test data to distinct multiple options
   */
  name: string
  
  /**
   * mocked data model
   */
  data: MockedContent|MockedFragment

}

export type TestDataRecordDataType = TestDataRecordData|TestDataRecordData[]|MockedContent|MockedFragment|string

export interface TestDataRecord {

  /**
   * name of component, without trailing 'Component' please
   */
  componentName: string
  
  /**
   * either an array of test data sets or a data model
   */
  data: TestDataRecordDataType

}

export interface ComponentBuilderData {

  componentName:string

  node:KioContentModel|KioFragmentModel

}

export function isMockedContent ( other:any ):other is MockedContent {
  return ( 
    'object' === typeof other
    &&
    ( ('cuid' in other) ||  ('locale' in other) ||  ('type' in other) ||  ('headers' in other) ||  ('modifiers' in other) )
  )
}

export function isMockedFragment ( other:any ):other is MockedFragment {
  return ( 
    'object' === typeof other
    &&
    'children' in other
  )
}

export function isTestDataRecordData ( other:any ):other is TestDataRecordData {
  return ( 
    'object' === typeof other
    &&
    'name' in other 
    &&
    'data' in other 
    && (
        isMockedContent ( other['data'] ) || isMockedFragment ( other['data'] )
      )
  )
}

export function isTestDataRecord ( other:any ):other is TestDataRecord {
  return ( 
    'object' === typeof other
    &&
    'componentName' in other 
    &&
    'data' in other 
    && ( 
        (Array.isArray(other['data']) ? other['data'].every(isTestDataRecordData) : isTestDataRecordData ( other['data'] ) )
      ||
      isMockedContent ( other['data'] )
      ||
      isMockedFragment ( other['data'] )
    )
  )
}


export function isComponentBuilderData ( other:any ):other is ComponentBuilderData {
  return ( 
    'object' === typeof other
    &&
    'componentName' in other 
    &&
    'node' in other 
  )
}

export function isTestDataRecordDataType ( other:any ):other is TestDataRecordDataType {
  return ( 
    'string' === typeof other
    ||
    (
      isMockedContent ( other ) 
      || 
      isMockedFragment ( other )
      || 
      isTestDataRecordData ( other )
    )
  )
}
