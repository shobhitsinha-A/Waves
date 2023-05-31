import React, {useState, useEffect} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './hoc/mainLayout'
import Loader from 'utils/loader';

import Header from './components/navigation/header';
import Footer from './components/navigation/footer';
import Home from './components/home/index';
import RegisterLogin from './components/auth';
import AuthGuard from './hoc/authGuard'
import AdminProducts from 'components/dashboard/admin/products';
import AddProduct from 'components/dashboard/admin/products/addedit/add';
import EditProduct from'components/dashboard/admin/products/addedit/edit';
import Shop from 'components/shop';
import ProductDetail from 'components/product';
import UserCart from 'components/dashboard/user/cart';
import ManageSite from 'components/dashboard/admin/site';

import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth,userSignOut } from 'store/actions/user.actions';

import Dashboard from './components/dashboard'
import UserInfo from 'components/dashboard/user/info';

const Routez = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();


  const signOutUser = () => {
    dispatch(userSignOut())
  }
  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])


  useEffect(()=>{
    if(users.auth !== null){
      setLoading(false)
    }
  },[users])


  return (
    <BrowserRouter>
    {
      loading ?
      <Loader full={true}/>
      :
      <>
      <Header
        users={users}
        signOutUser={signOutUser}
      />
        <MainLayout>
          <Routes>
          <Route path='/dashboard/admin/edit_product/:id' element = {<AuthGuard component={EditProduct} />}/>
          <Route path='/dashboard/admin/add_products' element = {<AuthGuard component={AddProduct} />}/>
          <Route path='/dashboard/admin/admin_products' element = {<AuthGuard component={AdminProducts} />}/>
          <Route path='/dashboard/admin/manage_site' element = {<AuthGuard component={ManageSite} />}/>
          <Route path='/dashboard/user/user_info' element = {<AuthGuard component={UserInfo} />}/>
          <Route path='/dashboard/user/user_cart' element = {<AuthGuard component={UserCart} />}/>
          <Route path='/dashboard' element = {<AuthGuard component={Dashboard} />}/>
           
          <Route path='/product_detail/:id' element = {<ProductDetail/>}/>
            <Route path='/sign_in' element = {<RegisterLogin/>}/>
            <Route path='/shop' element = {<Shop/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </MainLayout>
        <Footer/>
      </>
    }
        
    </BrowserRouter>
  );
}

export default Routez;
