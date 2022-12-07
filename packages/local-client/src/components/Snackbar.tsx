import { useState } from "react";
import Icon from "./Icon";


const classNames = require('classnames');

enum Severity {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning', 
  ERROR = 'error'
}

const SEVERITY_BG_COLORS_MAPS: Record<Severity, string> = {
  [Severity.SUCCESS]: 'bg-teal-500',
  [Severity.INFO]: 'bg-cyan-600',
  [Severity.WARNING]: 'bg-amber-500',
  [Severity.ERROR]: 'bg-red-700'
}
const SEVERITY_ICONS_MAPS: Record<Severity, JSX.Element> = {
  [Severity.SUCCESS]: <Icon iconClass="fas fa-check-circle" />,
  [Severity.INFO]: <Icon iconClass="fas fa-info-circle" />,
  [Severity.WARNING]: <Icon iconClass="fas fa-exclamation-triangle" />,
  [Severity.ERROR]: <Icon iconClass="fas fa-exclamation-triangle" />
}

interface SnackbarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  content: string
  severity: Severity
}

const Snackbar: React.FC<SnackbarProps> = ({content, severity, ...rest}) => {

  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    console.log('close')
    setIsOpen(false)
  }
  
  return (
    isOpen ? (
      <div 
        {...rest}
        className={classNames(
          `flex items-center justify-between min-h-[3rem] p-4 text-white`, 
          SEVERITY_BG_COLORS_MAPS[severity]
        )}
      >
        <div className="flex">
          <div className="mr-2">
            {SEVERITY_ICONS_MAPS[severity]}
          </div>
        <span className="">{content}</span>
        </div>
        <span onClick={handleClose} className="cursor-pointer">x</span>
      </div>
      ) : (
        null
      )
    
  )
}

export { Snackbar, Severity }