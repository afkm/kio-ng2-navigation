import { Inject, Injector } from '@angular/core'
import { NavigationService } from '../../services/navigation.service'

export class AbstractNavigationComponent {

  constructor(@Inject(NavigationService) protected navigationService:NavigationService, @Inject(Injector) protected injector:Injector){}

}
