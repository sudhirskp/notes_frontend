import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, Server, Database, Wifi } from 'lucide-react';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [details, setDetails] = useState(null);

  const checkBackendStatus = async () => {
    setStatus('checking');
    try {
      // Try to reach the backend root
      const response = await fetch('http://localhost:8080', {
        method: 'GET',
        mode: 'cors',
      });
      
      if (response.ok) {
        setStatus('connected');
        setDetails({
          status: response.status,
          statusText: response.statusText,
          message: 'Backend is running and accessible'
        });
      } else {
        setStatus('error');
        setDetails({
          status: response.status,
          statusText: response.statusText,
          message: 'Backend responded but with an error'
        });
      }
    } catch (error) {
      setStatus('error');
      setDetails({
        error: error.message,
        message: 'Cannot connect to backend server'
      });
    }
  };

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Server className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'checking':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'connected':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`rounded-xl border p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="text-sm font-semibold">
              Backend Status: {status === 'checking' ? 'Checking...' : status === 'connected' ? 'Connected' : 'Error'}
            </h3>
            <p className="text-xs opacity-75">
              {status === 'checking' && 'Testing connection to Spring Boot server...'}
              {status === 'connected' && 'Spring Boot server is running properly'}
              {status === 'error' && 'Cannot connect to Spring Boot server'}
            </p>
          </div>
        </div>
        <button
          onClick={checkBackendStatus}
          className="text-xs font-medium hover:underline flex items-center space-x-1"
        >
          <Wifi className="h-3 w-3" />
          <span>Retry</span>
        </button>
      </div>
      
      {details && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="opacity-75">Status:</span>
              <span className="font-mono">{details.status || 'N/A'}</span>
            </div>
            {details.statusText && (
              <div className="flex justify-between">
                <span className="opacity-75">Status Text:</span>
                <span className="font-mono">{details.statusText}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="opacity-75">Message:</span>
              <span className="font-mono text-right">{details.message}</span>
            </div>
            {details.error && (
              <div className="flex justify-between">
                <span className="opacity-75">Error:</span>
                <span className="font-mono text-right">{details.error}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <div className="text-xs space-y-2">
            <p className="font-semibold">Troubleshooting Steps:</p>
            <ul className="space-y-1 text-xs opacity-75">
              <li>• Make sure Spring Boot server is running on port 8080</li>
              <li>• Check if MySQL database is running</li>
              <li>• Verify application.properties configuration</li>
              <li>• Check Spring Boot console for error messages</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackendStatus;
