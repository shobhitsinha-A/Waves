import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PreventSignInRoute = (props) => {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (users.auth) {
      navigate('/dashboard');
    }
  }, [navigate, users.auth]);

  return props.children;
};

export default PreventSignInRoute;