import Login from './components/Auth/login';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './Utility/protectedroute';
import Register from './components/Auth/register';
import { useSelector } from 'react-redux';
import Loading from './components/loading/loading';
import Home from './pages/home';
import Profile from './pages/profile';
import NotFound from './pages/notfound';
import Verifyemailform from './components/Auth/verificationemail';
import Forgotpassword from './components/Auth/forgotpassword';
import Resetpasswordform from './components/Auth/resetpassword';

function App() {

  const {loading, isauth} = useSelector((state) => state.auth);
  

  return (
    <>
    {loading && ( <Loading /> ) }
    <Routes>
      <Route path="/" element={<ProtectedRoute><Navigate to="/home" /></ProtectedRoute>} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/login" element={!isauth ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isauth ? <Register /> : <Navigate to="/" />} />
      <Route path="/forgotpassword" element={!isauth ? <Forgotpassword /> : <Navigate to="/" />} />
      <Route path='/resetpassword/:token' element={!isauth ? <Resetpasswordform /> : <Navigate to="/" />} />
      <Route path='/verifyemail' element={!isauth ? <Verifyemailform /> : <Navigate to="/" />} />        
      <Route path='*' element={<NotFound />} />
    </Routes>
  
  </>
  );
}

export default App;
