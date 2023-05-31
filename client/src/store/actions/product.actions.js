import * as actions  from './index'
import axios from 'axios';

import { getAuthHeader} from '../../utils/tools';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const productsBySort = ({limit,sortBy,order,where}) => {
    return async(dispatch)=>{
        try{
            const products = await axios.get(`/api/products/all`,{
               //we do this because axios we pass params or else it goes as js object
                params:{
                    limit,
                    sortBy,
                    order
                }
            });
            //we need to manually call the dispatch 
            //eg: dispatch ({
                //type:'',
                //payload:''
            //})
            //but we dont do it because we keep adding the block then 
            // it will get bigger and bigger 
            //dispatch(actions.productsBySold(products.data))
            //sends data to reducer //this dispatch of redux thunk sends data to reducser 

            //dispatch sends data to al the reducers does nit matter 
            //what it is user or products
            switch(where){
                case 'bySold':
                    dispatch(actions.productsBySold(products.data));
                break;
                case 'byDate':
                    dispatch(actions.productsByDate(products.data));
                break;
                default:
                    return false
            }
        }
         catch(error){
            
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productsByPaginate = (args) => {
    return async(dispatch)=>{
        try{
            const products = await axios.post(`/api/products/paginate/all`,args)
            dispatch(actions.productsByPaginate(products.data));
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productRemove = (id) => {
    return async(dispatch)=>{
        try{
            await axios.delete(`/api/products/product/${id}`,getAuthHeader())
            dispatch(actions.productRemove())
            dispatch(actions.successGlobal());
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productAdd = (data) => {
    return async(dispatch)=>{
        try{
            const product= await axios.post(`/api/products/`,data,getAuthHeader())

            dispatch(actions.productAdd(product.data))
            dispatch(actions.successGlobal());
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productsById= (id) => {
    return async(dispatch)=>{
        try{
            const product =await axios.get(`/api/products/product/${id}`);
            dispatch(actions.productsById(product.data));
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productEdit = (values, id) => {
    return async(dispatch)=>{
        try{
            await axios.patch(`/api/products/product/${id}`,values,getAuthHeader());
            
            dispatch(actions.successGlobal('Update done !!'));
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}