import { InjectionToken } from '@angular/core'

import { TestDataRecord } from './interfaces'


export let TEST_DATA:InjectionToken<TestDataRecord[]> = new InjectionToken('test_data')
