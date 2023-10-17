import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Footer from './components/Footer/Footer';
import "./index.css"
function App() {
  return (
    <Router>
     <Header />
     <div className='body'>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      </div>
      <Footer />
    </Router>


  )
}

export default App;
