import { useState } from 'react';
import { Sparkles, BookOpen, PenTool } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import BackendStatus from './BackendStatus';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-blue-50 to-secondary-50">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200/30 rounded-full blur-xl animate-pulse-soft"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-secondary-200/30 rounded-full blur-lg animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent-200/20 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-primary-300/20 rounded-full blur-xl animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 left-10 text-primary-300/40 floating">
        <BookOpen className="h-8 w-8" />
      </div>
      <div className="absolute top-32 right-16 text-secondary-300/40 floating" style={{ animationDelay: '1s' }}>
        <PenTool className="h-6 w-6" />
      </div>
      <div className="absolute bottom-40 left-16 text-accent-300/40 floating" style={{ animationDelay: '2s' }}>
        <Sparkles className="h-7 w-7" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-4 shadow-glow">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold font-display gradient-text mb-2 text-shadow">
              Notes App
            </h1>
            <p className="text-slate-600 text-lg">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </p>
          </div>

          {/* Backend Status */}
          <div className="mb-6">
            {/* <BackendStatus /> */}
          </div>

          {/* Auth Form */}
          <div className="card-hover animate-slide-up">
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 animate-fade-in">
            <p className="text-slate-500 text-sm">
              Built with ❤️ using React & TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
