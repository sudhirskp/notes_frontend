// import { useState } from 'react';
// import { Plus, Search, FileText } from 'lucide-react';
// import NoteCard from './NoteCard';
// import NoteForm from './NoteForm';
// import LoadingSpinner from './LoadingSpinner';
// import { useNotes } from '../hooks/useNotes';
// import { useDebounce } from '../hooks/useDebounce';
// import { SEARCH } from '../constants';

// const NotesList = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingNote, setEditingNote] = useState(null);
//   const [selectedNotes, setSelectedNotes] = useState([]);
  
//   const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
//   const debouncedSearchTerm = useDebounce(searchTerm, SEARCH.DEBOUNCE_DELAY);

//   const handleCreateNote = () => {
//     setEditingNote(null);
//     setIsFormOpen(true);
//   };

//   const handleEditNote = (note) => {
//     setEditingNote(note);
//     setIsFormOpen(true);
//   };

//   const handleSaveNote = async (title, content) => {
//     try {
//       if (editingNote) {
//         await updateNote(editingNote.id, title, content);
//         toast.success('Note updated successfully');
//       } else {
//         await createNote(title, content);
//         toast.success('Note created successfully');
//       }
//     } catch (error) {
//       // Error handling is done in the hook
//       throw error;
//     } finally {
//       setIsFormOpen(false);
//       setEditingNote(null);
//     }
//   };

//   const handleDeleteNote = async (noteId) => {
//     try {
//       await deleteNote(noteId);
//       toast.success('Note deleted successfully');
//     } catch (error) {
//       // Error handling is done in the hook
//       throw error;
//     }
//   };

//   const handleSelectNote = (noteId) => {
//     setSelectedNotes((prev) =>
//       prev.includes(noteId)
//         ? prev.filter((id) => id !== noteId)
//         : [...prev, noteId]
//     );
//   };

//   const handleDeleteSelected = async () => {
//     if (selectedNotes.length === 0) return;
//     if (!window.confirm(`Delete ${selectedNotes.length} selected notes?`)) return;
//     for (const noteId of selectedNotes) {
//       await handleDeleteNote(noteId);
//     }
//     setSelectedNotes([]);
//     toast.success('Selected notes deleted');
//   };

//   const handleCancelForm = () => {
//     setIsFormOpen(false);
//     setEditingNote(null);
//   };

//   const filteredNotes = notes.filter(note =>
//     note.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
//     note.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <LoadingSpinner size="lg" text="Loading notes..." />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {selectedNotes.length > 0 && (
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={handleDeleteSelected}
//             className="btn-danger px-6 py-3 text-lg rounded-xl shadow-glow"
//           >
//             Delete Selected ({selectedNotes.length})
//           </button>
//         </div>
//       )}
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-6 sm:space-y-0">
//         <div className="space-y-2">
//           <h1 className="text-4xl font-bold font-display gradient-text">My Notes</h1>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
//               <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
//               <span className="text-sm font-semibold text-slate-700">
//                 {notes.length} {notes.length === 1 ? 'note' : 'notes'} total
//               </span>
//             </div>
//             {filteredNotes.length !== notes.length && (
//               <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full">
//                 <Search className="h-3 w-3 text-accent-600" />
//                 <span className="text-sm font-semibold text-accent-700">
//                   {filteredNotes.length} filtered
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//         <button
//           onClick={handleCreateNote}
//           className="btn-primary flex items-center space-x-3 text-lg px-8 py-4 shadow-glow hover:shadow-glow-purple"
//         >
//           <Plus className="h-6 w-6" />
//           <span>New Note</span>
//         </button>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-2xl">
//         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//           <Search className="h-5 w-5 text-slate-400" />
//         </div>
//         <input
//           type="text"
//           placeholder="Search through your notes..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="input-field pl-12 text-lg"
//         />
//         {searchTerm && (
//           <button
//             onClick={() => setSearchTerm('')}
//             className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200"
//           >
//             <span className="text-xl">×</span>
//           </button>
//         )}
//       </div>

