import { useState, useEffect, useCallback } from 'react';
import { notesAPI } from '../api/client';
import toast from 'react-hot-toast';

// Custom hook for managing notes
export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const notesData = await notesAPI.getAll();
      setNotes(notesData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (title, content) => {
    try {
      const newNote = await notesAPI.create(title, content);
      setNotes(prev => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create note');
      throw err;
    }
  }, []);

  const updateNote = useCallback(async (id, title, content) => {
    try {
      const updatedNote = await notesAPI.update(id, title, content);
      setNotes(prev => prev.map(note => 
        note.id === id ? updatedNote : note
      ));
      return updatedNote;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update note');
      throw err;
    }
  }, []);

  const deleteNote = useCallback(async (id) => {
    try {
      await notesAPI.delete(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete note');
      throw err;
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes,
    loading,
    error,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
  };
};
