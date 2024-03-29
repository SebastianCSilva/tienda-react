import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/Home';
import Error404 from './containers/errors/Error404';

import Signup from './containers/auth/Signup';
import Login from './containers/auth/Login';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';

import Shop from './containers/Shop';
import ProductDetail from './containers/pages/productDetail';

import Search from './containers/pages/Search';
import Cart from './containers/pages/Cart';
import Checkout from './containers/pages/Checkout';
import PrivateRoute from './hocs/PrivateRoute';
import ThankYou from './containers/pages/ThankYou';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404/>}/>

          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <PrivateRoute path="/checkout" element={<Checkout/>}/>

          {/* Authentication */}
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/activate/:uid/:token" element={<Activate/>}/>
          <Route exact path='/reset_password' element={<ResetPassword/>}/>
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />

          {/* shop */}
          <Route path="/shop" element={<Shop/>}/>
          {/* shop */}
          <Route exact path="/product/:productId" element={<ProductDetail/>}/>
          <Route exact path="/search" element={<Search/>}/>
          <Route exact path="/thankyou" element={<ThankYou/>}/>

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
