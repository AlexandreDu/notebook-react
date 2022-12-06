import './resizable.css'
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  children: React.ReactNode;
}

const ResizableComponent: React.FC<ResizableProps> = ({children}) => {

  let verticalResizableProps: ResizableBoxProps

    verticalResizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9]
    }
  
  
 
  return (
    <ResizableBox {...verticalResizableProps}>
      {children}
    </ResizableBox>
  )
}

export default ResizableComponent