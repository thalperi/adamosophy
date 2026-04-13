# Identity & Recovery System

> Technical specification for Republet's identity management, key storage, and account recovery mechanisms.

---

## Overview

Republet uses **did:peer** as its primary identity method. This decentralized approach ensures users own their identity independent of any platform. However, decentralized identity comes with unique challenges around key management and account recovery.

This document specifies how Republet handles:
- Identity creation and linking
- Key storage options
- OAuth integration for convenience
- Delegate-based recovery
- Account switching and persistence

---

## Identity Architecture

### Primary Identity: did:peer

**did:peer** is a decentralized identifier method that requires no central registry. The identifier is created locally and can be verified cryptographically without any intermediary.

```
┌─────────────────────────────────────────────────────────────────┐
│                    did:peer Identity                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Format: did:peer:z6Mk...                                       │
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐                           │
│  │  Private    │     │  Public     │                           │
│  │  Key        │◀───▶│  Key        │                           │
│  │  (Secret)   │     │  (In DID)   │                           │
│  └─────────────┘     └─────────────┘                           │
│         │                   │                                   │
│         │                   │                                   │
│         ▼                   ▼                                   │
│  ┌─────────────┐     ┌─────────────┐                           │
│  │ Sign data   │     │ Verify      │                           │
│  │ Authorize   │     │ signatures  │                           │
│  │ actions     │     │ Resolve ID  │                           │
│  └─────────────┘     └─────────────┘                           │
│                                                                 │
│  No central registry required                                   │
│  Identity persists independently of Republet                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### OAuth Integration (Convenience Layer)

OAuth providers (ORCID, Google, GitHub, Microsoft) serve as convenience methods for sign-in, not as primary identity:

| OAuth Provider | Purpose |
|----------------|---------|
| **ORCID** | Academic identity verification, profile enrichment |
| **Google** | Convenience sign-in, account recovery hint |
| **GitHub** | Code integration, convenience sign-in |
| **Microsoft** | Convenience sign-in (enterprise users) |

**Key Principle:** OAuth facilitates access but does not define identity. The did:peer is always the primary identifier.

---

## Account Creation Flow

### Step-by-Step Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    Account Creation Flow                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. User arrives at Republet                                    │
│     │                                                           │
│     ▼                                                           │
│  2. Choose sign-in method                                       │
│     ┌─────────────────────────────────────────────────────┐    │
│     │  [ORCID] [Google] [GitHub] [Microsoft] [Create New] │    │
│     └─────────────────────────────────────────────────────┘    │
│     │                                                           │
│     ▼                                                           │
│  3. OAuth verification (if selected)                            │
│     - User authenticates with provider                         │
│     - Republet receives OAuth token and profile data           │
│     │                                                           │
│     ▼                                                           │
│  4. did:peer requirement                                        │
│     ┌─────────────────────────────────────────────────────┐    │
│     │  "Your Republet account requires a did:peer ID.      │    │
│     │                                                   │    │
│     │  [Create new did:peer]  [I have an existing one]  │    │
│     └─────────────────────────────────────────────────────┘    │
│     │                                                           │
│     ├── Create new ──▶ Generate keypair, store in chosen vault │
│     │                                                           │
│     ├── Existing ────▶ Import private key or connect wallet    │
│     │                                                           │
│     ▼                                                           │
│  5. Key storage configuration                                   │
│     - Browser localStorage (quick access, browser-dependent)    │
│     - Downloadable keystore file (portable, user-controlled)   │
│     - Both with backup options                                  │
│     │                                                           │
│     ▼                                                           │
│  6. OAuth linking (if OAuth used)                               │
│     - OAuth token stored in did:peer settings                  │
│     - Future sign-ins can use OAuth for convenience            │
│     │                                                           │
│     ▼                                                           │
│  7. Account created                                             │
│     - did:peer is primary ID                                   │
│     - OAuth methods linked as sign-in options                  │
│     - Profile initialized                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Account Provisioning Rule

**An account is not fully provisioned until a did:peer is associated.** Even after OAuth login, the user must create or supply a did:peer ID before the account is functional.

---

## Key Storage Options

Republet provides multiple key storage options to balance convenience and security:

### Option 1: Browser LocalStorage

| Aspect | Details |
|--------|---------|
| **Storage location** | User's browser |
| **Accessibility** | Automatic (no user action needed) |
| **Security** | Browser-dependent; vulnerable to XSS |
| **Portability** | Single browser/device only |
| **Recovery** | Lost if browser data cleared |

**Best for:** Users who prioritize convenience and use a single trusted device

### Option 2: Downloadable Keystore File

| Aspect | Details |
|--------|---------|
| **Storage location** | User's local filesystem |
| **Accessibility** | Requires file upload on each session |
| **Security** | User-controlled; safe from browser attacks |
| **Portability** | Portable across devices |
| **Recovery** | User must backup file |

**Best for:** Security-conscious users, multi-device users, backup-focused users

### Option 3: Both (Recommended)

| Aspect | Details |
|--------|---------|
| **Storage location** | Browser + downloadable backup |
| **Accessibility** | Automatic with backup option |
| **Security** | Balanced |
| **Portability** | Full |
| **Recovery** | Keystore file serves as backup |

**Implementation:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    Dual Storage Model                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Keypair Generation                                             │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Private Key                                             │   │
│  │       │                                                  │   │
│  │       ├──────────────▶ Browser LocalStorage              │   │
│  │       │                 (encrypted with user password)   │   │
│  │       │                                                  │   │
│  │       └──────────────▶ Keystore File (.republet-key)     │   │
│  │                           (encrypted, downloadable)      │   │
│  │                           (user prompted to backup)      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Recovery: If browser storage lost, restore from keystore file │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Keystore File Format

```json
{
  "version": "1.0",
  "type": "republet-keystore",
  "did_peer": "did:peer:z6Mk...",
  "public_key": "z6Mk...",
  "encrypted_private_key": "...",
  "encryption_method": "AES-256-GCM",
  "key_derivation": "PBKDF2",
  "created": "2025-01-15T10:30:00Z",
  "backup_reminder_shown": true
}
```

---

## OAuth Token Storage

OAuth tokens are stored in the settings of the did:peer identity:

```typescript
interface UserSettings {
  did_peer: string;
  oauth_links: {
    orcid?: {
      id: string;           // ORCID ID
      access_token: string; // Encrypted
      refresh_token: string; // Encrypted
      linked_at: number;
    };
    google?: {
      email: string;
      access_token: string; // Encrypted
      refresh_token: string; // Encrypted
      linked_at: number;
    };
    github?: {
      username: string;
      access_token: string; // Encrypted
      linked_at: number;
    };
    microsoft?: {
      email: string;
      access_token: string; // Encrypted
      refresh_token: string; // Encrypted
      linked_at: number;
    };
  };
  // ... other settings
}
```

### Security

- OAuth tokens are encrypted with user's did:peer key
- Tokens never leave user's control (stored in Willow replica)
- User can revoke any OAuth link at any time

---

## Delegate System

### Concept

Users can appoint **delegates**—trusted Republet users—who can store private keys and OAuth tokens on behalf of the appointer. This enables recovery even if the user loses all their own copies.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Delegate Recovery System                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Appointer (User A)                                             │
│       │                                                         │
│       │ Appoints                                                │
│       ▼                                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Delegates                                               │   │
│  │                                                          │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │   │
│  │  │Delegate │  │Delegate │  │Delegate │                 │   │
│  │  │   1     │  │   2     │  │   3     │                 │   │
│  │  │(Colleague)│(Mentor) │  │(Institution)│              │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘                 │   │
│  │       │            │            │                       │   │
│  │       │            │            │                       │   │
│  │       ▼            ▼            ▼                       │   │
│  │  Encrypted    Encrypted    Encrypted                    │   │
│  │  key shard    key shard    key shard                    │   │
│  │  (optional)   (optional)   (optional)                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Recovery: User can request recovery from any delegate         │
│            Delegates can authorize key restoration             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Delegate Capabilities

| Capability | Description |
|------------|-------------|
| **Store key shards** | Hold encrypted portions of private key |
| **Authorize recovery** | Approve identity restoration requests |
| **Store OAuth tokens** | Hold backup OAuth credentials |
| **View activity** | See appointer's public activity (optional) |

### Security Model

**Shamir's Secret Sharing (Optional):**

For enhanced security, the private key can be split using Shamir's Secret Sharing:

```
Private Key
    │
    ▼
