import { ChangeEvent, FormEvent } from 'react';
import { AuthUser, CreatedUser, FormValue } from '../Store/slice';

type FormComponentProp = {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: (user?: CreatedUser) => void;
  formValue?: FormValue;
  createdUsers?: CreatedUser[];
  authForm?: Omit<AuthUser, 'token' | 'id'>;
  authUsers?: AuthUser[] | [];
  loginUser?: AuthUser | null;
  loginForm?: Omit<AuthUser, 'token' | 'id'>;
};

const FormComponent = ({
  handleSubmit,
  handleChange,
  handleClick,
  formValue,
  createdUsers,
  loginForm,
  loginUser,
  authForm,
  authUsers,
}: FormComponentProp) => {
  return (
    <>
      {formValue && (
        <form onSubmit={handleSubmit}>
          <h1>Create User</h1>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formValue.name}
            onChange={handleChange}
          />
          <label htmlFor='job'>Job: </label>
          <input
            type='text'
            id='job'
            name='job'
            value={formValue.job}
            onChange={handleChange}
          />
          <button type='submit'>Save</button>
        </form>
      )}

      {loginForm && (
        <form onSubmit={handleSubmit}>
          <h1>Login </h1>
          <label htmlFor='email'>Email: </label>
          <input
            type='text'
            id='email'
            name='email'
            onChange={handleChange}
            value={loginForm.email}
          />
          <label htmlFor='password'>Password: </label>
          <input
            type='text'
            id='password'
            name='password'
            onChange={handleChange}
            value={loginForm.password}
          />
          <button type='submit'>Save</button>
        </form>
      )}
      {authForm && (
        <form onSubmit={handleSubmit}>
          <h1>Register </h1>
          <label htmlFor='email'>Email: </label>
          <input
            type='text'
            id='email'
            name='email'
            onChange={handleChange}
            value={authForm.email}
          />
          <label htmlFor='password'>Password: </label>
          <input
            type='text'
            id='password'
            name='password'
            onChange={handleChange}
            value={authForm.password}
          />
          <button type='submit'>Save</button>
        </form>
      )}
      {createdUsers &&
        createdUsers.length >= 1 &&
        createdUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => handleClick?.(user)}
            style={{ border: '1px solid black', width: 'max-content' }}
          >
            <p>UserCreated: </p>
            <p>Id: {user.id}</p>
            <p>UserName: {user.name}</p>
            <p>Job: {user.job}</p>
            <p>Created At: {user.createdAt}</p>
            {user.updatedAt && <p>Updated At: {user.updatedAt}</p>}
          </div>
        ))}
      {loginUser && Object.keys(loginUser).length >= 1 && (
        <div>
          <p>Email: {loginUser.email}</p>
          <p>Password: {loginUser.password}</p>
          <p>Token: {loginUser.token}</p>
        </div>
      )}
      {authUsers &&
        authUsers.length >= 1 &&
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
    </>
  );
};

export default FormComponent;
