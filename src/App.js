import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage.tsx';
import Login from './components/LoginPage.tsx';
import Register from './components/RegistrationPage.tsx';
import Profile from './components/UserProfilePage.tsx';
import NotFound from './components/NotFoundPage.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation.tsx';
import Dashboard from './components/Dashboard.tsx';
import PostForm from './components/PostForm.tsx';

function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/create-post' element={<PostForm/>} />
        <Route element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
