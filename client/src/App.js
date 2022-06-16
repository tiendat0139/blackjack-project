import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import FrontendLayout from '../src/layouts/FrontendLayout'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/*' exact element={<FrontendLayout/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
