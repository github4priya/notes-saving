import './App.css';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import CreateNote from './screens/CreateNote/CreateNote';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
      <Routes>
        <Route path="/" element={<LandingPage/>} exact />
        <Route path="/login" element={<LoginScreen/>} exact />
        <Route path="/register" element={<RegisterScreen/>} exact />
        <Route path="/createnote" element={<CreateNote/>} exact />
        <Route path="/mynotes" element={<MyNotes/>} exact />
        <Route path="/myprofile" element={<ProfileScreen/>} exact />
        </Routes>
      </main>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
