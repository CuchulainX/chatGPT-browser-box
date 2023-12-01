<<<<<<< HEAD
=======
import { getPossibleElementByQuerySelector } from './get-possible-element-by-query-selector.mjs'

>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
function getArea(e) {
  const rect = e.getBoundingClientRect()
  return rect.width * rect.height
}

<<<<<<< HEAD
function findLargestElement(e) {
=======
const adapters = {
  'scholar.google': ['#gs_res_ccl_mid'],
  google: ['#search'],
  csdn: ['#content_views'],
  bing: ['#b_results'],
  wikipedia: ['#mw-content-text'],
  faz: ['.atc-Text'],
  golem: ['article'],
  eetimes: ['article'],
}

function findLargestElement(e) {
  if (!e) {
    return null
  }
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  let maxArea = 0
  let largestElement = null
  const limitedArea = 0.8 * getArea(e)

  function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const area = getArea(node)

      if (area > maxArea && area < limitedArea) {
        maxArea = area
        largestElement = node
      }

      Array.from(node.children).forEach(traverseDOM)
    }
  }

  traverseDOM(e)
  return largestElement
}

export function getCoreContentText() {
<<<<<<< HEAD
=======
  for (const [siteName, selectors] of Object.entries(adapters)) {
    if (location.hostname.includes(siteName)) {
      const element = getPossibleElementByQuerySelector(selectors)
      if (element) return element.innerText || element.textContent
      break
    }
  }

>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  const largestElement = findLargestElement(document.body)
  const secondLargestElement = findLargestElement(largestElement)
  console.log(largestElement)
  console.log(secondLargestElement)

<<<<<<< HEAD
  if (!largestElement) return

  let ret
  if (secondLargestElement && getArea(secondLargestElement) > 0.5 * getArea(largestElement)) {
    ret = secondLargestElement.innerText || secondLargestElement.textContent
    console.log('use second')
  } else {
    ret = largestElement.innerText || largestElement.textContent
=======
  function getTextFrom(e) {
    return e.innerText || e.textContent
  }

  let ret
  if (!largestElement) {
    ret = getTextFrom(document.body)
    console.log('use document.body')
  } else if (
    secondLargestElement &&
    getArea(secondLargestElement) > 0.5 * getArea(largestElement)
  ) {
    ret = getTextFrom(secondLargestElement)
    console.log('use second')
  } else {
    ret = getTextFrom(largestElement)
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
    console.log('use first')
  }
  return ret.trim().replaceAll('  ', '').replaceAll('\n\n', '').replaceAll(',,', '')
}
