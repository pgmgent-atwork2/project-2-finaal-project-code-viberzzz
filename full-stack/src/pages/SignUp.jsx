import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');
      const name = formData.get('name');
      
      // TODO: Implement sign up with backend API
      // await signup({ email, password, name });
      navigate('/sign-in');
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('Sign up failed. Please try again.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '100px auto' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <a href="/sign-in">Sign In</a>
      </p>
    </div>
  );
};

export default SignUp;
