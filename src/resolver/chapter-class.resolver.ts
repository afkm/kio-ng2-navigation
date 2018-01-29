import { Injectable, Inject } from '@angular/core'
import { SITEMAP_CONFIG, Config } from 'kio-ng2-sitemap'
import { KioFragment } from 'kio-ng2-data'

@Injectable()
export class ChapterClassResolver {

  constructor ( @Inject(SITEMAP_CONFIG) private sitemapConfig:Config ) {

  }


  resolveChapterClass ( node:KioFragment, index:number ) {
    const chapterIndex:number = this.sitemapConfig.chapters.findIndex ( chapter => chapter.cuid === node.cuid )
    return `chapter-${chapterIndex}`
  }



}
