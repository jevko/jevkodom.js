import {parseJevko} from 'parsejevko.js'

import { jevkoToHtml } from './jevkoToHtml.js'
import { j2h2, j2hcolor } from './jevkoToHtml2.js'

const jevkoStr = `
html [
  head [
    title [This is a title]
  ]
  body [
    div [
      p [Hello world!]
      abbr [id=[anId] class=[jargon] style=[color: purple;] title=[Hypertext Markup Language][HTML]]
      a [href=[https://www.wikipedia.org/][A link to Wikipedia!]]
      p [[Oh well, ] span [lang=[fr][c'est la vie]][, as they say in France.]]
    ]
  ]
]
`

const parsedJevko = parseJevko(jevkoStr)

console.log(jevkoToHtml(parsedJevko))



console.log(j2hcolor(parseJevko(`[html][
  [head][
    [title][This is a title]
  ]
  [body][
    [div][
      [p][Hello world!]
      [id[anId] class[jargon] style[color: purple;] title[Hypertext Markup Language] abbr][HTML]
      [href[https://www.wikipedia.org/] a][A link to Wikipedia!]
      [p][Oh well, [lang[fr] span][c'est la vie], as they say in France.]
    ]
  ]
]
`)))

console.log(j2h2(parseJevko(`[html][
  [head][
    [title][This is a title]
  ]
  [body][
    [div][
      [p][Hello world!]
      [id[anId] class[jargon] style[color: purple;] title[Hypertext Markup Language] abbr][HTML]
      [href[https://www.wikipedia.org/] a][A link to Wikipedia!]
      [p][Oh well, [lang[fr] span][c'est la vie], as they say in France.]
    ]
  ]
]`)))