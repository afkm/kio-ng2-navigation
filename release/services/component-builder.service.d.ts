import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Router, RoutesRecognized } from '@angular/router';
import { KioContentModel, KioFragmentModel } from 'kio-ng2-data';
import { TestDataRecord } from '../dev/interfaces';
export declare class ComponentBuilderService {
    protected router: Router;
    testData: TestDataRecord[];
    constructor(router: Router, testData: TestDataRecord[]);
    private toggleMountEmitter;
    isMounted: boolean;
    mountStateChange: Observable<boolean>;
    devRouteEvents: Observable<RoutesRecognized>;
    isDevRoute: Observable<boolean>;
    /** Subscriptions */
    private _mountedStateSubscription;
    /** public methods */
    mountComponent(): void;
    unmountComponent(): void;
    selectComponentByName(componentName: string): void;
    getComponentByName(componentName: string): {
        name: any;
        component: any;
        fixture: any;
        annotation: any;
    };
    getComponentForNode(node: KioContentModel | KioFragmentModel): {
        name: any;
        component: any;
        fixture: any;
        annotation: any;
    };
    allComponents(): {
        name: any;
        component: any;
        fixture: any;
        annotation: any;
    }[];
    /** private methods */
    private _mapComponentItem(componentData?);
}
