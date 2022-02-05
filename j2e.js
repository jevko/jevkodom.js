import {jevkoutils} from './deps.js'

const { trim3 } = jevkoutils

export const j2e = (jevko) => {
  const {subjevkos, suffix} = jevko

  let mode = 'text'
  let tag = '', attrs = []
  let ret = []
  for (const {prefix, jevko} of subjevkos) {
    if (mode === 'text') {
      [tag, attrs] = tag2e(jevko)
      ret.push(document.createTextNode(prefix))
      // ignore self-closing for now
      mode = 'content'
    } else {
      if (prefix.trim() !== '') throw Error('oops')
      const el = document.createElement(tag)
      for (const [k, v] of attrs) {
        el.setAttribute(k, v)
      }
      el.append(...j2e(jevko))
      ret.push(el)
      mode = 'text'
    }
  }
  ret.push(document.createTextNode(suffix))
  return ret
}

const tag2e = (jevko) => {
  const {subjevkos, suffix} = jevko

  const [pre, tag, post] = trim3(suffix)
  let attrs = []

  for (const {prefix, jevko} of subjevkos) {
    const [pre, mid, post] = trim3(prefix)
    attrs.push([mid, at2e(jevko)])
  }

  return [tag, attrs]

}

const at2e = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length > 0) throw Error('oops')
  return suffix
}