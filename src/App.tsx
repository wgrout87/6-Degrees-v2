import './App.css';
import Signup from './app/components/Signup';
import Login from './app/components/Login';
import { AuthContextProvider } from './app/context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from './components/Header';

function App() {
  return (
    <div className='App text-light bg-dark min-vh-100'>
      <Router>
          <AuthContextProvider>
            {/* <Header /> */}
            <Routes>
              {/* <Route path='/' element={<PrivateRouteDashboard />} /> */}
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<Login />} />
            </Routes>
          </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
