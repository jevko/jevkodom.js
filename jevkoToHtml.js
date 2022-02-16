import {trim3} from 'jevkoutils.js'

export const jevkoToHtml = (jevko, klazz = 'value') => {
  const {subjevkos, suffix} = jevko

  let ret = ''
  for (const {prefix, jevko} of subjevkos) {
    const [pre, mid, post] = trim3(prefix)
    ret += `${pre}<span class="${mid.endsWith('=')? "attr": "tag"}">${mid}</span>${post}`
    ret += `[${jevkoToHtml(jevko, mid === ''? 'text': 'value')}]`
  }
  return `${ret}<span class="${ret === ''? 'text': klazz}">${suffix}</span>`
}