import React, { useEffect, useRef } from 'react'


interface PreviewProps {
  code: string;
  error: string;
}

const html = `
    <html>
      <head>
      </head>
      <body>
        <div id='root'>
        </div>
        <script>
          const handleError = (error) => {
            console.error(error)
            const root = document.querySelector('#root')
            root.innerHTML = '<div style="color: red;"><h3>Runtime Error</h3><p>' + error + '</p></div>'
          }
          window.addEventListener('error', (event) => {
            event.preventDefault()
            handleError(event.error)
          })
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err)
            }
          }, false)
        </script>
      </body>
    </html>
  `

const Preview: React.FC<PreviewProps> = ({code, error}) => {

  const iframeRef = useRef<any>()

  useEffect(() => {
    // we set the content of the iframe with the content of html. We do this everytime a user submit code in order to be sure to have all elements of this 'content' (a user could have removed the div #root for example )
    iframeRef.current.srcdoc = html

    // we emit an message event to the iframe with the bundled and transpiled code. We delay the postMessage to give the browser time to set the event listener
    const timer = setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [code])
    
  return (
    // 'after' pseudo element to prevent bugs when resizing vertically when the mouse is hovering the iframe
      <div className='bg-slate-400 w-1/2 h-full relative after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content-[""]'>
        {/* bundle error */}
        {error && (
          <p className='text-red-500 font-semibold '>
            {error}
          </p>
        )}
          <iframe className='text-black w-full' ref={iframeRef} title='preview' sandbox='allow-scripts' srcDoc={html} />
      </div>
  )
}

export default Preview