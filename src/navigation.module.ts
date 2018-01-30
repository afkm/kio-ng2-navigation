import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import { NgModule, ModuleWithProviders, Provider, forwardRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule, Router, Routes, ROUTES } from '@angular/router'
import { KioNg2SidebarModule, SITEMAP_LOADER } from 'kio-ng2-sidebar'
import { KioNg2UIUXModule } from 'kio-ng2-uiux'
import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing'
import { KioNg2GlobalsModule } from 'kio-ng2-globals'
import { KioNg2NewsletterModule } from 'kio-ng2-newsletter'
import { KioNg2ScrollingModule, ScrollService } from 'kio-ng2-scrolling'
import { KioNg2SitemapModule, SitemapChapterService, Config, SITEMAP_CONFIG } from 'kio-ng2-sitemap'
import { LightboxModule } from 'kio-ng2-lightbox'
import { Angulartics2Module, Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { NavigationService } from './services/navigation.service'
import { ComponentBuilderService } from './services/component-builder.service'

import { TestDataRecord, TestDataRecordData, MockedContent, MockedFragment } from './dev/interfaces'
import { TEST_DATA } from './dev/test-data.token'
export { TEST_DATA } from './dev/test-data.token'
export { TestDataRecord, TestDataRecordData, MockedContent, MockedFragment } from './dev/interfaces'
import { ComponentBuilderFormService } from './dev/services/builder-form.service'

import { ComponentDataResolver } from './dev/resolver/component-data.resolver'

import { ComponentBuilderComponent } from './dev/components/component-builder/component-builder.component'
import { ComponentBuilderForm } from './dev/components/component-builder-form/component-builder-form.component'

import { NavigationConfig } from './interfaces/navigation-config'
import { NAVIGATION_CONFIG } from './config.token'

import { RootNavigationComponent } from './components/root/root-navigation.component'
import { ContentNavigationComponent } from './components/content/content-navigation.component'
import { HeaderComponent } from './components/head/head.component'
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component'
import { FootComponent } from './components/foot/foot.component'

export const NavigationComponents = [ RootNavigationComponent, ContentNavigationComponent, HeaderComponent, LanguageSelectorComponent, ComponentBuilderComponent, FootComponent, ComponentBuilderForm ]

export { NavigationService } from './services/navigation.service'
export { ComponentBuilderService } from './services/component-builder.service'

export const DefaultProviders:Provider[] = [
  Angulartics2, 
  Angulartics2GoogleAnalytics,
  NavigationService,
  {
    provide: SITEMAP_LOADER,
    useExisting: NavigationService,
    deps: [SitemapChapterService,Router]
  },
  NavigationService,
  ComponentBuilderService,
  ComponentBuilderFormService,
  ScrollService,
  ComponentDataResolver
]

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    Ng2PageScrollModule.forRoot(),
    KioNg2ComponentRoutingModule,
    KioNg2UIUXModule,
    KioNg2SitemapModule,
    Angulartics2Module.forChild (),
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
  declarations: [
    ...NavigationComponents
  ],
  entryComponents: [ ...NavigationComponents ],
  providers: [
    ...DefaultProviders, 
    {
      provide: TEST_DATA,
      useValue: []
    },
    {
      provide: NAVIGATION_CONFIG,
      useValue: {}
    }
  ],
  exports: [
    BrowserModule,
    CommonModule,
    ...NavigationComponents,
    KioNg2SitemapModule,
    KioNg2SidebarModule,
    KioNg2UIUXModule,
    RouterModule,
    FormsModule
  ]
})
export class KioNg2NavigationModule {

  static forRoot ( config:NavigationConfig={} ):ModuleWithProviders {
    const withTestData:boolean = 'testData' in config

    const providers:Provider[] = [{
      provide: NAVIGATION_CONFIG,
      useValue: config
    }]

    if ( config.testData ) {
      providers.push ( {
        provide: TEST_DATA,
        useValue: config.testData.slice()
      } )
    }

    return {
      ngModule: KioNg2NavigationModule,
      providers
    }
  }

}
