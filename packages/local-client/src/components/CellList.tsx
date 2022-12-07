import { Fragment, useEffect } from "react"

import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useActions"

import AddCell from "./AddCell"
import CellListItem from "./CellListItem"



const CellList: React.FC = () => {

  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id]
    })
  })

  const { fetchCells } = useActions()

  useEffect(() => {
    fetchCells()
  }, [])



  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem 
        cell={cell}  
      />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ))
  return (
    <div>
      <AddCell prevCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList