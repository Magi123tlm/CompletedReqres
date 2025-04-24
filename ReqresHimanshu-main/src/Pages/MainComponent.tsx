import { CustomButton } from '@/Components/CustomButton';
import { ModeToggle } from '@/Components/mode-toggle';
import { Outlet, useNavigate } from 'react-router-dom';

const MainComponent = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <div className='m-3 p-3 flex gap-5'>
        <CustomButton
          variant={'outline'}
          onClick={() => handleClick('/listUsers')}
          className='rounded-xs cursor-pointer'
        >
          List Users
        </CustomButton>
        <CustomButton
          variant={'outline'}
          onClick={() => handleClick('/singleUser')}
          className='rounded-xs cursor-pointer'
        >
          Single User
        </CustomButton>
        <CustomButton
          variant={'outline'}
          onClick={() => handleClick('/createUser')}
          className='rounded-xs cursor-pointer'
        >
          Create User
        </CustomButton>
        <CustomButton
          variant={'outline'}
          onClick={() => handleClick('/updateUser')}
          className='rounded-xs cursor-pointer'
        >
          UpdateUser
        </CustomButton>
        <CustomButton
          variant={'outline'}
          onClick={() => handleClick('/register')}
          className='rounded-xs cursor-pointer'
        >
          Register
        </CustomButton>
        <CustomButton
          variant={'outline'}
          className='rounded-xs cursor-pointer'
          onClick={() => handleClick('/login')}
        >
          Login
        </CustomButton>
        <ModeToggle />
      </div>
      <Outlet />
    </>
  );
};

export default MainComponent;
