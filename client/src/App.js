import "./styles.css";
import { Routes , Route} from 'react-router-dom'
import FrontendLayout from '../src/layouts/FrontendLayout'
import BlackJack from "../src/pages/play/BlackJack"

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/*' exact element={<FrontendLayout/>}></Route>
          {/* <Route path='/pve' exact element={<BlackJack />}></Route> */}
        </Routes>
    </div>
  );
}

export default App;