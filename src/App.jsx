import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Header from "./components/Header";
import EventGallery from './pages/EventGallery';
import CreateEvent from './pages/CreateEvent';
import EditDeletePost from "./pages/EditDeletePost";
import PostDetail from "./pages/PostDetail";

function App() {
  

  return (
    <>
      <Header/>

    <Routes>
      <Route path="/" element={<EventGallery/>}/>
      <Route path="/create-event" element={<CreateEvent/>}/>
      <Route path="/edit-delete-event/:id" element={<EditDeletePost/>}/>
      <Route path="event-detail/:id" element={<PostDetail/>}/>
    </Routes>

    </>
  )
}

export default App
