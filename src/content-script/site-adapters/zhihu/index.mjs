import { cropText } from '../../../utils'

export default {
  inputQuery: async () => {
    try {
      const title = document.querySelector('.QuestionHeader-title')?.textContent
      if (title) {
        const description = document.querySelector('.QuestionRichText')?.textContent
        const answerQuery = '.AnswerItem .RichText'

        let answer = ''
        if (location.pathname.includes('answer')) {
          answer = document.querySelector(answerQuery)?.textContent
<<<<<<< HEAD
          return cropText(
=======
          return await cropText(
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
            `以下是一个问答平台的提问与回答内容,给出相应的摘要,以及你对此的看法.问题是:"${title}",问题的进一步描述是:"${description}".` +
              `其中一个回答如下:\n${answer}`,
          )
        } else {
          const answers = document.querySelectorAll(answerQuery)
          for (let i = 1; i <= answers.length && i <= 4; i++) {
            answer += `answer${i}: ${answers[i - 1].textContent}|`
          }
<<<<<<< HEAD
          return cropText(
=======
          return await cropText(
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
            `以下是一个问答平台的提问与回答内容,给出相应的摘要,以及你对此的看法.问题是:"${title}",问题的进一步描述是:"${description}".` +
              `各个回答如下:\n${answer}`,
          )
        }
      } else {
        const title = document.querySelector('.Post-Title')?.textContent
        const description = document.querySelector('.Post-RichText')?.textContent

        if (title) {
          return await cropText(
            `以下是一篇文章,给出相应的摘要,以及你对此的看法.标题是:"${title}",内容是:\n"${description}"`,
          )
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
}
