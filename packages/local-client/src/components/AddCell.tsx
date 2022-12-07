import { useState } from 'react';
import { useActions } from '../hooks/useActions';
import AddCellButton from '../components/AddCellButton';
import {Button, Size, BgColor, Pill} from '../components/Button';
import Icon from '../components/Icon';


interface AddCellProps {
  prevCellId: string | null
}

const AddCell: React.FC<AddCellProps> = ({prevCellId}) => {

  const {insertCellAfter} = useActions()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen(true)
  }

  return (
    <div className='flex flex-wrap justify-center relative my-4'>
      {isMenuOpen ? (
        <>
          <AddCellButton 
            onClick={() => {
              insertCellAfter({id: prevCellId, cellType: 'text'})
              setIsMenuOpen(false)
            }}  
          >
            <Icon iconClass='fas fa-quote-left' />
          </AddCellButton>
          <AddCellButton 
            onClick={() => {
              insertCellAfter({id: prevCellId, cellType: 'code'})
              setIsMenuOpen(false)
            }} 
          >
            <Icon iconClass='fas fa-code' />
          </AddCellButton>
        </>
      ) : (
        <Button 
          bgColor={BgColor.TRANSPARENT}
          size={Size.SMALL} 
          pill={Pill.FULL}
          onClick={handleOpenMenu}>
          <Icon iconClass='fas fa-plus' />
        </Button>
      )}
      
      
      
    </div>
  )
}

export default AddCell