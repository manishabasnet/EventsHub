import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Header from "./components/Header";
import EventGallery from './pages/EventGallery';
import CreateEvent from './pages/CreateEvent';

function App() {

  return (
    <>
    <Header/>

    <Routes>
      <Route path="/" element={<EventGallery/>}/>
      <Route path="/create-event" element={<CreateEvent/>}/>
    </Routes>

    </>
  )
}

export default App
