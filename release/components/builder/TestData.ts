import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'
import { mock } from 'kio-ng2-component-routing'
const { mockFragment, mockContentFromString, mockContent, cuid } = mock

const LONG_TEXT = "Aorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

const SHORT_TEXT = "Lorem ip&shy;sum dolor sit amet"

const mockLandscapeImageSrc =   new KioContentModel ( {
  cuid: 'cj1nej1wd000p3k5ws9854bxr',
  locale: 'en_US',
  type: 'src',
  headers: {
    color: 'red' ,
    ratio: 764/569,
    mimeType: 'image/jpeg'
  }
} )

const mockPortraitImageSrc = new KioContentModel ( {
  cuid: 'cj1rl47ap00053k5wd4mp0xjg' ,
  locale: 'en_US' ,
  type: 'src' ,
  headers: {
    color: 'blue' ,
    ratio: 685/999,
    mimeType: 'image/jpeg'
  }
})

const mockAudioSource = new KioContentModel ( {
  cuid: 'cj3ld2gso00003i5wa6b2it04',
  locale: 'de_DE',
  type: 'src'
} )

const VIMEO_SRC = new KioContentModel ( {
  cuid: 'cj5xyhmfr000r3i5xrs09fwih',
  type: 'src',
  locale: 'en_US'
})

const mockLongText = new KioContentModel ( {
  cuid: cuid(`text=${LONG_TEXT}`) ,
  locale: 'en_US' ,
  type: 'txt' ,
  headers: {
    length: LONG_TEXT.length
  },
  modifiers : ['initial']
})

const mockShortText = new KioContentModel ( {
  cuid: cuid(`text=${SHORT_TEXT}`) ,
  locale: 'en_US' ,
  type: 'txt' ,
  headers: {
    length: SHORT_TEXT.length
  }
})

