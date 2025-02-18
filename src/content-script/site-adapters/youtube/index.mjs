import { cropText } from '../../../utils'
import { config } from '../index.mjs'

// This function was written by ChatGPT and modified by iamsirsammy
function replaceHtmlEntities(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString.replaceAll('&amp;', '&'), 'text/html')
  return doc.documentElement.innerText
}

export default {
  init: async (hostname, userConfig, getInput, mountComponent) => {
    try {
      let oldUrl = location.href
      const checkUrlChange = async () => {
        if (location.href !== oldUrl) {
          oldUrl = location.href
          mountComponent(config.youtube, userConfig)
        }
      }
      window.setInterval(checkUrlChange, 500)
    } catch (e) {
      /* empty */
    }
    return true
  },
  inputQuery: async () => {
    try {
      const docText = await (
        await fetch(location.href, {
          credentials: 'include',
        })
      ).text()

      const subtitleUrlStartAt = docText.indexOf('https://www.youtube.com/api/timedtext')
      if (subtitleUrlStartAt === -1) return

      let subtitleUrl = docText.substring(subtitleUrlStartAt)
      subtitleUrl = subtitleUrl.substring(0, subtitleUrl.indexOf('"'))
      subtitleUrl = subtitleUrl.replaceAll('\\u0026', '&')

      let title = docText.substring(docText.indexOf('"title":"') + '"title":"'.length)
      title = title.substring(0, title.indexOf('","'))

      const subtitleResponse = await fetch(subtitleUrl)
      if (!subtitleResponse.ok) return
      let subtitleData = await subtitleResponse.text()

      let subtitleContent = ''
      while (subtitleData.indexOf('">') !== -1) {
        subtitleData = subtitleData.substring(subtitleData.indexOf('">') + 2)
        subtitleContent += subtitleData.substring(0, subtitleData.indexOf('<')) + ','
      }

<<<<<<< HEAD
      return cropText(
        `Provide a brief summary of the video using concise language and incorporating the video title.` +
          `The video title is:"${title}".The subtitle content is as follows:\n${subtitleContent}`,
=======
      subtitleContent = replaceHtmlEntities(subtitleContent)

      return await cropText(
        `Provide a structured summary of the following video in markdown format, focusing on key takeaways and crucial information, and ensuring to include the video title. The summary should be easy to read and concise, yet comprehensive.` +
          `The video title is "${title}". The subtitle content is as follows:\n${subtitleContent}`,
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
      )
    } catch (e) {
      console.log(e)
    }
  },
}
