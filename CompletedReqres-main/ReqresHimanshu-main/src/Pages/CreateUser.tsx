import FormComponent from '../Components/FormComponent';
import { useFormData } from '../Hooks/useFormData';

const CreateUser = () => {
  const {
    handleSubmitCreateUser,
    handleChangeCreateUser,
    handleClickCreateUser,
    formValue,
    createdUsers,
  } = useFormData();
  return (
    <FormComponent
      handleSubmit={handleSubmitCreateUser}
      handleChange={handleChangeCreateUser}
      handleClick={handleClickCreateUser}
      formValue={formValue}
      createdUsers={createdUsers}
    />
  );
};

export default CreateUser;

// return (
//   <>
//     <form onSubmit={handleSubmitCreateUser}>
//       <h1>Create User</h1>
//       <label htmlFor='name'>Name: </label>
//       <input
//         type='text'
//         id='name'
//         name='name'
//         value={formValue.name}
//         onChange={handleChangeCreateUser}
//       />
//       <label htmlFor='job'>Job: </label>
//       <input
//         type='text'
//         id='job'
//         name='job'
//         value={formValue.job}
//         onChange={handleChangeCreateUser}
//       />
//       <button type='submit'>Save</button>
//     </form>
//     {createdUsers.length >= 1 &&
//       createdUsers.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => handleClickCreateUser(user)}
//           style={{ border: '1px solid black', width: 'max-content' }}
//         >
//           <p>UserCreated: </p>
//           <p>Id: {user.id}</p>
//           <p>UserName: {user.name}</p>
//           <p>Job: {user.job}</p>
//           <p>Created At: {user.createdAt}</p>
//         </div>
//       ))}
//   </>
// );