//       {/* Notes Grid */}
//       {filteredNotes.length === 0 ? (
//         <div className="text-center py-20">
//           <div className="relative">
//             <div className="w-24 h-24 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
//               <FileText className="h-12 w-12 text-primary-500" />
//             </div>
//             <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full animate-pulse"></div>
//           </div>
//           <h3 className="text-2xl font-bold font-display text-slate-800 mb-3">
//             {debouncedSearchTerm ? 'No notes found' : 'No notes yet'}
//           </h3>
//           <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
//             {debouncedSearchTerm 
//               ? 'Try adjusting your search terms or create a new note'
//               : 'Get started by creating your first note and organize your thoughts'
//             }
//           </p>
//           {!debouncedSearchTerm && (
//             <button
//               onClick={handleCreateNote}
//               className="btn-primary flex items-center space-x-3 mx-auto text-lg px-8 py-4 shadow-glow"
//             >
//               <Plus className="h-6 w-6" />
//               <span>Create Your First Note</span>
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredNotes.map((note, index) => (
//             <div 
//               key={note.id} 
//               className="animate-fade-in flex items-center"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedNotes.includes(note.id)}
//                 onChange={() => handleSelectNote(note.id)}
//                 className="mr-4 scale-125 accent-primary-500"
//                 title="Select note"
//               />
//               <NoteCard
//                 note={note}
//                 onEdit={handleEditNote}
//                 onDelete={handleDeleteNote}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Note Form Modal */}
//       <NoteForm
//         note={editingNote}
//         onSave={handleSaveNote}
//         onCancel={handleCancelForm}
//         isOpen={isFormOpen}
//       />
//     </div>
//   );
// };

// export default NotesList;


import { useState } from 'react';
import { Plus, Search, FileText } from 'lucide-react';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import LoadingSpinner from './LoadingSpinner';
import { useNotes } from '../hooks/useNotes';
import { useDebounce } from '../hooks/useDebounce';
import { SEARCH } from '../constants';
import toast from 'react-hot-toast'; // Import toast

const NotesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false); // New state for selection mode
  
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH.DEBOUNCE_DELAY);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleSaveNote = async (title, content) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, title, content);
        toast.success('Note updated successfully');
      } else {
        await createNote(title, content);
        toast.success('Note created successfully');
      }
    } catch (error) {
      // Error handling is done in the hook
      throw error;
    } finally {
      setIsFormOpen(false);
      setEditingNote(null);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      toast.success('Note deleted successfully');
    } catch (error) {
      // Error handling is done in the hook
      throw error;
    }
  };

  const handleSelectNote = (noteId) => {
    setSelectedNotes((prev) =>
      prev.includes(noteId)
        ? prev.filter((id) => id !== noteId)
        : [...prev, noteId]
    );
  };

  const handleDeleteSelected = async () => {
  if (selectedNotes.length === 0) return;
  if (!window.confirm(`Delete ${selectedNotes.length} selected notes?`)) return;

  try {
    for (const noteId of selectedNotes) {
      await deleteNote(noteId);
    }
    setSelectedNotes([]);
    setSelectionMode(false); // Disable selection mode after deleting
    toast.success('Selected notes deleted successfully'); // Show toast after all deletions
  } catch (error) {
      console.error("Error deleting note:", error);
      toast.error('Failed to delete selected notes'); // Show error toast
  }
};

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleToggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedNotes([]); // Clear selections when toggling mode
  };

  const handleSelectAll = () => {
    if (selectedNotes.length === filteredNotes.length) {
      // Deselect all
      setSelectedNotes([]);
    } else {
      // Select all
      setSelectedNotes(filteredNotes.map((note) => note.id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading notes..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {selectedNotes.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDeleteSelected}
            className="btn-danger px-6 py-3 text-lg rounded-xl shadow-glow"
          >
            Delete Selected ({selectedNotes.length})
          </button>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-6 sm:space-y-0">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-display gradient-text">My Notes</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-700">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} total
              </span>
            </div>
            {filteredNotes.length !== notes.length && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full">
                <Search className="h-3 w-3 text-accent-600" />
                <span className="text-sm font-semibold text-accent-700">
                  {filteredNotes.length} filtered
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <button // Select button
            onClick={handleToggleSelectionMode}
            className="btn-secondary flex items-center space-x-3 text-lg px-8 py-4 shadow-glow hover:shadow-glow-purple"
          >
            <span>{selectionMode ? 'Cancel' : 'Select'}</span>
          </button>
          <button
            onClick={handleCreateNote}
            className="btn-primary flex items-center space-x-3 text-lg px-8 py-4 shadow-glow hover:shadow-glow-purple"
          >
            <Plus className="h-6 w-6" />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search through your notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-12 text-lg"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <span className="text-xl">×</span>
          </button>
        )}
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-20">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <FileText className="h-12 w-12 text-primary-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-bold font-display text-slate-800 mb-3">
            {debouncedSearchTerm ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
            {debouncedSearchTerm 
              ? 'Try adjusting your search terms or create a new note'
              : 'Get started by creating your first note and organize your thoughts'
            }
          </p>
          {!debouncedSearchTerm && (
            <button
              onClick={handleCreateNote}
              className="btn-primary flex items-center space-x-3 mx-auto text-lg px-8 py-4 shadow-glow"
            >
              <Plus className="h-6 w-6" />
              <span>Create Your First Note</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectionMode && ( // Render "Select All" button only in selection mode
            <button
              onClick={handleSelectAll}
              className="btn-secondary px-4 py-2 text-base rounded-xl shadow-glow"
            >
              {selectedNotes.length === filteredNotes.length ? 'Deselect All' : 'Select All'}
            </button>
          )}
          {filteredNotes.map((note, index) => (
            <div 
              key={note.id} 
              className="animate-fade-in flex items-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {selectionMode && ( // Conditionally render checkbox
                <input
                  type="checkbox"
                  checked={selectedNotes.includes(note.id)}
                  onChange={() => handleSelectNote(note.id)}
                  className="mr-4 scale-125 accent-primary-500"
                  title="Select note"
                />
              )}
              <NoteCard
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            </div>
          ))}
        </div>
      )}

      {/* Note Form Modal */}
      <NoteForm
        note={editingNote}
        onSave={handleSaveNote}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default NotesList;