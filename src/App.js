import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/Home/Home';
import UserSignIn from './Component/User_Entry/SignIn';
import UserSignup from './Component/User_Entry/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/signup' element={<UserSignup/>}/>
        <Route exact path='/login' element={<UserSignIn/>}/>
      </Routes>  
    </div>
  );
}

export default App;