┌─────────────────────────────────────┐
│  Shamir's Secret Sharing (3 of 5)   │
│                                     │
│  Key split into 5 shards            │
│  Any 3 shards can reconstruct key   │
│  Fewer than 3 = impossible          │
│                                     │
└─────────────────────────────────────┘
    │
    ▼
Shard 1 ──▶ Delegate 1
Shard 2 ──▶ Delegate 2
Shard 3 ──▶ Delegate 3
Shard 4 ──▶ User's keystore
Shard 5 ──▶ User's browser (or cloud backup)
```

**Threshold Configuration:**

| Threshold | Use Case |
|-----------|----------|
| 1 of N | Single delegate can recover (less secure, more convenient) |
| 2 of N | Requires 2 delegates (balanced) |
| M of N | Custom threshold (user choice) |

### Delegate Appointment Process

```
1. User selects "Add Delegate" in settings
   │
   ▼
2. Enter delegate's did:peer or search by name/ORCID
   │
   ▼
3. Configure delegate permissions:
   - Can store key shard? (Y/N)
   - Can authorize recovery? (Y/N)
   - Can store OAuth tokens? (Y/N)
   │
   ▼
4. Delegate receives invitation
   - Notification in Republet
   - Email (if email on file)
   │
   ▼
5. Delegate accepts
   - Encrypted shard/token transferred to delegate's vault
   - Delegate can now assist in recovery
```

---

## Recovery Scenarios

### Scenario 1: Lost Browser Access, Keystore Available

```
User situation: Browser data cleared, but has keystore file

