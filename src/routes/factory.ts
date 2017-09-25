import { Provider } from '@angular/core'
import { ROUTES, Routes } from '@angular/router'
import { Config } from 'kio-ng2-sitemap'
import { RootNavigationComponent } from '../components/root/root-navigation.component'
import { ContentNavigationComponent } from '../components/content/content-navigation.component'

export function routesConfigFactory ( sitemapConfig:Config, defaultLocale?:string ):Routes {

  defaultLocale = defaultLocale || sitemapConfig.locales[0]

  let childRoutes:Routes
  let redirectTo:string = defaultLocale.substr(0,2)

  if ( sitemapConfig.pagingEnabled !== true ) {
    childRoutes = [
      {
        path: ':locale',
        pathMatch: 'full',
        component: ContentNavigationComponent
      }
    ]
  } else {
    childRoutes = [
      {
        path: ':chapter',
        pathMatch: 'full',
        component: ContentNavigationComponent
      }
    ]
    redirectTo = sitemapConfig.chapters[0].slug[defaultLocale]
  }

  return [
    {
      path: '',
      //pathMatch: 'full',
      component: RootNavigationComponent,
      children: [
        ...childRoutes,
        {
          path: '**',
          redirectTo: redirectTo
        }
      ]
    }
  ]
}