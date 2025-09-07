import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const NoteForm = ({ note, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
      });
    } else {
      setFormData({
        title: '',
        content: '',
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData.title, formData.content);
      setFormData({ title: '', content: '' });
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in" style={{display: isOpen ? 'flex' : 'none'}}>
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-large w-full max-w-2xl max-h-[90vh] overflow-auto border border-white/20 animate-slide-up">
        <div className="flex items-center justify-between p-8 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-slate-100/50 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-800">
              {note ? 'Edit Note' : 'Create New Note'}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {note ? 'Update your note content' : 'Add a new note to your collection'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-3">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="input-field text-lg"
                placeholder="Enter note title"
                maxLength={100}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-slate-500">
                  {formData.title.length}/100 characters
                </p>
                {formData.title.length > 80 && (
                  <p className="text-xs text-accent-600 font-medium">
                    {100 - formData.title.length} characters left
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-3">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                className="input-field resize-none text-base leading-relaxed"
                placeholder="Enter note content..."
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
            <div className="sticky bottom-0 left-0 right-0 bg-white/95 py-6 px-8 border-t border-slate-200 flex justify-between items-center z-20">
              <div className="text-xs text-slate-500">
                {!formData.title.trim() && (
                  <span className="text-accent-600 font-medium">
                    ⚠️ Title is required to save
                  </span>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary px-8 py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.title.trim()}
                  className={`btn-primary flex items-center space-x-3 px-8 py-3 text-lg ${
                    loading || !formData.title.trim() 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-xl hover:shadow-primary-200/50'
                  }`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>{note ? 'Update Note' : 'Create Note'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
