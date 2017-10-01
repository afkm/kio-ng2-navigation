import { OnInit, OnDestroy } from '@angular/core';
import { AbstractNavigationComponent } from '../abstract-navigation/abstract-navigation.component';
import { ComponentBuilderService } from '../../services/component-builder.service';
export declare class RootNavigationComponent extends AbstractNavigationComponent implements OnInit, OnDestroy {
    isDevRoute: boolean;
    protected componentBuilderService: ComponentBuilderService;
    private devRouteSub;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
