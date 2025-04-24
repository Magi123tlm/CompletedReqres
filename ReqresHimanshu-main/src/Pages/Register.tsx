
import FormComponent from '../Components/FormComponent';
import { useFormData } from '../Hooks/useFormData';

const Register = () => {
  const {
    status,
    error,
    handleChangeRegister,
    handleSubmitRegister,
    authForm,
    authUsers,
  } = useFormData();

  if (status === 'loading') {
    return <div>Loading all Data...</div>;
  }

  if (status === 'failed') {
    return <div>User Register Failed: {error}</div>;
  }

  return (
    <FormComponent
      handleChange={handleChangeRegister}
      handleSubmit={handleSubmitRegister}
      authForm={authForm}
      authUsers={authUsers}
    />
  );
};

export default Register;

{
  /* <>
      <form onSubmit={handleSubmitRegister}>
        <h1>Register </h1>
        <label htmlFor='email'>Email: </label>
        <input
          type='text'
          id='email'
          name='email'
          onChange={handleChangeRegister}
          value={authForm.email}
        />
        <label htmlFor='password'>Password: </label>
        <input
          type='text'
          id='password'
          name='password'
          onChange={handleChangeRegister}
          value={authForm.password}
        />
        <button type='submit'>Save</button>
      </form>
      {authUsers.length >= 1 &&
        authUsers.map((user) => (
          <div
            key={user.id}
            style={{ border: '1px solid black', width: 'max-content' }}
          >
            <p>UserCreated: </p>
            <p>Id: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Token: {user.token}</p>
          </div>
        ))}
    </> */
}
