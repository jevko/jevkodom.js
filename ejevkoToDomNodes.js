import {trim3} from './deps.js'

/**
 * Element Jevko (ejevko) is an alternative to DOM Jevko (djevko)
 * 
 * Example ejevko:
 * 
 * ```
 * [lang[fr] span][c'est la vie]
 * ```
 * 
 * analogous HTML:
 * 
 * ```
 * <span lang="fr">c'est la vie</span>
 * ```
 * 
 * @param {*} jevko 
 * @returns 
 */
export const ejevkoToDomNodes = (jevko) => {
  const {subjevkos, suffix} = jevko

  let mode = 'text'
  let tag = '', attrs = []
  let ret = []
  for (const {prefix, jevko} of subjevkos) {
    if (mode === 'text') {
      [tag, attrs] = jevkoToTagAttrs(jevko)
      ret.push(document.createTextNode(prefix))
      // ignore self-closing for now
      mode = 'content'
    } else {
      if (prefix.trim() !== '') throw Error('oops')
      const el = document.createElement(tag)
      for (const [k, v] of attrs) {
        el.setAttribute(k, v)
      }
      el.append(...ejevkoToDomNodes(jevko))
      ret.push(el)
      mode = 'text'
    }
  }
  ret.push(document.createTextNode(suffix))
  return ret
}

const jevkoToTagAttrs = (jevko) => {
  const {subjevkos, suffix} = jevko

  const [pre, tag, post] = trim3(suffix)
  let attrs = []

  for (const {prefix, jevko} of subjevkos) {
    const [pre, mid, post] = trim3(prefix)
    attrs.push([mid, jevkoToAttrValue(jevko)])
  }

  return [tag, attrs]

}

const jevkoToAttrValue = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length > 0) throw Error('oops')
  return suffix
}