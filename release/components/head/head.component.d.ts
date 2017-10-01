import { OnInit, OnDestroy } from '@angular/core';
import { ComponentBuilderService } from '../../services/component-builder.service';
export declare class HeaderComponent implements OnInit, OnDestroy {
    protected componentBuilderService: ComponentBuilderService;
    constructor(componentBuilderService: ComponentBuilderService);
    isDevRoute: boolean;
    private devRouteSub;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
