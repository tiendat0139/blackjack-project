import React, { useEffect } from 'react';
import { Routes , Route} from 'react-router-dom'
import FrontendLayout from '../src/layouts/FrontendLayout'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/*' exact element={<FrontendLayout/>}></Route>
        </Routes>
    </div>
  );
}

 export default App;