Recovery flow:
1. User signs in via OAuth (if linked)
2. Republet recognizes did:peer but no key in browser
3. User uploads keystore file
4. User enters keystore password
5. Key restored to browser
6. Account fully accessible
```

### Scenario 2: Lost Keystore, Browser Access Available

```
User situation: Keystore file lost, but still signed in on one device

Recovery flow:
1. User goes to settings on signed-in device
2. Exports new keystore file
3. Saves to secure location
4. No identity disruption
```

### Scenario 3: Lost Everything, Delegates Available

```
User situation: Lost browser access AND keystore, but has delegates

Recovery flow:
1. User creates new Republet session
2. Claims existing did:peer identity
3. Requests recovery from delegates
4. Delegates receive recovery request
5. Required number of delegates approve
6. Key shards assembled (if Shamir used)
7. New key generated and linked to identity
8. OAuth tokens restored from delegate storage
9. Account recovered
```

### Scenario 4: Lost Everything, No Delegates

```
User situation: Lost everything, no delegates configured

Recovery flow:
1. ⚠️ Identity cannot be recovered
2. OAuth sign-in creates NEW account
3. Old identity becomes orphaned
4. Old content remains on network but unclaimed

Prevention: Republet strongly encourages:
- Multiple backup methods
- Delegate configuration
- Regular backup verification
```

---

## Account Switching

### Local Account Switching Chip

Republet provides an account switching interface on the landing page and throughout the app:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Account Switcher                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Current Account:                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  👤 Dr. Jane Smith                                       │   │
│  │  did:peer:z6Mk...8x7k                                    │   │
│  │  jane.smith@university.edu                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Switch Account:                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  👤 Dr. Bob Jones                              [Switch] │   │
│  │  did:peer:z6Mk...3m9k                                    │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  👤 Lab Admin Account                          [Switch] │   │
│  │  did:peer:z6Mk...7x2k                                    │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  ➕ Add another account                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Persistence

Account information is persisted locally:

| Data | Storage Location |
|------|-----------------|
| did:peer identifiers | Browser localStorage |
| Display names | Browser localStorage |
| OAuth tokens (encrypted) | Browser localStorage + Willow replica |
| Private keys (encrypted) | Browser localStorage + optional keystore |

### Multi-Device Sync

For users with multiple devices:

1. **Same identity, different devices**: Keystore file transfer
2. **Delegate relationship**: Use delegates to authorize new device
3. **OAuth-only**: Sign in on new device, verify via delegate or keystore

---

## Security Best Practices

### For Users

| Practice | Recommendation |
|----------|---------------|
| **Keystore backup** | Store in multiple secure locations |
| **Delegate selection** | Choose trusted individuals or institutions |
| **Delegate threshold** | Use 2+ delegates for important accounts |
| **OAuth linking** | Link multiple OAuth providers for recovery options |
| **Regular verification** | Periodically verify backups work |
| **Password strength** | Use strong, unique password for keystore |

### For Republet (Platform)

| Practice | Implementation |
|----------|---------------|
| **Key encryption** | AES-256-GCM for all stored keys |
| **No key access** | Republet never sees unencrypted private keys |
| **Secure transmission** | TLS for all key transfers |
| **Audit logging** | Log all recovery attempts |
| **Rate limiting** | Prevent recovery brute-force |
| **Notification** | Alert user on recovery activity |

---

## Sign-In Methods Summary

| Method | How It Works | What It Provides |
|--------|--------------|------------------|
| **did:peer (primary)** | Direct authentication with private key | Full account access |
| **ORCID OAuth** | Redirect to ORCID, return with token | Sign-in convenience + profile data |
| **Google OAuth** | Redirect to Google, return with token | Sign-in convenience |
| **GitHub OAuth** | Redirect to GitHub, return with token | Sign-in convenience + code integration |
| **Microsoft OAuth** | Redirect to Microsoft, return with token | Sign-in convenience (enterprise) |
| **Keystore file** | Upload encrypted keystore + password | Direct did:peer authentication |

**All OAuth methods ultimately authenticate to the did:peer identity.** OAuth is a convenience layer, not a replacement.

---

## Implementation Checklist

### Core Identity
- [ ] did:peer generation
- [ ] did:peer import (existing identity)
- [ ] Key encryption/decryption
- [ ] Keystore file generation
- [ ] Keystore file import

### OAuth Integration
- [ ] ORCID OAuth flow
- [ ] Google OAuth flow
- [ ] GitHub OAuth flow
- [ ] Microsoft OAuth flow
- [ ] OAuth token encryption
- [ ] OAuth token refresh

### Storage
- [ ] Browser localStorage implementation
- [ ] Keystore file download
- [ ] Keystore file upload
- [ ] Backup verification

### Delegate System
- [ ] Delegate invitation
- [ ] Delegate acceptance
- [ ] Key shard storage (Shamir's)
- [ ] Recovery request flow
- [ ] Recovery approval flow

### Account Switching
- [ ] Local account storage
- [ ] Account switcher UI
- [ ] Multi-device support

---

*Version: 0.1.0*
*Last updated: 2025*
