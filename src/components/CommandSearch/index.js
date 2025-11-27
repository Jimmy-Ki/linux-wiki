import React, { useState, useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import commandsData from '../../data/commands.json';
import styles from './CommandSearch.module.css';

export default function CommandSearch() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check for search term in URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchFromUrl = urlParams.get('search');
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, []);

  useEffect(() => {
    // Don't search if term is too short
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate a small delay to show loading state
    const timer = setTimeout(() => {
      const lowerSearchTerm = searchTerm.toLowerCase();

      // Search with scoring: name matches get higher priority than description matches
      const scoredResults = commandsData
        .map(cmd => {
          let score = 0;
          const nameMatch = cmd.name.toLowerCase().includes(lowerSearchTerm);
          const descriptionMatch = cmd.description.toLowerCase().includes(lowerSearchTerm);

          if (nameMatch) {
            // Exact name match gets highest score
            if (cmd.name.toLowerCase() === lowerSearchTerm) {
              score = 100;
            } else if (cmd.name.toLowerCase().startsWith(lowerSearchTerm)) {
              score = 90;
            } else {
              score = 80;
            }
          }

          if (descriptionMatch) {
            score += 40; // Description matches get lower score
          }

          return { ...cmd, score };
        })
        .filter(cmd => cmd.score > 0)
        .sort((a, b) => b.score - a.score) // Sort by score (highest first)
        .slice(0, 8); // Limit to 8 results for main search

      setSearchResults(scoredResults);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCommandClick = (command) => {
    // Navigate to the command page using Docusaurus router
    history.push(command.path);
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'file-management': 'File Management',
      'text-processing': 'Text Processing',
      'system-info': 'System Information',
      'process-management': 'Process Management',
      'networking': 'Networking',
      'user-management': 'User Management',
      'permission': 'Permissions',
      'compression': 'Compression & Archiving',
      'package-management': 'Package Management',
      'shell': 'Shell & Built-in',
      'system-service': 'System Services',
      'development': 'Development Tools'
    };
    return categoryNames[category] || category;
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Linux commands (e.g., ls, grep, systemctl)..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
          autoFocus
        />
        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={() => setSearchTerm('')}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          Searching commands...
        </div>
      )}

      {!isLoading && searchResults.length > 0 && (
        <div className={styles.searchResults}>
          <div className={styles.resultsHeader}>
            Found {searchResults.length} command{searchResults.length !== 1 ? 's' : ''}
          </div>
          {searchResults.map((command) => (
            <div
              key={command.name}
              className={styles.resultItem}
              onClick={() => handleCommandClick(command)}
            >
              <div className={styles.commandName}>{command.name}</div>
              <div className={styles.commandDescription}>
                {command.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && searchTerm.length >= 2 && searchResults.length === 0 && (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>
            <MagnifyingGlassIcon className="w-4 h-4" />
          </div>
          <div className={styles.noResultsText}>
            No commands found for "{searchTerm}"
          </div>
          <div className={styles.noResultsHint}>
            Try searching for common commands like: ls, cd, grep, ps, top
          </div>
        </div>
      )}

      </div>
  );
}