import { ActivatedRoute, Router } from '@angular/router';
import { Injector, ComponentRef, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { ContentDataComponent, FragmentDataComponent, Annotation } from 'kio-ng2-component-routing';
import { KioContentModel, KioFragmentModel, KioContentState } from 'kio-ng2-data';
export interface ComponentBuilderData {
    componentName?: string;
    componentNames?: string[];
    componentData?: any;
}
/**
 * TODO Kio Module
 * Service Provider with PublicationComponents exported as value
 */
export declare class ComponentBuilderComponent implements OnInit {
    private route;
    private router;
    private componentFactoryResolver;
    protected injector: Injector;
    constructor(route: ActivatedRoute, router: Router, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    mountPoint: ViewContainerRef;
    componentNames: string[];
    data: ComponentBuilderData;
    dataOptions: any[];
    component: ComponentRef<ContentDataComponent | FragmentDataComponent>;
    componentNode: KioContentModel | KioFragmentModel;
    componentState: KioContentState;
    private mockingService;
    private _dataOptionName;
    dataOptionName: any;
    selectOption(optionName: string): void;
    mockDataForComponent(componentName: string): any;
    readonly isMounted: boolean;
    unmountComponent(): void;
    private _componentName;
    componentName: string;
    getComponentItem(node: KioContentModel): {
        name: string;
        component: any;
        fixture: any;
        annotation: Annotation<"txt" | "src" | "fragment">;
    };
    mountComponent(): ComponentRef<ContentDataComponent | FragmentDataComponent>;
    ngOnInit(): void;
}
