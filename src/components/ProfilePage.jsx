import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { login } = useSelector((state) => state.loginData);
  return (
    <div className="container-fluid p-5">
      <h1 className="text-center mb-4">{login}</h1>
    </div>
  );
};

export default ProfilePage;
