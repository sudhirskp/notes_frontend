// import { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { Eye, EyeOff, User, Lock, RefreshCw } from 'lucide-react';
// import toast from 'react-hot-toast';
// import ErrorAlert from './ErrorAlert';

// const LoginForm = ({ onSwitchToRegister }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const result = await login(formData.username, formData.password);
    
//     if (result.success) {
//       toast.success('Login successful!');
//     } else {
//       setError(result.error);
//       toast.error(result.error);
//     }
    
//     setLoading(false);
//   };

//   const handleRetry = () => {
//     setError(null);
//     handleSubmit({ preventDefault: () => {} });
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold font-display text-slate-800 mb-2">Welcome Back</h1>
//         <p className="text-slate-600">Sign in to your account to continue</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {error && (
//           <ErrorAlert 
//             error={error} 
//             onRetry={handleRetry}
//             onDismiss={() => setError(null)}
//           />
//         )}
        
//         <div>
//           <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-3">
//             Username
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//               <User className="h-5 w-5 text-slate-400" />
//             </div>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               required
//               value={formData.username}
//               onChange={handleChange}
//               className="input-field pl-12"
//               placeholder="Enter your username"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-3">
//             Password
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-slate-400" />
//             </div>
//             <input
//               id="password"
//               name="password"
//               type={showPassword ? 'text' : 'password'}
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="input-field pl-12 pr-12"
//               placeholder="Enter your password"
//             />
//             <button
//               type="button"
//               className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-slate-50 rounded-r-xl transition-colors duration-200"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-200" />
//               ) : (
//                 <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-200" />
//               )}
//             </button>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="btn-primary w-full flex items-center justify-center text-lg"
//         >
//           {loading ? (
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//           ) : (
//             'Sign In'
//           )}
//         </button>
//       </form>

//       <div className="mt-8 text-center">
//         <p className="text-slate-600">
//           Don't have an account?{' '}
//           <button
//             onClick={onSwitchToRegister}
//             className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 hover:underline"
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, Lock, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import ErrorAlert from './ErrorAlert';

const LoginForm = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
    } else {
      setError(result.error);
      toast.error(result.error);
    }
    
    setLoading(false);
  };

  const handleRetry = () => {
    setError(null);
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display text-slate-800 mb-2">Welcome Back</h1>
        <p className="text-slate-600">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <ErrorAlert 
            error={error} 
            onRetry={handleRetry}
            onDismiss={() => setError(null)}
          />
        )}
        
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
              placeholder="Enter your username"
            />
          </div>
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
              placeholder="Enter your password"
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

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center text-lg"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
      <div className="mt-4 text-center">
        <a
          href="/forgot-password" // Replace with your actual route
          className="text-sm text-slate-600 hover:text-primary-700 transition-colors duration-200 hover:underline"
        >
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;