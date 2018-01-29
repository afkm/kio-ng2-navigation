import { KioFragment } from 'kio-ng2-data'
import { TestDataRecord } from '../dev/interfaces'
import { ChapterClassResolver } from './chapter-class-resolver'


export interface NavigationConfig {

  testData?: TestDataRecord[]

  debugging?: boolean

  chapterClassResolver?: ChapterClassResolver

}