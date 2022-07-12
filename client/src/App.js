import './App.css';
import { Navbar } from './components';
import { Routes, Route} from 'react-router-dom'
import { Home, Auth } from './containers';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Auth/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
