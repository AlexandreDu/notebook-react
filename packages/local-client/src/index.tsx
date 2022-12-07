import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from 'react-redux';
import { store } from './state/store';
import CellList from './components/CellList';
import {createRoot} from "react-dom/client";
import { Header } from './components/Header';


const App = () => {

  return (
    <Provider store={store}>
      <Header />
      <CellList />
    </Provider>
  )
}

const container = document.querySelector('#root') as Element
const root = createRoot(container);
root.render(<App />);

