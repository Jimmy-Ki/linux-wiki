---
title: Cryptography Tools
description: Complete suite of cryptographic tools for encoding, encryption, hashing, and security operations.
---

# Cryptography Tools Suite

Linux.wiki provides a comprehensive suite of cryptographic tools that run entirely in your browser. These tools are designed for developers, security professionals, and anyone working with data encoding, encryption, and security operations.

## 🚀 Features

- **Client-Side Only**: All operations happen in your browser - your data never leaves your device
- **No Server Calls**: Complete privacy and security for your sensitive data
- **Large File Support**: Process large files with streaming and chunking capabilities
- **Modern UI**: Responsive design with dark theme support
- **Real-Time Processing**: Instant results with progress tracking
- **Multiple Formats**: Support for various encodings and output formats

## 🛠️ Available Tools

### Encoders & Decoders (17 tools)

#### Text Encoders
- **Base64** - Encode/decode Base64 strings
- **Base32** - Encode/decode Base32 strings
- **Hexadecimal (Base16)** - Encode/decode hex strings
- **Base58** - Bitcoin-style encoding without similar characters
- **URL Encoding** - Percent-encoding for URLs
- **HTML Encoding** - Escape HTML entities

#### Character Encoders
- **UTF-8**, **ASCII**, **Binary** conversions
- **Unicode** text processing
- **Custom alphabet** encodings

### Modern Symmetric Crypto (17 tools)

#### AES Family
- **AES-128/192/256** with multiple modes:
  - **ECB** (Electronic Codebook)
  - **CBC** (Cipher Block Chaining)
  - **CFB** (Cipher Feedback)
  - **OFB** (Output Feedback)
  - **CTR** (Counter)
  - **GCM** (Galois/Counter Mode)

#### Legacy Algorithms
- **DES** - Data Encryption Standard
- **3DES** - Triple DES
- **RC4** - Rivest Cipher 4
- **Rabbit** - High-speed stream cipher
- **ChaCha20** - Modern stream cipher

### Hashing & Checksums (9 tools)

#### Cryptographic Hashes
- **MD5** - Legacy hash (⚠️ not for security)
- **SHA-1** - Legacy hash (⚠️ not for security)
- **SHA-256** - Secure hash algorithm
- **SHA-512** - Stronger SHA variant
- **SHA-3** - Latest standard (224/256/384/512 bit)

#### Checksums
- **CRC32** - Cyclic redundancy check
- **Adler32** - Fast checksum algorithm

#### Message Authentication
- **HMAC** variants (MD5, SHA1, SHA256, SHA512)

### Asymmetric Crypto (4 tools)

#### RSA
- **RSA Encryption/Decryption**
- **RSA Key Generation**
- **Digital Signatures**
- **Certificate Operations**

#### Elliptic Curve
- **ECC Operations**
- **ECDSA Signatures**
- **ECDH Key Exchange**

### Key Derivation & MAC (6 tools)

#### Password Hashing
- **PBKDF2** - Password-based key derivation
- **Bcrypt** - Adaptive password hashing
- **Scrypt** - Memory-hard password hashing
- **Argon2** - Modern password hashing winner

#### Message Authentication
- **HMAC** with various hash functions
- **HKDF** - HMAC-based key derivation

### Classical Ciphers (14 tools)

#### Substitution Ciphers
- **Caesar Cipher** - Simple shift cipher
- **Vigenère Cipher** - Polyalphabetic cipher
- **Atbash Cipher** - Hebrew substitution cipher
- **ROT13** - Simple letter rotation

#### Transposition Ciphers
- **Rail Fence Cipher** - Zigzag pattern
- **Columnar Transposition** - Column-based rearrangement

#### Other Classical Ciphers
- **Playfair Cipher** - Digraph substitution
- **Autokey Cipher** - Self-generating key
- **Beaufort Cipher** - Variant of Vigenère

### CTF & Esoteric (8 tools)

#### Capture the Flag Tools
- **Flag Format Validators**
- **Base Encoding Detection**
- **String Pattern Analysis**

#### Esoteric Encodings
- **Brainfuck** - Esoteric programming language
- **JSFuck** - JavaScript-only encoding
- **Leet Speak** - Gaming/ hacker culture text

### Web & Network Tools (5 tools)

#### Web Technologies
- **JWT Encoder/Decoder** - JSON Web Tokens
- **URL Component Parser** - Analyze URLs
- **HTML Entity Encoder/Decoder**

