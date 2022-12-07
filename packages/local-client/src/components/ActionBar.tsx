import { useActions } from '../hooks/useActions';
import ActionButton from './ActionButton';



interface ActionBarProps {
  id: string
}
const ActionBar: React.FC<ActionBarProps> = ({id}) => {


  const {moveCell, deleteCell} = useActions()

  return (
    <div className='flex absolute z-10 top-0 right-0'>
      <ActionButton
        onClick={() => {
          moveCell({id, direction: 'up'})
        }}
        iconClass='fas fa-arrow-up'
       />
       <ActionButton
        onClick={() => {
          moveCell({id, direction: 'down'})
        }}
        iconClass='fas fa-arrow-down'
       />
       <ActionButton
        onClick={() => {
          deleteCell({id})
        }}
        iconClass='fas fa-times'
       />
    </div>
  )
}

export default ActionBar