export const TestData = [

  {
    componentName: 'MediaSingleImage' ,
    data: [
      {
        name: 'portrait' ,
        data: new KioFragmentModel ( {
          cuid: '2489u92hiuh42uh4',
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' )
          ]
        } )
      },
      {
        name: 'landscape' ,
        data: new KioFragmentModel ( {
          cuid: '2489u92hiuh42uh4',
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' )
          ]
        } )
      }
    ]
  },
  {
    componentName: 'SingleColumn' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        mockLongText
      ]
    } )
  },
  {
    componentName: 'SingleColumnCollapsible' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['collapsible'],
      children: [
        mockLongText
      ]
    } )
  },
  {
    componentName: 'Headline' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['headline'],
      children: [
        mockShortText
      ]
    } )
  },
  {
    componentName: 'SubHeadline' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['headline', 'sub', 'matisse-light'],
      children: [
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'SectionHeadline' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['headline', 'section'],
      children: [
        mockShortText,
        mockShortText
      ]
    } )
  },
  {
    componentName: 'ChapterCover' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['chapter-cover', 'reverse'],
      children: [
        mockLandscapeImageSrc,
        mockShortText,
        mockShortText,
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'TwoColumns' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        mockLongText,
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'TwoColumnsAndImage' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        mockLongText,
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockPortraitImageSrc,
            // mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        })
      ]
    } )
  },
  {
    componentName: 'TextAndAudio' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        mockContent ( 'txt' ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['audio'],
          children: [
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockLandscapeImageSrc // should be audio-src
          ]
        }),
      ]
    } )
  },
  {
    componentName: 'BigPic' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['big-pic'],
      children: [
        mockShortText,
        mockShortText,
        mockPortraitImageSrc,
        mockLandscapeImageSrc,
        mockLandscapeImageSrc
      ]
    } )
  },
  {
    componentName: 'LabeledImage' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        mockLandscapeImageSrc,
        // mockPortraitImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'LabeledImageWithReveal' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['reveal'],
      children: [
        mockLandscapeImageSrc,
        mockLandscapeImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'LabeledImageWithZoom' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['zoom','x-10', 'y-80', 'z-200'],
      children: [
        mockLandscapeImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'ImageComparisonClash' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['clash','bonnard-light'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            // mockLandscapeImageSrc,
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            // mockLandscapeImageSrc,
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },
  {
    componentName: 'ImageComparisonZoom' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['zoom','matisse-light'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['matisse-light'],
          children: [
            mockLandscapeImageSrc,
            // mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['bonnard-light'],
          children: [
            // mockLandscapeImageSrc,
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },
  {
    componentName: 'ImageComparisonReveal' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['reveal','matisse-light'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['matisse-light'],
          children: [
            mockLandscapeImageSrc,
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['bonnard-light'],
          children: [
            mockPortraitImageSrc,
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },
  {
    componentName: 'ImageComparisonFlip' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['flip','matisse-light'],
      children: [
        mockLandscapeImageSrc,
        mockLandscapeImageSrc,
        // mockPortraitImageSrc,
        // mockPortraitImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'ImageComparisonDetails' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['bonnard'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox'],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox'],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },
  {
    componentName: 'LabeledImageWithDescription' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  [],
      children: [
        mockLandscapeImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'ImageAndAudio' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['audio','matisse-light'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['audio'],
          children: [
            mockShortText,
            mockShortText,
            mockAudioSource // should be audio-src
          ]
        })
      ]
    } )
  },
  {
    componentName: 'ImageGallery',
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['gallery','matisse-light','infinite','autoplay'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },
  {
    componentName: 'Video' ,
    data: mockFragment ( [VIMEO_SRC, 'txt'], ['video'] )
  },
  {
    componentName: 'LabeledImageWithMorphing' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['morph'],
      children: [
        mockContent ( 'txt' ),
        mockContent ( 'txt' ),
        mockPortraitImageSrc,
        mockPortraitImageSrc,
        mockPortraitImageSrc
      ]
    } )
  },
  {
    componentName: 'Intro' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['intro'],
      children: [
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'FormattedText',
    data: new KioContentModel({
      type: 'txt',
      cuid: 'cj3lewufx00213i5ycgmevw9h'
    })
  },
  {
    componentName: 'Outro' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['outro'],
      children: [
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'Newsticker' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['ticker'],
      children: [
        mockShortText,
        mockShortText,
        mockShortText
      ]
    } )
  },
  {
    componentName: 'Hint' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['hint'],
      children: [
        mockShortText,
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'Nba' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['nba'],
      children: [
        mockContent ( 'txt' ),
        mockLandscapeImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'NbaGroup' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['nba'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['nba'],
          children: [
            mockContent ( 'txt' ),
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['nba'],
          children: [
            mockContent ( 'txt' ),
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['nba'],
          children: [
            mockContent ( 'txt' ),
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['nba'],
          children: [
            mockContent ( 'txt' ),
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },
  {
    componentName: 'Social' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['social'],
      children: [
        mockShortText
      ]
    } )
  },
  {
    componentName: 'Share' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['share'],
      children: [
        mockShortText,
        mockShortText
      ]
    } )
  },

  {
    componentName: 'Quote' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['quote'],
      children: [
        mockContent ( 'txt' ),
        mockShortText,
        mockContent ( 'txt' )
      ]
    } )
  },

  {
    componentName: 'GroupOfQuotes' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['quote','bonnard-light'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['quote'],
          children: [
            mockContent ( 'txt' ),
            mockShortText,
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['quote'],
          children: [
            mockShortText,
            mockLongText,
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['quote'],
          children: [
            mockContent ( 'txt' ),
            mockShortText,
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['quote'],
          children: [
            mockContent ( 'txt' ),
            mockShortText,
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['quote'],
          children: [
            mockContent ( 'txt' ),
            mockShortText,
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },

  {
    componentName: 'ImageMagnifier' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['image','magnify', 'align-right', 'x-20', 'y-70'],
      children: [
        mockLandscapeImageSrc,
        mockPortraitImageSrc,
        mockContent ( 'txt' )
      ]
    } )
  },

  {
    componentName: 'MetaBox' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['metabox','matisse-light'],
      children: [
        mockShortText,
        mockContent ( 'txt' ),
        mockContent ( 'txt' ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockLandscapeImageSrc,
            // mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },

  {
    componentName: 'MetaboxCore' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['metabox','core'],
      children: [
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },

  {
    componentName: 'MetaImage' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['metabox'],
      children: [
        mockLandscapeImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },
  {
    componentName: 'Audioplayer' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['audio'],
      children: [
        mockShortText,
        mockAudioSource, // this has to be audio src
        mockShortText
      ]
    } )
  },

  {
    componentName: 'ComparisonSlider' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['comparison'],
      children: [
        mockLandscapeImageSrc,
        mockLandscapeImageSrc,
        mockContent ( 'txt' ),
        mockContent ( 'txt' )
      ]
    } )
  },

  {
    componentName: 'GalleryGrid' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['gallery','grid'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  [],
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },

  {
    componentName: 'MetaImages' ,
    data: new KioFragmentModel ( {
      cuid: cuid () ,
      modifiers:  ['metabox'],
      children: [
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox'],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockLongText
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox'],
          children: [
            mockPortraitImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } ),
        new KioFragmentModel ( {
          cuid: cuid () ,
          modifiers:  ['metabox'],
          children: [
            mockLandscapeImageSrc,
            mockContent ( 'txt' ),
            mockContent ( 'txt' ),
            mockContent ( 'txt' )
          ]
        } )
      ]
    } )
  },
  {
    componentName: 'Image',
    data: new KioContentModel ({
      type: 'src',
      cuid: 'cj3le7adu000b3i5w932wpbzy',
      locale: 'de_DE'
    })
  }
]
