import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { TestDataRecordData, TestDataRecord, ComponentBuilderData, MockedContent, MockedFragment } from '../interfaces';
import { ComponentBuilderService } from '../../services/component-builder.service';
import { KioContentModel, KioFragmentModel, KioContent, KioFragment } from 'kio-ng2-data';
export declare class ComponentDataResolver implements Resolve<ComponentBuilderData> {
    private builderService;
    readonly testData: TestDataRecord[];
    constructor(builderService: ComponentBuilderService, testData: TestDataRecord[]);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComponentBuilderData>;
    testDataRecordDataToComponentNode(testDataRecordData: TestDataRecordData | TestDataRecordData[] | string | MockedContent | MockedFragment): KioContentModel | KioFragmentModel;
    testDataRecordToComponentData(testDataRecord: TestDataRecord): KioContentModel | KioFragmentModel;
    protected fillCuid(data: MockedContent): string;
    protected fillContentNode(data: MockedContent): KioContent;
    protected fragmentData(data: MockedFragment): KioFragment;
    protected mockModel(data: MockedContent | MockedFragment): KioContentModel;
    protected mockContentModel(data: MockedContent): KioContentModel;
    protected mockFragmentModel(data: MockedFragment): KioFragmentModel;
}
