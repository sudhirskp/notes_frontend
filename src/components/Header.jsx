import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, BookOpen, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-soft border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-glow">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display gradient-text">Notes App</h1>
              <p className="text-sm text-slate-500">Your personal note-taking space</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">{user?.username}</p>
                <p className="text-xs text-slate-500">Welcome back!</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-danger-600 hover:bg-danger-50 rounded-xl transition-all duration-300 group"
              title="Logout"
            >
              <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
