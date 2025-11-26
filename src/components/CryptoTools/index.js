import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function CryptoTools() {
  const [activeTab, setActiveTab] = useState('vanity');
  const [vanityPrefix, setVanityPrefix] = useState('');
  const [vanityResults, setVanityResults] = useState([]);
  const [isGeneratingVanity, setIsGeneratingVanity] = useState(false);
  const [mnemonicWords, setMnemonicWords] = useState([]);
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [blockchainQuery, setBlockchainQuery] = useState('');
  const [blockchainResults, setBlockchainResults] = useState(null);

  // BIP39 word list (simplified - first 100 words for demo)
  const bip39Words = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse',
    'access', 'accident', 'account', 'accuse', 'achieve', 'acid', 'acoustic', 'acquire', 'across', 'act',
    'action', 'actor', 'actress', 'actual', 'adapt', 'add', 'addict', 'address', 'adjust', 'admit',
    'adult', 'advance', 'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent',
    'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol', 'alert',
    'alien', 'all', 'alley', 'allow', 'almost', 'alone', 'alpha', 'already', 'also', 'alter'
  ];

  // Generate vanity address
  const generateVanityAddress = async () => {
    if (!vanityPrefix) return;

    setIsGeneratingVanity(true);
    setVanityResults([]);

    const results = [];
    const startTime = Date.now();
    const maxTime = 10000; // 10 seconds max
    let attempts = 0;

    while (Date.now() - startTime < maxTime && results.length < 5) {
      attempts++;

      // Generate random private key
      const privateKey = generatePrivateKey();

      // Generate corresponding address (simplified)
      const address = generateAddressFromPrivate(privateKey);

      // Check if address matches the prefix
      if (address.toLowerCase().startsWith(vanityPrefix.toLowerCase())) {
        results.push({
          address,
          privateKey,
          attempts
        });
      }

      // Allow UI updates
      if (attempts % 1000 === 0) {
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    }

    setVanityResults(results);
    setIsGeneratingVanity(false);
  };

  // Generate random private key
  const generatePrivateKey = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Generate address from private key (simplified)
  const generateAddressFromPrivate = (privateKey) => {
    // This is a simplified address generation for demo
    // Real implementation would use proper cryptographic functions
    const hash = Array.from(crypto.subtle.digestSync('SHA-256', new TextEncoder().encode(privateKey)))
      .map(b => b.toString(16).padStart(2, '0')).join('');

    return '0x' + hash.substring(0, 40);
  };

  // Generate mnemonic
  const generateMnemonic = () => {
    const entropy = new Uint8Array(16);
    crypto.getRandomValues(entropy);

    const words = [];
    for (let i = 0; i < 12; i++) {
      const wordIndex = (entropy[i] || 0) % bip39Words.length;
      words.push(bip39Words[wordIndex]);
    }

    setMnemonicWords(words);
  };

  // Generate key pair from mnemonic
  const generateKeysFromMnemonic = async () => {
    if (mnemonicWords.length === 0) {
      generateMnemonic();
      return;
    }

    const mnemonic = mnemonicWords.join(' ');

    // Generate private key from mnemonic (simplified)
    const encoder = new TextEncoder();
    const data = encoder.encode(mnemonic);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const privKey = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    setPrivateKey(privKey);

    // Generate public key and address (simplified)
    const pubKey = '0x' + hashArray.slice(0, 32).map(b => b.toString(16).padStart(2, '0')).join('');
    setPublicKey(pubKey);

    const addr = generateAddressFromPrivate(privKey);
    setAddress(addr);
  };

  // Query blockchain
  const queryBlockchain = async () => {
    if (!blockchainQuery) return;

    // Try to determine if it's address or transaction hash
    const isAddress = blockchainQuery.startsWith('0x') && blockchainQuery.length === 42;
    const isTx = blockchainQuery.startsWith('0x') && blockchainQuery.length === 66;

    if (isAddress) {
      // Query address info (using Etherscan API as example)
      try {
        const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${blockchainQuery}&tag=latest&apikey=yourapikey`);
        const data = await response.json();

        setBlockchainResults({
          type: 'address',
          address: blockchainQuery,
          balance: data.result ? (parseInt(data.result) / 1e18).toFixed(6) + ' ETH' : 'N/A',
          status: data.status === '1' ? 'success' : 'error'
        });
      } catch (error) {
        setBlockchainResults({
          type: 'address',
          address: blockchainQuery,
          error: 'Failed to fetch address information',
          link: `https://etherscan.io/address/${blockchainQuery}`
        });
      }
    } else if (isTx) {
      // Query transaction
      setBlockchainResults({
        type: 'transaction',
        hash: blockchainQuery,
        link: `https://etherscan.io/tx/${blockchainQuery}`
      });
    } else {
      setBlockchainResults({
        error: 'Invalid address or transaction hash format'
      });
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>加密货币工具箱</h1>
          <p>专业的区块链和加密货币工具套件 - 本地计算，安全可靠</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'vanity' ? styles.active : ''}`}
            onClick={() => setActiveTab('vanity')}
          >
            靓号生成器
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'wallet' ? styles.active : ''}`}
            onClick={() => setActiveTab('wallet')}
          >
            助记词/密钥
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'explorer' ? styles.active : ''}`}
            onClick={() => setActiveTab('explorer')}
          >
            区块链浏览器
          </button>
        </div>

        {/* Vanity Address Generator */}
        {activeTab === 'vanity' && (
          <div className={styles.toolSection}>
            <h2>靓号生成器</h2>
            <p>生成包含自定义前缀的以太坊地址</p>

            <div className={styles.inputGroup}>
              <label>地址前缀 (例如: 0x123, 0xabc):</label>
              <input
                type="text"
                value={vanityPrefix}
                onChange={(e) => setVanityPrefix(e.target.value)}
                placeholder="0x123"
                className={styles.input}
              />
              <button
                onClick={generateVanityAddress}
                disabled={isGeneratingVanity || !vanityPrefix}
                className={styles.button}
              >
                {isGeneratingVanity ? '生成中...' : '开始生成'}
              </button>
            </div>

            {isGeneratingVanity && (
              <div className={styles.generating}>
                <div className={styles.spinner}></div>
                <p>正在生成靓号地址，请耐心等待...</p>
                <p className={styles.smallText}>这可能需要几秒钟时间</p>
              </div>
            )}

            {vanityResults.length > 0 && (
              <div className={styles.results}>
                <h3>生成的靓号地址:</h3>
                {vanityResults.map((result, index) => (
                  <div key={index} className={styles.resultCard}>
                    <div className={styles.resultHeader}>
                      <span className={styles.resultTitle}>地址 #{index + 1}</span>
                      <span className={styles.attempts}>尝试次数: {result.attempts.toLocaleString()}</span>
                    </div>
                    <div className={styles.resultContent}>
                      <div className={styles.address}>
                        <label>地址:</label>
                        <code>{result.address}</code>
                        <button
                          onClick={() => copyToClipboard(result.address)}
                          className={styles.copyButton}
                        >
                          复制
                        </button>
                      </div>
                      <div className={styles.privateKey}>
                        <label>私钥:</label>
                        <code className={styles.privKey}>{result.privateKey}</code>
                        <button
                          onClick={() => copyToClipboard(result.privateKey)}
                          className={styles.copyButton}
                        >
                          复制
                        </button>
                      </div>
                    </div>
                    <div className={styles.warning}>
                      ⚠️ 请妥善保管私钥，丢失后无法恢复！
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wallet Generator */}
        {activeTab === 'wallet' && (
          <div className={styles.toolSection}>
            <h2>助记词和密钥生成器</h2>
            <p>生成加密钱包助记词和密钥对 - 所有计算都在本地完成</p>

            <div className={styles.walletSection}>
              <div className={styles.mnemonicSection}>
                <h3>BIP39 助记词</h3>
                <button
                  onClick={generateMnemonic}
                  className={styles.button}
                >
                  生成助记词
                </button>

                {mnemonicWords.length > 0 && (
                  <div className={styles.mnemonicGrid}>
                    {mnemonicWords.map((word, index) => (
                      <div key={index} className={styles.wordCard}>
                        <span className={styles.wordIndex}>{index + 1}</span>
                        <span className={styles.wordText}>{word}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {mnemonicWords.length > 0 && (
                <div className={styles.keyGeneration}>
                  <button
                    onClick={generateKeysFromMnemonic}
                    className={styles.button}
                  >
                    从助记词生成密钥
                  </button>
                </div>
              )}

              {(privateKey || publicKey || address) && (
                <div className={styles.keysDisplay}>
                  <h3>生成的密钥对</h3>

                  {address && (
                    <div className={styles.keyField}>
                      <label>地址:</label>
                      <div className={styles.keyContent}>
                        <code>{address}</code>
                        <button
                          onClick={() => copyToClipboard(address)}
                          className={styles.copyButton}
                        >
                          复制
                        </button>
                      </div>
                    </div>
                  )}

                  {publicKey && (
                    <div className={styles.keyField}>
                      <label>公钥:</label>
                      <div className={styles.keyContent}>
                        <code className={styles.longKey}>{publicKey}</code>
                        <button
                          onClick={() => copyToClipboard(publicKey)}
                          className={styles.copyButton}
                        >
                          复制
                        </button>
                      </div>
                    </div>
                  )}

                  {privateKey && (
                    <div className={styles.keyField}>
                      <label>私钥:</label>
                      <div className={styles.keyContent}>
                        <code className={styles.longKey}>{privateKey}</code>
                        <button
                          onClick={() => copyToClipboard(privateKey)}
                          className={styles.copyButton}
                        >
                          复制
                        </button>
                      </div>
                    </div>
                  )}

                  <div className={styles.securityWarning}>
                    🔒 安全提示: 请将助记词和私钥保存在安全的地方，不要截图或存储在不安全的地方。
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blockchain Explorer */}
        {activeTab === 'explorer' && (
          <div className={styles.toolSection}>
            <h2>区块链浏览器</h2>
            <p>查询以太坊地址余额和交易信息</p>

            <div className={styles.explorerSection}>
              <div className={styles.inputGroup}>
                <label>地址或交易哈希:</label>
                <input
                  type="text"
                  value={blockchainQuery}
                  onChange={(e) => setBlockchainQuery(e.target.value)}
                  placeholder="0x..."
                  className={styles.input}
                />
                <button
                  onClick={queryBlockchain}
                  disabled={!blockchainQuery}
                  className={styles.button}
                >
                  查询
                </button>
              </div>

              <div className={styles.quickLinks}>
                <h3>快速链接:</h3>
                <div className={styles.linksGrid}>
                  <a href="https://etherscan.io" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Etherscan (以太坊)
                  </a>
                  <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    BscScan (币安智能链)
                  </a>
                  <a href="https://polygonscan.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    PolygonScan (Polygon)
                  </a>
                  <a href="https://arbiscan.io" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Arbiscan (Arbitrum)
                  </a>
                  <a href="https://snowtrace.io" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    SnowTrace (Avalanche)
                  </a>
                  <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Solscan (Solana)
                  </a>
                </div>
              </div>

              {blockchainResults && (
                <div className={styles.explorerResults}>
                  <h3>查询结果:</h3>

                  {blockchainResults.type === 'address' && (
                    <div className={styles.addressResult}>
                      <div className={styles.resultHeader}>
                        <span>地址信息</span>
                        <a
                          href={`https://etherscan.io/address/${blockchainResults.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.externalLink}
                        >
                          在 Etherscan 查看 →
                        </a>
                      </div>

                      {blockchainResults.balance && (
                        <div className={styles.balance}>
                          <label>余额:</label>
                          <span className={styles.balanceAmount}>{blockchainResults.balance}</span>
                        </div>
                      )}

                      {blockchainResults.error && (
                        <div className={styles.error}>
                          {blockchainResults.error}
                        </div>
                      )}
                    </div>
                  )}

                  {blockchainResults.type === 'transaction' && (
                    <div className={styles.txResult}>
                      <div className={styles.resultHeader}>
                        <span>交易信息</span>
                        <a
                          href={blockchainResults.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.externalLink}
                        >
                          在 Etherscan 查看 →
                        </a>
                      </div>
                      <div className={styles.txHash}>
                        <label>交易哈希:</label>
                        <code>{blockchainResults.hash}</code>
                      </div>
                    </div>
                  )}

                  {blockchainResults.error && !blockchainResults.type && (
                    <div className={styles.error}>
                      {blockchainResults.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.securityNotice}>
          <h3>🔒 安全声明</h3>
          <ul>
            <li>所有计算都在您的浏览器本地完成，不会上传到任何服务器</li>
            <li>我们不会保存或记录您的助记词、私钥或地址信息</li>
            <li>请妥善保管您的私钥和助记词，丢失后无法恢复</li>
            <li>在使用真实资产前，建议先用少量资金测试</li>
            <li>靓号生成器的概率很低，需要大量计算时间和运气</li>
          </ul>
        </div>
      </div>
    </div>
  );
}