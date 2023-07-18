import { BrowserRouter as Router,Routes, Route, HashRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyProfile from './pages/MyProfile';
import LoginPage from './pages/LoginPage';
import Product from './pages/Product';
import Shop from './pages/Shop';
import ViewRecordPage from './pages/ViewRecordPage';
import User from './pages/User';
import { v4 as uuid } from 'uuid';

import c_user from './object-config/user.json';
import c_product from './object-config/product.json';
import c_shop from './object-config/shop.json';
import c_profile from './object-config/profile.json';

import './App.css'
import Related from './pages/Related';

function App() {
  return (
    
    <div className="App" style = {{height:"100vh"}}>
      <HashRouter>
        <Routes>
          <Route exact path={'/'} element={< LoginPage key={uuid()}/>}></Route>
          <Route path={'/home'} element={< Home key={uuid()}/>}></Route>

          <Route path={'/product'} element={< Product configurations={c_product} key={uuid()}/>}></Route>
          <Route path={'/product/view'} element={< ViewRecordPage configurations={c_product} key={uuid()}/>}></Route>

          <Route path={'/shop'} element={< Shop configurations={c_shop}/>}></Route>
          <Route path={'/shop/view'} element={< ViewRecordPage configurations={c_shop} key={uuid()}/>}></Route>
          <Route path={'/shop/:any/list/view'} element={< Related configurations={c_shop} key={uuid()}/>}></Route>

          <Route path={'/user'} element={< User configurations={c_user}  key={uuid()}/>}></Route>
          <Route path={'/user/view'} element={< ViewRecordPage configurations={c_user} key={uuid()}/>}></Route>

          <Route path={'/profile'} element={< Profile configurations={c_profile}  key={uuid()}/>}></Route>
          <Route path={'/profile/view'} element={< ViewRecordPage configurations={c_profile} key={uuid()}/>}></Route>
          <Route path={'/profile/:any/list/view'} element={< Related configurations={c_profile} key={uuid()}/>}></Route>

          
          <Route path={'/myprofile'} element={< MyProfile configurations={c_profile}  key={uuid()}/>}></Route>
        </Routes>
      </HashRouter>

      
    </div>
  );
}

export default App;
