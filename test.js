import {parseJevko} from './devDeps.js'

import { djevkoToDomNodes, ejevkoToDomNodes } from './mod.js'

const jevkoStr = `
html [
  head [
    title [This is a title]
  ]
  body [
    div [
      p [Hello world!]
      abbr [
        id=[anId]
        class=[jargon]
        style=[color: purple;]
        title=[Hypertext Markup Language]
        [HTML]
      ]
      [ ]
      a [
        href=[https://www.wikipedia.org/]
        [A link to Wikipedia!]
      ]
      p [
        [Oh well, ]
        span [
          lang=[fr]
          [c'est la vie]
        ]
        [, as they say in France.]
      ]
    ]
  ]
]
`

const parsedJevko = parseJevko(jevkoStr)

document.body.append(...djevkoToDomNodes(parsedJevko))

const assert = (...args) => {
  console.assert(...args)
  if (args[0] === false) document.body.append(
    document.createTextNode('Assertion failed (see console)!')
  )
}

assert(document.querySelector('[lang=fr]').textContent === "c'est la vie")

const elems = ejevkoToDomNodes(parseJevko(`[html][
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
]`))

console.log(elems)

document.body.append(...elems)