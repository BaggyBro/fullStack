import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './Users'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users/>} />
          <Route path='/create' element={<CreateUser/>} />
          <Route path='/update/:id' element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
