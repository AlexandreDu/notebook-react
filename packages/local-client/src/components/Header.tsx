import Icon from "./Icon"
export const Header: React.FC = () => {

  return (
    <header className="flex justify-center items-center h-20 bg-slate-700 text-white text-xl font-bold">
      <div>
        <span>React notebook <Icon iconClass='fas fa-book' /></span> 
      </div>
    </header>
  )
}