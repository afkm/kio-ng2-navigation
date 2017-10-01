import { Provider } from '@angular/core'
import { ROUTES, Routes } from '@angular/router'
import { Config as SitemapConfig } from 'kio-ng2-sitemap'
import { RootNavigationComponent } from '../components/root/root-navigation.component'
import { ContentNavigationComponent } from '../components/content/content-navigation.component'
import { ComponentBuilderComponent } from '../components/builder/builder.component'

export function routesFactory ( sitemapConfig:SitemapConfig ):Routes {
  return [
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
              path: (sitemapConfig.pagingEnabled ? '**' : '' ),
              pathMatch: 'full',
              component: ContentNavigationComponent
            }
          ]
        }
      ]
    }
  ]
}
