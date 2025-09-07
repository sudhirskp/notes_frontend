import { AlertCircle, Wifi, Server, UserX } from 'lucide-react';

const ErrorAlert = ({ error, onRetry, onDismiss }) => {
  const getErrorIcon = (error) => {
    if (error.includes('Server error')) return <Server className="h-5 w-5" />;
    if (error.includes('Unable to connect')) return <Wifi className="h-5 w-5" />;
    if (error.includes('Username already exists') || error.includes('Invalid')) return <UserX className="h-5 w-5" />;
    return <AlertCircle className="h-5 w-5" />;
  };

  const getErrorType = (error) => {
    if (error.includes('Server error')) return 'server';
    if (error.includes('Unable to connect')) return 'network';
    if (error.includes('Username already exists')) return 'validation';
    return 'general';
  };

  const errorType = getErrorType(error);

  const getErrorStyles = (type) => {
    switch (type) {
      case 'server':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'network':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'validation':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`rounded-xl border p-4 ${getErrorStyles(errorType)} animate-slide-up`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getErrorIcon(error)}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-1">
            {errorType === 'server' && 'Server Error'}
            {errorType === 'network' && 'Connection Error'}
            {errorType === 'validation' && 'Validation Error'}
            {errorType === 'general' && 'Error'}
          </h3>
          <p className="text-sm">{error}</p>
          {errorType === 'server' && (
            <p className="text-xs mt-2 opacity-75">
              This is a temporary issue. Please try again in a few moments.
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-xs font-medium hover:underline"
            >
              Retry
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-xs font-medium hover:underline"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
