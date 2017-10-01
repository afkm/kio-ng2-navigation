import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { ComponentFactoryResolver, OnInit, OnDestroy, ViewContainerRef, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentBuilderService } from '../../../services/component-builder.service';
import { ComponentBuilderData } from '../../interfaces';
import { FragmentDataComponent, ContentDataComponent } from 'kio-ng2-component-routing';
import { KioContentModel, KioFragmentModel } from 'kio-ng2-data';
export declare class ComponentBuilderComponent implements OnInit, OnDestroy {
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected componentBuilderService: ComponentBuilderService;
    protected activatedRoute: ActivatedRoute;
    constructor(componentFactoryResolver: ComponentFactoryResolver, componentBuilderService: ComponentBuilderService, activatedRoute: ActivatedRoute);
    mountPoint: ViewContainerRef;
    error: Error;
    componentName: string;
    componentNode: KioContentModel | KioFragmentModel;
    component: ComponentRef<ContentDataComponent | FragmentDataComponent>;
    componentDataSource: Observable<ComponentBuilderData>;
    /** observable of initialized data componentRef matching route */
    componentRef: Observable<ComponentRef<FragmentDataComponent | ContentDataComponent>>;
    private _componentData;
    private unmount();
    private _assignTestData(data);
    private _setupComponent(component);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
