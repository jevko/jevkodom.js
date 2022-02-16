import {jevkoutils} from './deps.js'

const {trim3} = jevkoutils

export const jevkoToElements = (jevko) => {
  const {subjevkos, suffix} = jevko

  if (subjevkos.length === 0) return [document.createTextNode(suffix)]
  
  let ret = []
  for (const {prefix, jevko} of subjevkos) {
    const [pre, tag, post] = trim3(prefix)
    // if (pre.length > 0) ret.push(document.createTextNode(pre))
    if (tag === '') ret.push(...jevkoToElements(jevko))
    else if (tag.endsWith('=')) ret.push([tag.slice(0, -1), jevko])
    else {
      const elem = document.createElement(tag)

      const elems = jevkoToElements(jevko)

      for (const e of elems) {
        if (Array.isArray(e)) {
          const [tag, jevko] = e
          if (jevko.subjevkos.length > 0) throw Error(
            'Unexpected subjevko in attribute value.'
          )
          elem.setAttribute(tag, jevko.suffix)
        } else {
          elem.append(e)
        }
      }
    
      ret.push(elem)
    }
  }
  // ret.push(document.createTextNode(suffix))
  return ret
}