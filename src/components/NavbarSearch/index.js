import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import commandsData from '../../data/commands.json';
import styles from './NavbarSearch.module.css';

export default function NavbarSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        .slice(0, 5); // Limit to 5 results for navbar

      setSearchResults(scoredResults);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsExpanded(true);
  };

  const handleCommandClick = (command) => {
    window.location.href = command.path;
    setIsExpanded(false);
    setSearchTerm('');
  };

  const handleBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      setIsExpanded(false);
    }, 200);
  };

  const handleFocus = () => {
    if (searchTerm) {
      setIsExpanded(true);
    }
  };

  return (
    <div className={styles.navbarSearch}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search commands..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.searchInput}
        />
        <div className={styles.searchIcon}>
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
      </div>

      {isExpanded && searchTerm.length >= 2 && (
        <div className={styles.searchDropdown}>
          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((command) => (
              <div
                key={command.name}
                className={styles.resultItem}
                onClick={() => handleCommandClick(command)}
              >
                <div className={styles.commandName}>{command.name}</div>
                <div className={styles.commandDescription}>{command.description}</div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              No commands found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
