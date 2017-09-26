import 'rxjs/add/observable/fromPromise';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from './services/navigation.service';
import { KioNg2SidebarModule, SITEMAP_LOADER } from 'kio-ng2-sidebar';
import { KioNg2UIUXModule } from 'kio-ng2-uiux';
import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing';
import { KioNg2GlobalsModule } from 'kio-ng2-globals';
import { KioNg2NewsletterModule } from 'kio-ng2-newsletter';
import { ScrollService } from 'kio-ng2-scrolling';
import { KioNg2SitemapModule, SitemapChapterService } from 'kio-ng2-sitemap';
import { LightboxModule } from 'kio-ng2-lightbox';
import { Angulartics2Module } from 'angulartics2';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
//import { NavigationRoutesModule } from './routes/module'
import { RootNavigationComponent } from './components/root/root-navigation.component';
import { ContentNavigationComponent } from './components/content/content-navigation.component';
import { ComponentBuilderComponent } from './components/builder/builder.component';
import { HeaderComponent } from './components/head/head.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { NavigationRoutesModule } from './routes/module';
export var NavigationComponents = [RootNavigationComponent, ContentNavigationComponent, HeaderComponent, LanguageSelectorComponent, ComponentBuilderComponent];
//export const NavigationComponents = []
var KioNg2NavigationModule = /** @class */ (function () {
    function KioNg2NavigationModule() {
    }
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
                        NavigationRoutesModule,
                        KioNg2NewsletterModule,
                        LightboxModule
                        /*RouterModule.forRoot ([
                          {
                            path: 'dev/:ComponentName',
                            component: ComponentBuilderComponent,
                            pathMatch: 'full'
                          },
                          {
                            path: 'dev',
                            component: ComponentBuilderComponent,
                            pathMatch: 'full'
                          },
                          {
                            path: '',
                            component: RootNavigationComponent,
                            children: [
                              {
                                path: ':slug',
                                pathMatch: 'full',
                                component: ContentNavigationComponent
                              },
                              {
                                path: '',
                                pathMatch: 'full',
                                component: ContentNavigationComponent
                              }
                            ]
                          }
                        ])*/
                    ],
                    declarations: NavigationComponents.slice(),
                    entryComponents: NavigationComponents.slice(),
                    providers: [
                        NavigationService,
                        {
                            provide: SITEMAP_LOADER,
                            useExisting: NavigationService,
                            deps: [SitemapChapterService, Router]
                        },
                        NavigationService,
                        ScrollService
                    ],
                    exports: [
                        BrowserModule,
                        CommonModule
                    ].concat(NavigationComponents, [
                        KioNg2SitemapModule,
                        KioNg2SidebarModule,
                        KioNg2UIUXModule,
                        NavigationRoutesModule,
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