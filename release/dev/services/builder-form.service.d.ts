import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { Router } from '@angular/router';
export declare class ComponentBuilderFormService {
    private router;
    constructor(router: Router);
    readonly componentName: Observable<string>;
    readonly componentNames: string[];
    setComponentName(name: string): void;
    private _mapComponentName(name);
}
