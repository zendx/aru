import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';

class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('The application failed to render.', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" style={{ font: '16px system-ui', padding: 32, color: '#102d45' }}>
          <h1>We could not load the election page.</h1>
          <p>Please reload the page. If the problem continues, contact the club administrator.</p>
          <button onClick={() => window.location.reload()}>Reload page</button>
        </main>
      );
    }

    return this.props.children;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<React.StrictMode><AppErrorBoundary><App /></AppErrorBoundary></React.StrictMode>);
