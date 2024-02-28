
import './App.css';
import { Route, Routes} from 'react-router-dom'
import About from './Components/About';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Footer from './Components/Footer';
import { AuthProvider } from './Components/AuthContext';
import MenuList from './Components/Menu';
import MenuDescription from './Components/MenuDescription';
import AddToCartForm from './Components/Cartitem';
import PrivateRoute from './Components/Private';
import OrderNow from './Components/OrderNow';
import Address from './Components/Address';
import Search from './Components/Search';



function App() {
  return (
    <div className="App">
     
     <AuthProvider>
     <Navbar/>
     <Routes>
     <Route element={<PrivateRoute />}>
     <Route path='/cartitem'element={<AddToCartForm/>}/>
     <Route path='/'element={<Home/>}/>
     <Route path='/about'element={<About/>}/>
     <Route path='/menu'element={<MenuList/>}/>
     <Route path='/search'element={<Search/>}/>
     <Route path='/item/:id'element={<MenuDescription/>}/>
     <Route path='/order'element={<OrderNow/>}/>
     <Route path='/saveaddress'element={<Address/>}/>
     </Route> 
     <Route path='/login'element={<Login/>}/>
     <Route path='/reg'element={<Registration/>}/>
     <Route path='/contact'element={<Contact/>}/>
     </Routes>
     
     </AuthProvider>

     <Footer/>
     

    </div>
  );
}

export default App;


