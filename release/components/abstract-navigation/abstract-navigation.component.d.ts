import { Injector } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
export declare class AbstractNavigationComponent {
    protected navigationService: NavigationService;
    protected injector: Injector;
    constructor(navigationService: NavigationService, injector: Injector);
}
