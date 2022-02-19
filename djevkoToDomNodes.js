import {trim3} from './deps.js'

export const djevkoToDomNodesById = (jevko) => {
  const byId = Object.create(null)
  const elems = djevkoToDomNodes(jevko, byId)
  return [elems, byId]
}

export const djevkoToDomNodes = (jevko, byId = Object.create(null)) => {
  const ret = recur(jevko, byId)

  for (const node of ret) {
    if (Array.isArray(node)) throw Error(`Unexpected top-level attribute (${node[0]})`)
  }

  return ret
}

const recur = (jevko, byId = Object.create(null)) => {
  const {subjevkos, suffix} = jevko

  // text node
  if (subjevkos.length === 0) return [document.createTextNode(suffix)]

  if (suffix.trim() !== '') throw Error('suffix must be blank')
  
  const ret = []
  for (const {prefix, jevko} of subjevkos) {
    const [pre, mid, post] = trim3(prefix)

    // splice/text node
    if (mid === '') ret.push(...recur(jevko, byId))
    // attribute
    else if (mid.endsWith('=')) ret.push([mid.slice(0, -1), jevko])
    // element
    else {
      const element = document.createElement(mid)

      const nodes = recur(jevko, byId)

      for (const e of nodes) {
        if (Array.isArray(e)) {
          const [name, jevko] = e
          if (jevko.subjevkos.length > 0) throw Error(
            'Unexpected subjevko in attribute value.'
          )
          const {suffix} = jevko
          element.setAttribute(name, suffix)
          if (name === 'id') byId[suffix] = element
        } else {
          element.append(e)
        }
      }
    
      ret.push(element)
    }
  }

  return ret
}