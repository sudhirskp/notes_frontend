import { useState } from 'react';
import { Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate, formatTime } from '../utils/helpers';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      try {
        await onDelete(note.id);
      } catch (error) {
        // Error handling is done in parent component
      } finally {
        setIsDeleting(false);
      }
    }
  };


  return (
    <div className="card-hover group relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold font-display text-slate-800 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300">
            {note.title}
          </h3>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <button
              onClick={() => onEdit(note)}
              className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-100 rounded-xl transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md"
              title="Edit note"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2.5 text-slate-400 hover:text-danger-600 hover:bg-danger-100 rounded-xl transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md disabled:opacity-50"
              title="Delete note"
            >
              {isDeleting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-danger-600"></div>
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
          {note.content || 'No content'}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary-100 rounded-lg">
              <Calendar className="h-3 w-3 text-primary-600" />
            </div>
            <span className="font-medium">{formatDate(note.created_at)}</span>
          </div>
          {note.updated_at !== note.created_at && (
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-accent-100 rounded-lg">
                <Clock className="h-3 w-3 text-accent-600" />
              </div>
              <span className="font-medium">Updated {formatTime(note.updated_at)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
