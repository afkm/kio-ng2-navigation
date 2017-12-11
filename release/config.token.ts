import { InjectionToken } from '@angular/core'
import { NavigationConfig } from './interfaces/navigation-config'


export let NAVIGATION_CONFIG:InjectionToken<NavigationConfig> = new InjectionToken('navigation_config')

