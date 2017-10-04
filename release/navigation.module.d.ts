import 'rxjs/add/observable/fromPromise';
import { ModuleWithProviders, Provider } from '@angular/core';
export { TEST_DATA } from './dev/test-data.token';
export { TestDataRecord, TestDataRecordData, MockedContent, MockedFragment } from './dev/interfaces';
import { ComponentBuilderComponent } from './dev/components/component-builder/component-builder.component';
import { ComponentBuilderForm } from './dev/components/component-builder-form/component-builder-form.component';
import { NavigationConfig } from './interfaces/navigation-config';
import { RootNavigationComponent } from './components/root/root-navigation.component';
import { ContentNavigationComponent } from './components/content/content-navigation.component';
import { HeaderComponent } from './components/head/head.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { FootComponent } from './components/foot/foot.component';
export declare const NavigationComponents: (typeof ComponentBuilderComponent | typeof ComponentBuilderForm | typeof RootNavigationComponent | typeof ContentNavigationComponent | typeof HeaderComponent | typeof LanguageSelectorComponent | typeof FootComponent)[];
export { NavigationService } from './services/navigation.service';
export { ComponentBuilderService } from './services/component-builder.service';
export declare const DefaultProviders: Provider[];
export declare class KioNg2NavigationModule {
    static forRoot(config?: NavigationConfig): ModuleWithProviders;
}
