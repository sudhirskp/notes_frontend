import { useState } from 'react';
import { User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Username is required.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setLoading(false);
      return;
    }

    // Simulate an API call (replace with your actual API endpoint)
    try {
      //const response = await fetch('/api/reset-password', { // Replace with your API endpoint
      //  method: 'POST',
      //  headers: {
      //    'Content-Type': 'application/json',
      //  },
      //  body: JSON.stringify({ username, password }),
      //});

      //if (response.ok) {
      //  const data = await response.json();
      //  setMessage(data.message || 'Password reset successfully.');
      //  toast.success(data.message || 'Password reset successfully.');
      //} else {
      //  setUsernameError(errorData.usernameError || ''); // Set username error from backend
      //  setPasswordError(errorData.passwordError || errorData.message || 'Failed to reset password.'); // Set password error from backend
      //  toast.error(errorData.message || 'Failed to reset password.');
      //}
      setMessage('Password reset successfully.');
      toast.success('Password reset successfully.');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display text-slate-800 mb-2">Reset Password</h1>
        <p className="text-slate-600">Enter your username and new password to reset it.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-3">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="username"
              type="text"
              className="input-field pl-12"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-3">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="password"
              type="password"
              className="input-field pl-12"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-3">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              className="input-field pl-12"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center text-lg"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>

      {message && (
        <div className="mt-6 text-center">
          <p className="text-slate-600">{message}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;