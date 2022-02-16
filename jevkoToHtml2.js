import {trim3} from 'jevkoutils.js'

export const j2hcolor = (jevko) => {
  const {subjevkos, suffix} = jevko

  let mode = 'text'
  let ret = ''
  for (const {prefix, jevko} of subjevkos) {
    if (mode === 'text') {
      const tag = tag2color(jevko)
      ret += `<span class="text">${prefix}</span>[${tag}]`
      // ignore self-closing for now
      mode = 'content'
    } else {
      if (prefix.trim() !== '') throw Error('oops')
      ret += `${prefix}[${j2hcolor(jevko)}]`
      mode = 'text'
    }
  }
  return ret + `<span class="text">${suffix}</span>`
}

const tag2color = (jevko) => {
  const {subjevkos, suffix} = jevko

  const [pre, mid, post] = trim3(suffix)
  const tag = `${pre}<span class="tag">${mid}</span>${post}`
  let attrs = ''

  for (const {prefix, jevko} of subjevkos) {
    const [pre, mid, post] = trim3(prefix)
    attrs += `${pre}<span class="attr">${mid}</span>${post}[<span class="value">${at2color(jevko)}</span>]`
  }

  return `${attrs}${tag}`

}

const at2color = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length > 0) throw Error('oops')
  return suffix
}



export const j2h2 = (jevko) => {
  const {subjevkos, suffix} = jevko

  let mode = 'text'
  let cltag = ''
  let ret = ''
  for (const {prefix, jevko} of subjevkos) {
    if (mode === 'text') {
      const [open, close] = tag2h(jevko)
      ret += prefix + open
      cltag = close
      // ignore self-closing for now
      mode = 'content'
    } else {
      if (prefix.trim() !== '') throw Error('oops')
      ret += j2h2(jevko) + cltag
      mode = 'text'
    }
  }
  return ret + suffix
}

const tag2h = (jevko) => {
  const {subjevkos, suffix} = jevko

  const [pre, tag, post] = trim3(suffix)
  let attrs = ''

  for (const {prefix, jevko} of subjevkos) {
    attrs += ` ${prefix}="${at2h(jevko)}"`
  }

  return [`<${tag}${attrs}>`, `</${tag}>`]

}

const at2h = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length > 0) throw Error('oops')
  return suffix
}