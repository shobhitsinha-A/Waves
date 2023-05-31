import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'utils/loader';

const AuthGuard = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.auth) {
      navigate('/');
    } else {
      setIsAuth(true);
    }
  }, [navigate, users]);

  if (!isAuth) {
    return <Loader full={true} />;
  } else {
    return <props.component users={users} {...props} />;
  }
};

export default AuthGuard;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Loader from 'utils/loader';

// export default function authGuard(ComposedComponent) {
//   const AuthenticationCheck = (props) => {
//     const [isAuth, setIsAuth] = useState(false);
//     const users = useSelector((state) => state.users);
//     const navigate = useNavigate();
//     useEffect(() => {
//       if (!users.auth) {
//         navigate('/');
//       } else {
//         setIsAuth(true);
//       }
//     }, [navigate, users]);

//     if (!isAuth) {
//       return <Loader full={true} />;
//     } else {
//       return <ComposedComponent users={users} {...props} />;
//     }
//   };

//   return AuthenticationCheck;
// }

// // import React,{ useState, useEffect} from 'react';
// // import { useSelector } from 'react-redux'
// // import Loader from 'utils/loader';


// // export default function authGuard(ComposedComponent){
// //     const AuthenticationCheck = (props) => {
// //         const [isAuth,setIsAuth] = useState(false);
// //         const users  = useSelector( state => state.users );


// //         useEffect(()=>{
// //             if(!users.auth){
// //                 props.history.push('/')
// //             }else{
// //                 setIsAuth(true);
// //             }
// //         },[props,users]);


// //         if(!isAuth){
// //             return(
// //                 <Loader full={true}/>
// //             )
// //         } else {
// //             return(
// //                 <ComposedComponent users={users} {...props}/>
// //             )
// //         }




// //     }
// //     return AuthenticationCheck;
// // }