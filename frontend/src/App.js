import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext.jsx';
import VideoMeetComponent from './pages/VideoMeet.jsx';
import HomeComponent from './pages/home.jsx'
import History from './pages/history.jsx';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="/auth" element={ <Authentication/> } />
        <Route path='/:url' element={ <VideoMeetComponent/> }  />
        <Route path='/home' element={ <HomeComponent/> } />
         <Route path='/history' element={ <History/> } />
      </Routes>
      </AuthProvider>

  );
}

export default App;
