import Icon, { IconProps } from './Icon'
import {Button, BgColor, Size, Hover} from './Button'

interface ActionButtonProps extends IconProps {
  onClick: () => void
}
const ActionButton: React.FC<ActionButtonProps> = ({iconClass, onClick}) => {

  return (
    <Button 
      bgColor={BgColor.SLATE}
      size={Size.SMALL} 
      hover={Hover.GROUP_FADE_IN}
      onClick={onClick}
    >
      <Icon iconClass={iconClass}/>
    </Button>
  )
}

export default ActionButton