const express = require('express');
const authRoute = require('./auth.route');
const usersRoute = require('./users.route');
const brandsRoute = require('./brand.route')
const router = express.Router();
const productsRoute = require('./product.route');
const siteRoute = require('./site.route')

const routesIndex = [
    {
        path:'/auth',
        route: authRoute
    },
    {
        path:'/users',
        route: usersRoute 
    },
    {
        path:'/brands',
        route: brandsRoute
    },
    {
        path:'/products',
        route: productsRoute
    },
    {
        path:'/site',
        route: siteRoute
    },
]

routesIndex.forEach((route)=>{
    router.use(route.path,route.route) ;
});
// router.use('/auth', ()=>{
// })
//localhost:3001/api/auth
module.exports = router;
