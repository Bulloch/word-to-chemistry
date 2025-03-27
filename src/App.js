import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main.jsx';

function App() {
  const initialTheme = localStorage.getItem('theme') || 'dark';
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  
  const themes = [
    { name: 'dark', icon: '🌙', label: 'Sombre' },
    { name: 'light', icon: '☀️', label: 'Clair' },
    { name: 'blue', icon: '🌊', label: 'Bleu' },
    { name: 'green', icon: '🌿', label: 'Vert' },
    { name: 'red', icon: '🔥', label: 'Rouge' },
    { name: 'purple', icon: '🔮', label: 'Violet' },
    { name: 'orange', icon: '🎃', label: 'Orange' },
    { name: 'cyan', icon: '💎', label: 'Cyan' }
  ];

  const handleThemeChange = (themeName) => {
    localStorage.setItem('theme', themeName);
    document.querySelector('.App').className = `App ${themeName}`;
    setShowThemeMenu(false);
  };

  return (
    <div className={`App ${initialTheme}`}>
      <header className="App-header">
        <div className="header-content">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="header-title">Word To Chemistry</h1>
          <div className="theme-options">
            <button 
              className="theme-options-button"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              aria-label="Theme options"
            >
              ⚙️
            </button>
            {showThemeMenu && (
              <div className="theme-menu">
                {themes.map(theme => (
                  <button
                    key={theme.name}
                    className={`theme-option ${initialTheme === theme.name ? 'active' : ''}`}
                    onClick={() => handleThemeChange(theme.name)}
                  >
                    <span>{theme.icon}</span>
                    <span>{theme.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <Main/>
    </div>
  );
}

export default App;
