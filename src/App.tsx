import logo from './logo.svg';
import './App.css';
import Header from './header/header';
import Sidebar from './sideBar/sidebar';

function App() {
  return (
    <div>
      <div className='sidebar'>
        <Sidebar />
        <Header />
      </div>
    </div>
  );
}

export default App;
