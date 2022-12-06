

export interface IconProps {
  iconClass: string;
}

const Icon: React.FC<IconProps> = ({iconClass}) => {

  return (
    <span>
      <i className={iconClass}></i>
    </span>
  )
}

export default Icon