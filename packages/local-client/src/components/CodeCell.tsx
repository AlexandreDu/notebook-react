import { useEffect } from 'react';

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ResizableComponent from './resizable/Resizable';

import { useIsFirstCodeCell } from '../hooks/useIsFirstCodeCell';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

import { Cell } from '../state';

import { Snackbar, Severity } from './Snackbar';
import CodeEditor  from './CodeEditor';
import Preview from './Preview';

import { useCumulativeCode } from '../hooks/useCumulativeCode';


export interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {


  const {createBundle, updateCell} = useActions()

  const isFirstCodeCell = useIsFirstCodeCell(cell.id)

  const bundle = useTypedSelector((state) => state.bundles[cell.id])

  const cumulativeCode = useCumulativeCode(cell.id)
  

  useEffect(() => {

    const timer: NodeJS.Timeout = setTimeout(async () => {
      createBundle({ cellId: cell.id, input: cumulativeCode })
    }, 1000)
    // clean-up function acts as deboucing to avoid bundle too many times when the user write the code
    return () => {
      clearTimeout(timer)
    }

  }, [cumulativeCode, cell.id, createBundle])

  return (
    <>
    {isFirstCodeCell && 
      <Snackbar 
        content={'use show() to render JSX'} 
        severity={Severity.INFO}
      />}
      <ResizableComponent>
        <div className='flex flex-wrap flex-row h-[calc(100%-10px)]'>
          <CodeEditor 
            initialValue={cell.content} 
            onChange={(value) => updateCell({id: cell.id, content: value})}
          />
          {!bundle || bundle.loading ? (
            <ClimbingBoxLoader
              color={'#334155'}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <Preview 
              code={bundle.code}
              // error={bundle.err}
              error={bundle.err}
            />
          )}
          
        </div>
      </ResizableComponent>
    </>
  )
}

export default CodeCell



