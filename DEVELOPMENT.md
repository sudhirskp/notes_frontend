# Development Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Make sure your backend is running on `http://localhost:8080`**

4. **Open your browser to `http://localhost:3000`**

## Project Structure

```
src/
├── api/
│   └── client.js              # Axios configuration and API calls
├── components/
│   ├── AuthPage.jsx           # Login/Register page container
│   ├── Header.jsx             # App header with user info
│   ├── LoadingSpinner.jsx     # Reusable loading component
│   ├── LoginForm.jsx          # Login form
│   ├── NoteCard.jsx           # Individual note display
│   ├── NoteForm.jsx           # Create/Edit note modal
│   ├── NotesList.jsx          # Main notes list component
│   └── ProtectedRoute.jsx     # Route protection wrapper
├── config/
│   └── api.js                 # API configuration
├── constants/
│   └── index.js               # App constants
├── contexts/
│   └── AuthContext.jsx        # Authentication state management
├── hooks/
│   ├── useDebounce.js         # Debounce hook for search
│   └── useNotes.js            # Notes management hook
├── utils/
│   └── helpers.js             # Utility functions
├── App.jsx                    # Main app component
├── main.jsx                   # App entry point
└── index.css                  # Global styles
```

## Key Features

### Authentication
- JWT token-based authentication
- Automatic token refresh and logout on expiration
- Protected routes
- User registration and login forms with validation

### Notes Management
- CRUD operations for notes
- Real-time search with debouncing
- Responsive grid layout
- Modal-based create/edit forms
- Confirmation dialogs for deletions

### UI/UX
- Modern, responsive design with TailwindCSS
- Loading states and error handling
- Toast notifications for user feedback
- Smooth animations and transitions
- Mobile-first approach

## API Integration

The frontend integrates with these endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /notes` - Get all notes
- `GET /notes/{id}` - Get note by ID
- `POST /notes` - Create new note
- `PUT /notes/{id}` - Update note
- `DELETE /notes/{id}` - Delete note

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=Notes App
```

### API Base URL

To change the API endpoint, update `VITE_API_BASE_URL` in your `.env` file or modify `src/config/api.js`.

## Development Tips

### Code Organization
- Components are organized by feature
- Custom hooks for reusable logic
- Constants file for magic numbers and strings
- Utility functions for common operations

### State Management
- React Context for authentication state
- Custom hooks for data fetching
- Local state for UI interactions

### Error Handling
- Centralized error handling in API client
- User-friendly error messages
- Toast notifications for feedback

### Performance
- Debounced search to reduce API calls
- Optimized re-renders with useCallback
- Lazy loading for better initial load time

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory. You can serve them with any static file server.

## Troubleshooting

### Common Issues

1. **CORS errors**: Make sure your backend has CORS configured for `http://localhost:3000`
2. **API connection failed**: Verify the backend is running on the correct port
3. **Authentication issues**: Check that JWT tokens are being stored correctly

### Debug Mode

Enable debug logging by adding this to your browser's console:
```javascript
localStorage.setItem('debug', 'true');
```

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Use meaningful commit messages

## Dependencies

### Production
- React 18 - UI library
- React Router - Client-side routing
- Axios - HTTP client
- TailwindCSS - Styling
- Lucide React - Icons
- React Hot Toast - Notifications

### Development
- Vite - Build tool
- ESLint - Code linting
- PostCSS - CSS processing
- Autoprefixer - CSS vendor prefixes
