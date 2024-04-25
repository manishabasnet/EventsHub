import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Header from "./components/Header";
import EventGallery from './pages/EventGallery';

function App() {

  return (
    <>
    <Header/>

    

    <Routes>
      <Route path="/" element={<EventGallery/>}/>
    </Routes>

    </>
  )
}

export default App
