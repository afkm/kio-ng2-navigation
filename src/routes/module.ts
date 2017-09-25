import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { RootNavigationComponent } from '../components/root/root-navigation.component'
import { ContentNavigationComponent } from '../components/content/content-navigation.component'
import { ComponentBuilderComponent } from '../components/builder/builder.component'
import { HeaderComponent } from '../components/head/head.component'
import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component'

export const NavigationComponents = [ RootNavigationComponent, ContentNavigationComponent, HeaderComponent, LanguageSelectorComponent, ComponentBuilderComponent ]

@NgModule({
  imports: [
    RouterModule.forRoot( [
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
              path: ':lang',
              children: [
                {
                  path: '',
                  pathMatch: 'full',
                  component: ContentNavigationComponent
                }
              ]
            }
          ]
        }
      ] )
  ],
  exports: [
    RouterModule
  ]
})
export class NavigationRoutesModule {}