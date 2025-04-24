import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Store/store';
import { ChangeEvent, FormEvent } from 'react';
import {
  CreatedUser,
  createUserThunk,
  loginUserThunk,
  registerUserThunk,
  setAuthForm,
  setFormValue,
  setLoginForm,
  setUpdateId,
  updateUserThunk,
} from '../Store/slice';

export const useFormData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entireData,
    status,
    error,
    singleUser,
    createdUsers,
    formValue,
    updateId,
    authUsers,
    authForm,
    loginUser,
    loginForm,
  } = useSelector((state: RootState) => state.user);
  //CreateUser

  const handleChangeCreateUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormValue({ [name]: value }));
  };

  const handleSubmitCreateUser = (e: FormEvent) => {
    e.preventDefault();
    const url = 'https://reqres.in/api/users';

    dispatch(createUserThunk(url));
  };

  const handleClickCreateUser = (user?: CreatedUser) => {
    if (user) {
      dispatch(setFormValue(user));
    }
  };

  //Login

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log('event fired');
    const { name, value } = e.target;
    dispatch(setLoginForm({ [name]: value }));
  };

  const handleSubmitLogin = (e: FormEvent) => {
    // console.log('event fired submit', authForm);
    e.preventDefault();
    const url = 'https://reqres.in/api/login';
    dispatch(loginUserThunk({ url }));
  };

  //Register

  const handleChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('event fired');
    const { name, value } = e.target;
    dispatch(setAuthForm({ [name]: value }));
  };

  const handleSubmitRegister = (e: FormEvent) => {
    console.log('event fired submit', authForm);
    e.preventDefault();
    const url = 'https://reqres.in/api/register';
    dispatch(registerUserThunk({ url }));
  };

  //Update

  const handleChangeUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormValue({ [name]: value }));
  };

  const handleSubmitUpdate = (e: FormEvent) => {
    e.preventDefault();
    console.log(updateId, 'updateId');
    const url = 'https://reqres.in/api/users/2';
    dispatch(updateUserThunk({ url }));
  };

  const handleClickUpdate = (user?: CreatedUser) => {
    if (user) {
      dispatch(setFormValue(user));
      const id = user.id;
      dispatch(setUpdateId(id as string));
    }
    // console.log(id);
  };

  return {
    entireData,
    status,
    error,
    singleUser,
    createdUsers,
    formValue,
    updateId,
    authUsers,
    authForm,
    loginUser,
    loginForm,
    handleChangeCreateUser,
    handleChangeLogin,
    handleChangeRegister,
    handleChangeUpdate,
    handleClickCreateUser,
    handleClickUpdate,
    handleSubmitCreateUser,
    handleSubmitLogin,
    handleSubmitRegister,
    handleSubmitUpdate,
  };
};
