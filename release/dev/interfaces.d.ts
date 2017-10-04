import { KioContentModel, KioFragmentModel } from 'kio-ng2-data';
export interface MockedContent {
    cuid?: string;
    locale?: string;
    type?: 'txt' | 'src' | 'fragment' | string;
    headers?: any;
    modifiers?: string[];
}
export interface MockedFragment extends MockedContent {
    name?: string;
    children: (MockedContent | MockedFragment)[];
    type?: 'fragment';
}
export interface TestDataRecordData {
    /**
     * name of test data to distinct multiple options
     */
    name: string;
    /**
     * mocked data model
     */
    data: MockedContent | MockedFragment;
}
export declare type TestDataRecordDataType = TestDataRecordData | TestDataRecordData[] | MockedContent | MockedFragment | string;
export interface TestDataRecord {
    /**
     * name of component, without trailing 'Component' please
     */
    componentName: string;
    /**
     * either an array of test data sets or a data model
     */
    data: TestDataRecordDataType;
}
export interface ComponentBuilderData {
    componentName: string;
    node: KioContentModel | KioFragmentModel;
}
export declare function isMockedContent(other: any): other is MockedContent;
export declare function isMockedFragment(other: any): other is MockedFragment;
export declare function isTestDataRecordData(other: any): other is TestDataRecordData;
export declare function isTestDataRecord(other: any): other is TestDataRecord;
export declare function isComponentBuilderData(other: any): other is ComponentBuilderData;
export declare function isTestDataRecordDataType(other: any): other is TestDataRecordDataType;
