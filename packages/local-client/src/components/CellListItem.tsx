import ActionBar from './ActionBar';
import TextEditor from './TextEditor';
import CodeCell from './CodeCell';
import { CodeCellProps } from './CodeCell';


interface CellListItemProps extends CodeCellProps {}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {

  // if the cell is the first code
  

  let item: JSX.Element
  if (cell.type === 'code') {
    item = <CodeCell cell={cell} />
  } else {
    item = <TextEditor cell={cell} />
  }

  return (
    <div className='group'>
      <ActionBar id={cell.id} />
      {item}
    </div>
  )
}

export default CellListItem