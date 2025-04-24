import FormComponent from '../Components/FormComponent';
import { useFormData } from '../Hooks/useFormData';

const Login = () => {
  const {
    status,
    error,
    handleSubmitLogin,
    handleChangeLogin,
    loginForm,
    loginUser,
  } = useFormData();

  if (status === 'loading') {
    return <div>Loading all Data...</div>;
  }

  if (status === 'failed') {
    return <div>User Register Failed: {error}</div>;
  }

  return (
    <FormComponent
      handleChange={handleChangeLogin}
      handleSubmit={handleSubmitLogin}
      loginForm={loginForm}
      loginUser={loginUser}
    />
  );
};

export default Login;

// return (
//   <>
//     <form onSubmit={handleSubmitLogin}>
//       <h1>Login </h1>
//       <label htmlFor='email'>Email: </label>
//       <input
//         type='text'
//         id='email'
//         name='email'
//         onChange={handleChangeLogin}
//         value={loginForm.email}
//       />
//       <label htmlFor='password'>Password: </label>
//       <input
//         type='text'
//         id='password'
//         name='password'
//         onChange={handleChangeLogin}
//         value={loginForm.password}
//       />
//       <button type='submit'>Save</button>
//     </form>
//     {loginUser && Object.keys(loginUser).length >= 1 && (
//       <div>
//         <p>Email: {loginUser.email}</p>
//         <p>Password: {loginUser.password}</p>
//         <p>Token: {loginUser.token}</p>
//       </div>
//     )}
//   </>
// );
