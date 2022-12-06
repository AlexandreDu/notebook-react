import { useTypedSelector } from "./useTypedSelector";
export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    // We want to import by default React and ReactDOM to make our show function available by default, so to avoid naming conflict in the case the user would import React and ReactDOM, we set jsxFactory: "_React.createElement",jsxFragment: "_React.Fragment" in the esBuild build's method  (file: useCumulativeCode)
    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
      var show = (value) => {
        
        const root = document.querySelector('#root')
        if (typeof value === 'object') {
          if(value.$$typeof && value.props) {
            _ReactDOM.render(value, root)
          } else {
            root.innerHTML = JSON.stringify(value)
          }
          
        } else {
          root.innerHTML = value
        }
      }
    `;
    const showFuncNoop = "var show = ()=> {}";
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }

      if (c.id === cellId) {
        break;
      }
    }

    return cumulativeCode.join("\n");
  });
};
