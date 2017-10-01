import { NgModule, isDevMode } from '@angular/core'
import { RouterModule, Routes, ROUTES } from '@angular/router'

import { SITEMAP_CONFIG, Config as SitemapConfig } from 'kio-ng2-sitemap'

import { RootNavigationComponent } from '../components/root/root-navigation.component'
import { ContentNavigationComponent } from '../components/content/content-navigation.component'
//import { ComponentBuilderComponent } from '../components/builder/builder.component'
import { HeaderComponent } from '../components/head/head.component'
import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component'

import { ComponentBuilderComponent } from '../dev/components/component-builder/component-builder.component'
import { ComponentBuilderForm } from '../dev/components/component-builder-form/component-builder-form.component'

export const NavigationComponents = [ RootNavigationComponent, ContentNavigationComponent, HeaderComponent, LanguageSelectorComponent, ComponentBuilderComponent ]


@NgModule({
  imports: [
    RouterModule.forChild([
    {
      path: 'dev',
      component: ComponentBuilderForm,
      pathMatch: 'full',
      children: [
        {
          path: ':ComponentName',
          pathMatch: 'full',
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
  ])
  ],
  exports: [
    RouterModule
  ]
})
export class NavigationRoutesModule {}