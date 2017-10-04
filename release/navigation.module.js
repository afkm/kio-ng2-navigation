import 'rxjs/add/observable/fromPromise';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { KioNg2SidebarModule, SITEMAP_LOADER } from 'kio-ng2-sidebar';
import { KioNg2UIUXModule } from 'kio-ng2-uiux';
import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing';
import { KioNg2GlobalsModule } from 'kio-ng2-globals';
import { KioNg2NewsletterModule } from 'kio-ng2-newsletter';
import { ScrollService } from 'kio-ng2-scrolling';
import { KioNg2SitemapModule, SitemapChapterService } from 'kio-ng2-sitemap';
import { LightboxModule } from 'kio-ng2-lightbox';
import { Angulartics2Module, Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { NavigationService } from './services/navigation.service';
import { ComponentBuilderService } from './services/component-builder.service';
import { TEST_DATA } from './dev/test-data.token';
export { TEST_DATA } from './dev/test-data.token';
import { ComponentBuilderFormService } from './dev/services/builder-form.service';
import { ComponentDataResolver } from './dev/resolver/component-data.resolver';
import { ComponentBuilderComponent } from './dev/components/component-builder/component-builder.component';
import { ComponentBuilderForm } from './dev/components/component-builder-form/component-builder-form.component';
import { RootNavigationComponent } from './components/root/root-navigation.component';
import { ContentNavigationComponent } from './components/content/content-navigation.component';
import { HeaderComponent } from './components/head/head.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { FootComponent } from './components/foot/foot.component';
export var NavigationComponents = [RootNavigationComponent, ContentNavigationComponent, HeaderComponent, LanguageSelectorComponent, ComponentBuilderComponent, FootComponent, ComponentBuilderForm];
export { NavigationService } from './services/navigation.service';
export { ComponentBuilderService } from './services/component-builder.service';
export var DefaultProviders = [
    Angulartics2,
    Angulartics2GoogleAnalytics,
    NavigationService,
    {
        provide: SITEMAP_LOADER,
        useExisting: NavigationService,
        deps: [SitemapChapterService, Router]
    },
    NavigationService,
    ComponentBuilderService,
    ComponentBuilderFormService,
    ScrollService,
    ComponentDataResolver
];
var KioNg2NavigationModule = /** @class */ (function () {
    function KioNg2NavigationModule() {
    }
    KioNg2NavigationModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        var withTestData = 'testData' in config;
        return {
            ngModule: KioNg2NavigationModule,
            providers: (withTestData
                ? [
                    {
                        provide: TEST_DATA,
                        useValue: config.testData.slice()
                    }
                ]
                : [])
        };
    };
    KioNg2NavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserModule,
                        CommonModule,
                        FormsModule,
                        Ng2PageScrollModule.forRoot(),
                        KioNg2ComponentRoutingModule,
                        KioNg2UIUXModule,
                        KioNg2SitemapModule,
                        Angulartics2Module.forChild(),
                        KioNg2GlobalsModule,
                        KioNg2SidebarModule,
                        RouterModule.forRoot([
                            {
                                path: 'dev',
                                component: ComponentBuilderForm,
                                pathMatch: 'full'
                            },
                            {
                                path: 'dev/:ComponentName',
                                component: ComponentBuilderForm,
                                pathMatch: 'full',
                                resolve: {
                                    componentData: ComponentDataResolver
                                },
                                children: [
                                    {
                                        pathMatch: 'full',
                                        path: '',
                                        component: ComponentBuilderComponent
                                    }
                                ]
                            },
                            {
                                path: '',
                                component: RootNavigationComponent,
                                children: [
                                    {
                                        path: ':lang',
                                        children: [
                                            {
                                                path: '**',
                                                pathMatch: 'full',
                                                component: ContentNavigationComponent
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]),
                        KioNg2NewsletterModule,
                        LightboxModule
                    ],
                    declarations: NavigationComponents.slice(),
                    entryComponents: NavigationComponents.slice(),
                    providers: DefaultProviders.concat([
                        {
                            provide: TEST_DATA,
                            useValue: []
                        }
                    ]),
                    exports: [
                        BrowserModule,
                        CommonModule
                    ].concat(NavigationComponents, [
                        KioNg2SitemapModule,
                        KioNg2SidebarModule,
                        KioNg2UIUXModule,
                        RouterModule,
                        FormsModule
                    ])
                },] },
    ];
    /** @nocollapse */
    KioNg2NavigationModule.ctorParameters = function () { return []; };
    return KioNg2NavigationModule;
}());
export { KioNg2NavigationModule };
//# sourceMappingURL=navigation.module.js.map