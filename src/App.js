import Login from './pages/login';
import { useAuth } from './context/authcontext';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './Utility/protectedroute';
import Home from './pages/home/home';
import Register from './pages/register';
import Profile from './pages/profile_details';


function App() {


  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Navigate to="/home" /></ProtectedRoute>} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/login" element={!auth.isauth ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!auth.isauth ? <Register /> : <Navigate to="/" />} />
    </Routes>

  );
}

export default App;
