import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');
      
      await login({ email, password });
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '100px auto' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
      <p>
        Don't have an account? <a href="/sign-up">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
