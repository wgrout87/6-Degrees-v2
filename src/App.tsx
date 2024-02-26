import './App.css';
import SignUp from './app/components/SignUp';
import SignIn from './app/components/SignIn';
import { AuthContextProvider } from './app/context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './app/auth/page'
import NewGame from './app/components/NewGame';

// import Header from './components/Header';

function App() {
  return (
    <div className='App text-light bg-dark min-vh-100'>
      <Router>
          <AuthContextProvider>
            {/* <Header /> */}
            <Routes>
              <Route path='/' element={<NewGame />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
            </Routes>
          </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
