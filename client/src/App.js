import "./styles.css";
import BlackJack from "./BlackJack";
import { Routes , Route} from 'react-router-dom'
import FrontendLayout from '../src/layouts/FrontendLayout'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/*' exact element={<FrontendLayout/>}></Route>
          <Route path='/pve' exact element={<BlackJack/>}></Route>
        </Routes>
    </div>
  );
}

export default App;