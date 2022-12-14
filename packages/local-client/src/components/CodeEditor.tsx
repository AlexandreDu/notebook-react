import { useRef } from 'react';
import { Button, Size, BgColor, Hover } from './Button';
import MonacoEditor, {EditorDidMount} from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initialValue?: string;
  onChange: (value: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {

  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = ( getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })
  }

  const onFormatClick = () => {

    const unformatted = editorRef.current.getModel().getValue()
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    })
    // we remove the last new line wich is empty
    .replace(/\n$/, '')

    editorRef.current.setValue(formatted)
  }

  return (
    <div className='group relative w-1/2 h-full'>
      <div className='absolute right-0 z-[20]'>
        <Button
          bgColor={BgColor.SLATE}
          size={Size.SMALL}
          onClick={onFormatClick}
          hover={Hover.GROUP_FADE_IN}
        >
          Format
        </Button>
      </div>
      <MonacoEditor 
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme='dark' 
        language='javascript'  
        options={{
          wordWrap: 'on',
          minimap: {enabled: false},
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  )
}

export default CodeEditor