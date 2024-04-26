import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Header from "./components/Header";
import EventGallery from './pages/EventGallery';
import CreateEvent from './pages/CreateEvent';
import EditDeletePost from "./pages/EditDeletePost";

function App() {
  

  return (
    <>
      <Header/>

    <Routes>
      <Route path="/" element={<EventGallery/>}/>
      <Route path="/create-event" element={<CreateEvent/>}/>
      <Route path="/edit-delete-event/:id" element={<EditDeletePost/>}/>
    </Routes>

    </>
  )
}

export default App
