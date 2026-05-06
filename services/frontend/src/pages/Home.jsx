import { useAuth } from '../context/auth';

const Home = () => {
  const { auth } = useAuth();

  return (
    <div style={{ padding: '40px' }}>
      <h1>Welcome to Dashboard</h1>
      {auth && (
        <div>
          <p>Logged in as: {auth.user.email}</p>
          <p>User ID: {auth.user.id}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
