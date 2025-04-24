import { useEffect } from 'react';
import { useFormData } from '../Hooks/useFormData';
import { fetchSingleUser } from '../Store/slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/store';

const SingleUser = () => {
  const { status, error, singleUser } = useFormData();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchSingleUser('https://reqres.in/api/users/2'));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading user data...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading user: {error}</div>;
  }

  return (
    <>
      {singleUser && (
        <div>
          <p>{singleUser.id}</p>
          <p>{singleUser.email}</p>
          <p>{singleUser.first_name}</p>
          <p>{singleUser.last_name}</p>
          <img key={singleUser.avatar} src={singleUser.avatar} />
        </div>
      )}
    </>
  );
};

export default SingleUser;
