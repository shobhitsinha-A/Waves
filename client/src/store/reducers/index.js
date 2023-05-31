import { combineReducers } from 'redux';
import users from './users.reducer';
import products from './products.reducer';
import notifications from './notification.reducer'
import brands from './brands.reducer';
import site from './site.reducer';
const appReducers = combineReducers({
    users,
    products,
    notifications,
    brands,
    site
});

export default appReducers;

//every reducer has key word here now we only have user
//search in users cannot find the id so it finds it in producst