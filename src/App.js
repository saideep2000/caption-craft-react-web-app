import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/guest/Signup';
import LoginPage from './pages/guest/Login';
import CraftPage from './pages/guest/Craft';
import PostsPage from './pages/guest/Posts';
import MessagesPage from './pages/guest/Messages';
import ProfilePage from './pages/guest/Profile';
import SettingsPage from './pages/guest/Settings';
import HelpPage from './pages/guest/Help';

function App() {
  return (
    <div>
    <div>
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<CraftPage/>} />
            <Route path="/Login" element={<LoginPage/>} />
            <Route path="/Signup" element={<SignupPage/>} />
            <Route path="/Craft" element={<CraftPage/>} />
            <Route path="/Posts" element={<PostsPage/>} />
            <Route path="/Messages" element={<MessagesPage/>}/>
            <Route path="/Profile" element={<ProfilePage/>}/>
            <Route path="/Settings" element={<SettingsPage/>}/>
            <Route path="/Help" element={<HelpPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;