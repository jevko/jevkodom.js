import {trim3} from './deps.js'

export const djevkoToDomNodesById = (jevko) => {
  const byId = Object.create(null)
  const elems = djevkoToDomNodes(jevko, byId)
  return [elems, byId]
}

export const djevkoToDomNodes = (jevko, byId = Object.create(null)) => {
  const {subjevkos, suffix} = jevko
  
  const ret = []
  for (const {prefix, jevko} of subjevkos) {
    const [pre, tag, post] = trim3(prefix)
    if (pre.length > 0) ret.push(document.createTextNode(pre))
    if (tag === '') ret.push(...djevkoToDomNodes(jevko, byId))
    else if (tag.endsWith('=')) ret.push([tag.slice(0, -1), jevko])
    else {
      const elem = document.createElement(tag)

      const elems = djevkoToDomNodes(jevko, byId)

      for (const e of elems) {
        if (Array.isArray(e)) {
          const [tag, jevko] = e
          if (jevko.subjevkos.length > 0) throw Error('attrib must be suffix-only')
          elem.setAttribute(tag, jevko.suffix)
          if (tag === 'id') byId[jevko.suffix] = elem
        } else {
          elem.append(e)
        }
      }
    
      ret.push(elem)
    }
  }
  ret.push(document.createTextNode(suffix))
  return ret
}