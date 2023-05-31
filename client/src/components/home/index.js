import React from 'react';
import { useEffect } from 'react';
import Featured from './featured';
import SlimPromotion from 'utils/promotions/slim.block';
import Loader from 'utils/loader';

import { useDispatch, useSelector } from 'react-redux';
import { productsBySort } from 'store/actions/product.actions';
import CardBlock from 'utils/products/card.blocks';

// we dispatch things to do on the local store
// to get info we use useselector
const slimPromotion = {
    img:'/images/featured/featured_home_3.jpg',
    lineOne:'Up to 50% off',
    lineTwo:'On second hand guitar',
    linkTitle:'Show Now',
    linkTo:'/shop'
}
const Home = () => {
    //go to the place in store 
    const { bySold, byDate } = useSelector(state => state.products)
    //here products comes from redux wala thing that we want to see
    const dispatch = useDispatch();

    //on redux side of things we need to create action that will
    //that will flow into our reducer 
    useEffect(()=>{
        dispatch(productsBySort({
            limit:4,sortBy:'itemSold',order:'desc',where:'bySold'
        }));
        
        dispatch(productsBySort({
            limit:4,sortBy:'date',order:'desc',where:'byDate'
        }));
    },[dispatch])

    console.log(bySold);
    
    return(
        <div>
            <Featured/>
            { bySold ?
                <CardBlock
                    items={bySold}
                    title="Best selling guitars"
                />
            :<Loader/>}
            <SlimPromotion items={slimPromotion}/>
            { byDate ?
                <CardBlock
                    items={byDate}
                    title="Latests guitars on the shop"
                />
            :<Loader/>}

        </div>
    )

}

export default Home;