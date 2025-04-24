import FormComponent from '../Components/FormComponent';
import { useFormData } from '../Hooks/useFormData';

const UpdateUser = () => {
  const {
    status,
    error,
    formValue,
    createdUsers,
    handleClickUpdate,
    handleChangeUpdate,
    handleSubmitUpdate,
  } = useFormData();

  if (status === 'loading') {
    return <div>Loading all Data...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading Data: {error}</div>;
  }

  return (
    <FormComponent
      handleChange={handleChangeUpdate}
      handleClick={handleClickUpdate}
      handleSubmit={handleSubmitUpdate}
      formValue={formValue}
      createdUsers={createdUsers}
    />
  );
};

export default UpdateUser;

{
  /* <div>
      <form onSubmit={handleSubmitUpdate}>
        <h1>Update User</h1>
        <label htmlFor='name'>Name: </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formValue.name}
          onChange={handleChangeUpdate}
        />
        <label htmlFor='job'>Job: </label>
        <input
          type='text'
          id='job'
          name='job'
          value={formValue.job}
          onChange={handleChangeUpdate}
        />
        <button type='submit'>Save</button>
      </form>
      {createdUsers.length >= 1 &&
        createdUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => handleClickUpdate(user)}
            style={{ border: '1px solid black', width: 'max-content' }}
          >
            <b>UserCreated: </b>
            <p>Id: {user.id}</p>
            <p>UserName: {user.name}</p>
            <p>Job: {user.job}</p>
            <p>Created At: {user.createdAt}</p>
            {user.updatedAt && <p>Updated At: {user.updatedAt}</p>}
          </div>
        ))}
    </div> */
}
