import 'katex/dist/katex.min.css'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
<<<<<<< HEAD
import CopyButton from '../CopyButton'
import { useRef } from 'react'
import PropTypes from 'prop-types'

function Pre({ className, children }) {
  const preRef = useRef(null)
  return (
    <pre className={className} ref={preRef} style="position: relative;">
      <CopyButton
        className="code-copy-btn"
        contentFn={() => preRef.current.textContent}
        size={14}
      />
      {children}
    </pre>
  )
}

Pre.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
}
=======
import { Pre } from './Pre'
import { Hyperlink } from './Hyperlink'
import { memo } from 'react'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585

export function MarkdownRender(props) {
  return (
    <div dir="auto">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
        rehypePlugins={[
          rehypeKatex,
          rehypeRaw,
          [
            rehypeHighlight,
            {
              detect: true,
              ignoreMissing: true,
            },
          ],
        ]}
        components={{
<<<<<<< HEAD
          a: (props) => (
            <a href={props.href} {...linkProperties}>
              {props.children}
            </a>
          ),
=======
          a: Hyperlink,
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
          pre: Pre,
        }}
        {...props}
      >
        {props.children}
      </ReactMarkdown>
    </div>
  )
}

MarkdownRender.propTypes = {
  ...ReactMarkdown.propTypes,
}

export default memo(MarkdownRender)
