import React, { useState } from 'react';
import { IconCopy, IconSearch, IconMoodSmile, IconAdjustments, IconAlertTriangle } from '@tabler/icons-react';
import styles from './styles.module.css';

// Emoji categories with their emojis
const EMOJI_CATEGORIES = {
  'Smileys & Emotions': {
    icon: '😊',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍',
      '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫',
      '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴',
      '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓',
      '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥',
      '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈',
      '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻',
      '😼', '😽', '🙀', '😿', '😾'
    ]
  },
  'Animals & Nature': {
    icon: '🐶',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸',
      '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
      '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🕸️', '🦂',
      '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🦡', '🐢', '🐍', '🦎', '🐊',
      '🐢', '🐍', '🦎', '🐊', '🐢', '🐍', '🦎', '🐊', '🐢', '🐍', '🦎', '🐊', '🐢', '🐍', '🦎',
      '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🌾', '🌷', '🌹', '🥀', '🌺',
      '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓',
      '🌔', '🌍', '🌎', '🌏', '🪐', '💫', '⭐', '🌟', '✨', '⚡', '🔥', '💥', '☄️', '☃️', '❄️',
      '⛅', '☁️', '⛈️', '🌤️', '🌦️', '🌧️', '⛱️', '🌩️', '🌨️', '☂️', '🌈', '🌂', '☔', '⚡', '🔥'
    ]
  },
  'Food & Drink': {
    icon: '🍎',
    emojis: [
      '🍎', '🍏', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝',
      '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🥔', '🍠', '🥐', '🍞', '🥖',
      '🥨', '🧀', '🥚', '🍳', '🥓', '🥔', '🥞', '🥞', '🧇', '🥓', '🥔', '🍞', '🧀', '🥚', '🍳',
      '🥓', '🥔', '🥞', '🧇', '🥓', '🥔', '🍞', '🧀', '🥚', '🍳', '🥓', '🥔', '🥞', '🧇', '🥓'
    ]
  },
  'Activities': {
    icon: '⚽',
    emojis: [
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍',
      '🏏', '🥅', '⛳', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿',
      '⛷️', '🏂', '🪂', '🏋️', '🤼', '🤸', '🤾', '🏌️', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗',
      '🚵', '🪂', '🚴', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹'
    ]
  },
  'Objects': {
    icon: '⌚',
    emojis: [
      '⌚', '⌛', '⏳', '⌛', '⌚', '⏰', '⏱️', '⏲️', '🕰', '🕛', '🕧', '🕐', '🕜', '🕑', '🕝',
      '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕡', '🕖', '🕢', '🕗', '🕣', '🕘', '🕤',
      '🕙', '🕥', '🕚', '🕦', '🕛', '🕧', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤',
      '🕥', '🕦', '🕧', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜'
    ]
  }
};

export default function EmojiGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('Smileys & Emotions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [copiedEmoji, setCopiedEmoji] = useState('');

  const currentCategory = EMOJI_CATEGORIES[selectedCategory] || EMOJI_CATEGORIES['Smileys & Emotions'];

  const filteredEmojis = searchTerm
    ? currentCategory.emojis.filter(emoji =>
        emoji.includes(searchTerm) ||
        emoji.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentCategory.emojis;

  const toggleEmoji = (emoji) => {
    setSelectedEmojis(prev =>
      prev.includes(emoji)
        ? prev.filter(e => e !== emoji)
        : [...prev, emoji]
    );
  };

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji).then(() => {
      setCopiedEmoji(emoji);
      setTimeout(() => setCopiedEmoji(''), 2000);
    }).catch(() => {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = emoji;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmoji(emoji);
      setTimeout(() => setCopiedEmoji(''), 2000);
    });
  };

  const copySelectedEmojis = () => {
    const emojiString = selectedEmojis.join('');
    if (emojiString) {
      copyEmoji(emojiString);
      setSelectedEmojis([]);
    }
  };

  const clearSelection = () => {
    setSelectedEmojis([]);
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1><IconMoodSmile size={32} /> Emoji Generator</h1>
          <p>Find and copy emojis with ease</p>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div className={styles.searchSection}>
              <div className={styles.searchBox}>
                <IconSearch size={20} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search emojis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            <div className={styles.categories}>
              <h3><IconAdjustments size={18} /> Categories</h3>
              <div className={styles.categoryList}>
                {Object.entries(EMOJI_CATEGORIES).map(([name, data]) => (
                  <button
                    key={name}
                    onClick={() => setSelectedCategory(name)}
                    className={`${styles.categoryButton} ${
                      selectedCategory === name ? styles.active : ''
                    }`}
                  >
                    <span className={styles.categoryIcon}>{data.icon}</span>
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {selectedEmojis.length > 0 && (
              <div className={styles.selectionSection}>
                <h3>Selected ({selectedEmojis.length})</h3>
                <div className={styles.selectedEmojis}>
                  {selectedEmojis.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => toggleEmoji(emoji)}
                      className={styles.selectedEmoji}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className={styles.selectionActions}>
                  <button
                    onClick={copySelectedEmojis}
                    className={styles.copyButton}
                  >
                    <IconCopy size={16} />
                    Copy All
                  </button>
                  <button
                    onClick={clearSelection}
                    className={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.mainContent}>
            <div className={styles.emojiGrid}>
              {filteredEmojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => {
                    toggleEmoji(emoji);
                    copyEmoji(emoji);
                  }}
                  className={`${styles.emojiButton} ${
                    selectedEmojis.includes(emoji) ? styles.selected : ''
                  }`}
                  title={`Click to copy: ${emoji}`}
                >
                  <span className={styles.emoji}>{emoji}</span>
                  {copiedEmoji === emoji && (
                    <span className={styles.copied}>Copied!</span>
                  )}
                </button>
              ))}
            </div>

            {filteredEmojis.length === 0 && (
              <div className={styles.noResults}>
                <IconMoodSmile size={48} className={styles.noResultsIcon} />
                <h3>No emojis found</h3>
                <p>Try a different search term or category</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h4>How to use</h4>
            <ul>
              <li>Click any emoji to copy it to clipboard</li>
              <li>Hold Ctrl/Cmd + Click to add to selection</li>
              <li>Use search to find specific emojis</li>
              <li>Switch categories to browse different emoji types</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h4>Tips</h4>
            <ul>
              <li>Search works for emoji names and characters</li>
              <li>Select multiple emojis and copy them all at once</li>
              <li>Use in social media, messages, and documents</li>
              <li>Modern browsers support all displayed emojis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}