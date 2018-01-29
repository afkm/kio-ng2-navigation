import { KioFragment } from 'kio-ng2-data'

export interface ChapterClassResolver {
  (node:KioFragment, index:number):string
}