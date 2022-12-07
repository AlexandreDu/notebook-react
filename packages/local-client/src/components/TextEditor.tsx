import { useState, useRef, useCallback } from 'react';

import { useActions } from '../hooks/useActions';

import ActionBar from './ActionBar';
import MDEditor from "@uiw/react-md-editor";
import { Cell } from '../state/cell';



interface textEditorProps {
  cell: Cell
}
const TextEditor: React.FC<textEditorProps> = ({cell}) => {

  const {updateCell} = useActions()


  const editorRef = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = useState(false)


  const setRef = useCallback((node: any) => {
    const listener = (e: MouseEvent) => {
    
      if (e.target && editorRef.current && !editorRef.current.contains(e.target as Node)) {
        setEditing(false)
      }
    }
    if(!node) {
      document.removeEventListener('click', listener, true)
    }
    if(node) {
      editorRef.current = node
      document.addEventListener('click', listener, true)
      // We have to set capture: true, so the listener is set on the capturing phase and not waiting till the bubbling phase. 
    }

  }, [])


  return (
    <div className='border-2 p-4 relative'>
      <ActionBar id={cell.id} />
      {editing ? (
        <div className='editor' ref={setRef}>
          <MDEditor value={cell.content} onChange={ (v) => updateCell({id: cell.id, content: v || ''}) } />
        </div>
      ) : (
        <div className='preview text' onClick={() => setEditing(true)}>
          {/* heading */}
          <MDEditor.Markdown source={cell.content || 'Click to edit'} />
        </div>
      )}
      
    </div>
  )
}

export default TextEditor