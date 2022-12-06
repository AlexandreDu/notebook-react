import { Button, BgColor, Size, Pill } from './Button';

interface AddCellButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}
const AddCellButton: React.FC<AddCellButtonProps> = ({ children, onClick }) => {

  return (
    <div className='mx-2'>
      <Button 
        bgColor={BgColor.SLATE}
        size={Size.SMALL}
        pill={Pill.SMALL}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  )
}

export default AddCellButton