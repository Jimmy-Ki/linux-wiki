# Crypto Tools Architecture

This document describes the comprehensive cryptography tools system built for linux.wiki.

## Overview

The crypto tools system is a modular, extensible React-based framework for implementing various cryptographic operations. It's designed to be client-side only, using modern web cryptography APIs and libraries.

## Architecture

### Core Components

#### Base Framework (`/base/`)
- **`types.ts`** - TypeScript interfaces and type definitions
- **`CryptoTool.tsx`** - Base component that all individual tools extend

#### Algorithms (`/algorithms/`)
- **`encoders.ts`** - Base64, Base32, Base16, Base58, URL, HTML encoding
- **`hashing.ts`** - MD5, SHA1, SHA256, SHA512, SHA3, CRC32, Adler32, HMAC
- **`symmetric.ts`** - AES, DES, TripleDES, Rabbit, RC4 encryption

#### Utilities (`/utils/`)
- **`processing.ts`** - Large text processing, streaming, chunking
- **`formatting.ts`** - Byte formatting, string manipulation, validation

#### UI Components (`/ui/`)
- **`CryptoTools.css`** - Styling for individual tools
- **`CryptoToolsPage.css`** - Styling for the main tools page

## Tool Categories Structure

The system is organized into 10 main categories:

1. **Encoders & Decoders** (17 tools)
   - Base64, Base32, Base16, Base58
   - URL encoding, HTML encoding
   - Binary, ASCII, UTF-8 conversions

2. **Modern Symmetric Crypto** (17 tools)
   - AES, DES, TripleDES
   - ChaCha20, RC4, Rabbit
   - Various modes: ECB, CBC, CFB, OFB, CTR, GCM

3. **Asymmetric Crypto** (4 tools)
   - RSA encryption/decryption
   - ECC operations
   - Digital signatures

4. **Hashing & Checksums** (9 tools)
   - MD5, SHA1, SHA256, SHA512, SHA3
   - CRC32, Adler32
   - HMAC variants

5. **KDF & MAC** (6 tools)
   - HMAC, PBKDF2, Bcrypt
   - Scrypt, Argon2
   - HKDF

6. **Classical Ciphers** (14 tools)
   - Caesar, Vigenère, Atbash
   - ROT13, Playfair, Rail Fence
   - Substitution ciphers

7. **CTF & Esoteric** (8 tools)
   - Brainfuck, JSFuck
   - Various CTF encoding schemes
   - Flag formats

8. **Web & Network Tools** (5 tools)
   - JWT encoding/decoding
   - IP address tools
   - Cron expression parser

9. **Image & Steganography** (6 tools)
   - QR code generation/reading
   - Barcode generation
   - Steganography tools

10. **Developer Misc** (7 tools)
    - UUID generator
    - JSON formatting
    - Password generators
    - Random data generators

## Implementation Pattern

Each tool follows a consistent pattern:

### 1. Algorithm Implementation
```typescript
// In /algorithms/category.ts
export const algorithmName = {
  operation: (input: string, key?: string, options?: any): ToolResult => {
    try {
      // Implementation logic
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
```

### 2. Tool Configuration
```typescript
const config: CryptoToolConfig = {
  id: 'unique-id',
  name: 'Human Readable Name',
  description: 'Tool description',
  category: 'Category Name',
  operation: 'encrypt' | 'decrypt' | 'encode' | 'decode' | 'hash',
  supportedModes?: ['ECB', 'CBC', ...],
  hasKeyInput?: true,
  hasIVInput?: true,
  keySizes?: [128, 192, 256],
  ivSizes?: [128]
};
```

### 3. React Component
```typescript
export const ToolName: React.FC = () => {
  const handleProcess = async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    return algorithmName.operation(input, key, options);
  };

  return <CryptoTool config={config} onProcess={handleProcess} />;
};
```

## Key Features

### Client-Side Processing
- All operations happen in the browser
- No server calls required
- User data stays private

### Large File Support
- Streaming processing for large files
- Chunking for memory efficiency
- Progress tracking for long operations

### Input Validation
- Comprehensive validation for all inputs
- Clear error messages
- Graceful handling of edge cases

### Modern UI/UX
- Responsive design for all devices
- Dark theme support
- Copy to clipboard functionality
- Download results
- File upload support

### Performance Optimizations
- Web Workers for heavy operations (where applicable)
- Efficient algorithms
- Minimal memory usage

## Security Considerations

### Cryptographic Libraries
- **crypto-js**: Core cryptographic functions
- **Web Crypto API**: Browser-native crypto operations
- **js-sha512**: Optimized SHA implementations
- **bcryptjs**: Password hashing
- **uuid**: UUID generation

### Best Practices
- Keys are handled securely in memory
- Sensitive data is cleared when no longer needed
- Modern algorithms are recommended over legacy ones
- Clear warnings for insecure algorithms (MD5, SHA1, DES)

## Adding New Tools

1. **Create Algorithm**: Add implementation to appropriate `/algorithms/` file
2. **Create Component**: Follow the pattern in category folder
3. **Update Index**: Export new component from `/index.ts`
4. **Add to Page**: Include in `CryptoToolsPage.tsx`
5. **Test**: Verify functionality and error handling

## Future Extensions

The architecture is designed to easily accommodate:
- Additional encryption algorithms
- New encoding schemes
- Advanced steganography techniques
- Web3 and blockchain tools
- Machine learning security tools

## File Structure

```
/src/components/CryptoTools/
├── base/
│   ├── types.ts
│   └── CryptoTool.tsx
├── algorithms/
│   ├── encoders.ts
│   ├── hashing.ts
│   └── symmetric.ts
├── utils/
│   ├── processing.ts
│   └── formatting.ts
├── ui/
│   ├── CryptoTools.css
│   └── CryptoToolsPage.css
├── encoders/
│   ├── Base64Tool.tsx
│   ├── HexTool.tsx
│   └── ...
├── hashing/
│   ├── MD5Tool.tsx
│   ├── SHA256Tool.tsx
│   └── ...
├── symmetric/
│   ├── AESTool.tsx
│   ├── DESTool.tsx
│   └── ...
├── CryptoToolsPage.tsx
└── index.ts
```

This architecture provides a solid foundation for a comprehensive crypto tools system that can be easily extended and maintained.