#### Network Tools
- **IP Address Tools** - IPv4/IPv6 utilities
- **Cron Expression Parser** - Schedule parsing

### Image & Steganography (6 tools)

#### Image Generation
- **QR Code Generator** - 2D barcode creation
- **Barcode Generator** - 1D barcodes (Code128, EAN, UPC)

#### Steganography
- **Text in Image** - Hide messages in images
- **Image Analysis** - Detect hidden data
- **Watermarking** - Add invisible watermarks

### Developer Tools (7 tools)

#### Data Processing
- **JSON Formatter/Validator** - Pretty print and validate JSON
- **XML Formatter** - Format XML documents
- **UUID Generator** - Generate unique identifiers

#### Generators
- **Password Generator** - Secure random passwords
- **API Key Generator** - Generate API keys
- **Random Data Generator** - Test data creation

## 🔒 Security Features

### Client-Side Processing
- ✅ No data transmitted to servers
- ✅ Works offline once loaded
- ✅ Memory is cleared after operations

### Modern Cryptography
- ✅ Uses Web Crypto API where available
- ✅ Industry-standard algorithms
- ✅ Proper key handling practices

### Validation & Error Handling
- ✅ Input validation for all tools
- ✅ Clear error messages
- ✅ Graceful failure handling

## 📁 File Structure

```
src/components/CryptoTools/
├── base/                 # Core framework
│   ├── types.ts         # TypeScript definitions
│   └── CryptoTool.tsx   # Base component
├── algorithms/          # Crypto implementations
│   ├── encoders.ts      # Encoding algorithms
│   ├── hashing.ts       # Hash functions
│   └── symmetric.ts     # Encryption algorithms
├── utils/               # Helper functions
│   ├── processing.ts    # Large file handling
│   └── formatting.ts    # Data formatting
├── ui/                  # Styling and UI
│   ├── CryptoTools.css
│   └── CryptoToolsPage.css
├── encoders/            # Encoder tools
├── hashing/             # Hash tools
├── symmetric/           # Encryption tools
├── asymmetric/          # Public key tools
├── kdf/                 # Key derivation tools
├── classical/           # Classical ciphers
├── ctf/                 # CTF tools
├── web/                 # Web tools
├── image/               # Image tools
└── developer/           # Developer tools
```

## 🛠️ Usage

1. **Select a Tool**: Browse categories or search for specific tools
2. **Configure Options**: Set parameters like encryption mode, key size, etc.
3. **Input Data**: Enter text, upload files, or generate random data
4. **Process**: Click the action button to perform the operation
5. **View Results**: Copy, download, or analyze the output

## 🔧 Technical Details

### Dependencies
- **crypto-js**: Core cryptographic functions
- **Web Crypto API**: Browser-native crypto operations
- **js-sha512**: Optimized SHA implementations
- **uuid**: UUID generation
- **bcryptjs**: Password hashing
- **qrcode**: QR code generation

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

### Performance
- **Large Files**: Streaming processing for files up to 50MB
- **Memory Efficient**: Chunked processing prevents memory issues
- **Fast Operations**: Optimized algorithms and Web Workers for heavy tasks

## 🚨 Security Notices

### ⚠️ Legacy Algorithms
Some tools include legacy algorithms for compatibility and educational purposes:
- **MD5**: Not cryptographically secure
- **SHA-1**: Collision-resistant but deprecated
- **DES**: 56-bit key is too small for modern security

### 🔐 Recommendations
- Use **AES-256** for encryption
- Use **SHA-256** or **SHA-3** for hashing
- Use **Argon2** for password hashing
- Avoid legacy algorithms for production use

## 🤝 Contributing

The crypto tools suite is designed to be easily extensible:

1. **Add Algorithm**: Implement in `/algorithms/` directory
2. **Create Component**: Follow the pattern in category folders
3. **Update Index**: Export from `/index.ts`
4. **Add Navigation**: Include in `CryptoToolsPage.tsx`

## 📝 License

This crypto tools suite is part of Linux.wiki and follows the same licensing terms. The cryptographic libraries used have their respective open-source licenses.

---

**Access the Crypto Tools**: [Crypto Tools Page](/crypto-tools)

Need help or found an issue? [Open an issue on GitHub](https://github.com/Jimmy-Ki/linux-wiki/issues)