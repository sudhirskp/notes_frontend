import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, Lock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    const result = await register(formData.username, formData.password);
    
    if (result.success) {
      toast.success('Registration successful!');
    } else {
      // Show different toast styles based on error type
      if (result.error.includes('Server error')) {
        toast.error(result.error, {
          duration: 6000,
          style: {
            background: '#FEF2F2',
            color: '#DC2626',
            border: '1px solid #FECACA',
          },
        });
      } else if (result.error.includes('Unable to connect')) {
        toast.error(result.error, {
          duration: 5000,
          style: {
            background: '#FEF3C7',
            color: '#D97706',
            border: '1px solid #FDE68A',
          },
        });
      } else if (result.error.includes('Username already exists')) {
        toast.error(result.error, {
          duration: 5000,
          style: {
            background: '#FEF3C7',
            color: '#D97706',
            border: '1px solid #FDE68A',
          },
        });
      } else {
        toast.error(result.error);
      }
    }
    
    setLoading(false);
  };

  const passwordRequirements = [
    { text: 'At least 6 characters', met: formData.password.length >= 6 },
    { text: 'Passwords match', met: formData.password === formData.confirmPassword && formData.confirmPassword.length > 0 },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display text-slate-800 mb-2">Create Account</h1>
        <p className="text-slate-600">Sign up to start taking notes</p>
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
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="input-field pl-12"
              placeholder="Choose a username"
            />
          </div>
          {formData.username.length > 0 && formData.username.length < 3 && (
            <p className="text-sm text-danger-600 mt-2 flex items-center">
              <span className="w-1 h-1 bg-danger-500 rounded-full mr-2"></span>
              Username must be at least 3 characters
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-3">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              className="input-field pl-12 pr-12"
              placeholder="Create a password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-slate-50 rounded-r-xl transition-colors duration-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-200" />
              ) : (
                <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-200" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-3">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field pl-12 pr-12"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-slate-50 rounded-r-xl transition-colors duration-200"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-200" />
              ) : (
                <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Password requirements */}
        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-2">Password Requirements:</p>
          {passwordRequirements.map((req, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle
                className={`h-4 w-4 transition-colors duration-200 ${
                  req.met ? 'text-success-500' : 'text-slate-300'
                }`}
              />
              <span
                className={`text-sm transition-colors duration-200 ${
                  req.met ? 'text-success-600 font-medium' : 'text-slate-500'
                }`}
              >
                {req.text}
              </span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center text-lg"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
