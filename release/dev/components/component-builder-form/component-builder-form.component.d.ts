import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentBuilderService } from '../../../services/component-builder.service';
import { ComponentBuilderFormService } from '../../services/builder-form.service';
export declare class ComponentBuilderForm implements OnDestroy {
    protected builderService: ComponentBuilderService;
    protected builderFormService: ComponentBuilderFormService;
    protected activatedRoute: ActivatedRoute;
    constructor(builderService: ComponentBuilderService, builderFormService: ComponentBuilderFormService, activatedRoute: ActivatedRoute);
    componentNames: string[];
    componentName: Observable<string>;
    currentComponentName: string;
    componentState: number;
    isMounted: boolean;
    private _componentSub;
    private _mountStateChangeSub;
    ngOnDestroy(): void;
    updateCurrentComponentName(e: Event): void;
    mountComponent(): void;
    unmountComponent(): void;
}
