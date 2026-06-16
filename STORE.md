# Store Submission — Ambassade CI Vienne

## App identity

| Field | Value |
|---|---|
| App name | Ambassade CI — Vienne |
| Short name | AMBACI |
| Bundle / App ID | `ci.ambaci.vienna` |
| Version | 1.0.0 |
| Category | Government / Reference |
| Default language | French (FR) |
| Supported languages | FR / DE / EN |

---

## Short description (FR, ≤ 80 chars)

> Service consulaire de l'Ambassade de Côte d'Ivoire à Vienne.

---

## Full description

### FR
L'application officielle de l'Ambassade de Côte d'Ivoire à Vienne vous donne accès à tous les services consulaires depuis votre téléphone.

**Fonctionnalités :**
- Informations sur les services consulaires (passeport biométrique, visas, actes d'état civil, certificats)
- Coordonnées et horaires de l'Ambassade
- Annonces officielles et actualités
- Numéros d'urgence (112, police, pompiers, ambulance)
- Formulaire de contact et prise de rendez-vous
- Fonctionne en mode hors-ligne (interface complète sans connexion)
- Disponible en français, allemand et anglais

Juridiction consulaire : Autriche, Hongrie, Slovénie, Slovaquie, Croatie, Serbie, Roumanie, Bosnie-Herzégovine, Moldavie.

### DE
Die offizielle App der Botschaft der Elfenbeinküste in Wien bietet Ihnen Zugang zu allen Konsulardienstleistungen direkt vom Smartphone.

**Funktionen:**
- Informationen zu konsularischen Diensten (biometrischer Reisepass, Visa, Personenstandsurkunden, Bescheinigungen)
- Kontaktdaten und Öffnungszeiten der Botschaft
- Offizielle Mitteilungen und Neuigkeiten
- Notrufnummern (112, Polizei, Feuerwehr, Notarzt)
- Kontaktformular und Terminvereinbarung
- Auch offline nutzbar
- Verfügbar auf Französisch, Deutsch und Englisch

### EN
The official app of the Embassy of Côte d'Ivoire in Vienna gives you access to all consular services from your phone.

**Features:**
- Consular services information (biometric passport, visas, civil records, certificates)
- Embassy contact details and opening hours
- Official announcements and news
- Emergency numbers (112, police, fire, ambulance)
- Contact form and appointment booking
- Works offline (full UI without connection)
- Available in French, German, and English

---

## Screenshot sizes required

### iOS (App Store Connect)
| Device | Size |
|---|---|
| iPhone 6.9" (required) | 1320 × 2868 px |
| iPhone 6.7" | 1290 × 2796 px |
| iPhone 6.5" | 1284 × 2778 px |
| iPad Pro 13" (required if supporting iPad) | 2064 × 2752 px |

Minimum: 3 screenshots per device class, max 10.

### Android (Google Play Console)
| Type | Size |
|---|---|
| Phone screenshots (required) | 1080 × 1920 px (min), 9:16 ratio |
| 7" tablet (optional) | 1200 × 1920 px |
| 10" tablet (optional) | 1600 × 2560 px |
| Feature graphic (required) | 1024 × 500 px |

Minimum: 2 phone screenshots required.

---

## iOS — App Store Connect checklist

1. **Create app record** at [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Platform: iOS
   - Bundle ID: `ci.ambaci.vienna` (register in Certificates, Identifiers & Profiles first)
   - SKU: `AMBACI-VIENNA-001`

2. **Signing** (on a Mac with Xcode):
   ```bash
   npx cap open ios
   # In Xcode: select your Team, set Signing Certificate to "Distribution"
   # Product → Archive → Distribute App → App Store Connect
   ```

3. **Fill in App Store Connect**:
   - Name: `Ambassade CI — Vienne`
   - Subtitle: `Service consulaire officiel` (≤ 30 chars)
   - Category: Government (primary)
   - Privacy Policy URL: required (add your existing site URL + /privacy)
   - Age rating: 4+ (no sensitive content)
   - Upload screenshots (see sizes above)
   - Paste FR description above

4. **Usage strings** (none beyond network required for this wrapper):
   - No camera, location, contacts, or microphone permissions needed.

5. Submit for review.

---

## Android — Google Play Console checklist

1. **Create upload keystore** (run once, store securely — never commit):
   ```bash
   keytool -genkey -v -keystore ambaci-release.jks \
     -alias ambaci -keyalg RSA -keysize 2048 -validity 10000
   # Answer prompts; store the .jks file and passwords in a password manager
   ```

2. **Configure signing in `android/app/build.gradle`**:
   ```groovy
   android {
     signingConfigs {
       release {
         storeFile file('../ambaci-release.jks')
         storePassword 'YOUR_STORE_PASSWORD'
         keyAlias 'ambaci'
         keyPassword 'YOUR_KEY_PASSWORD'
       }
     }
     buildTypes {
       release {
         signingConfig signingConfigs.release
         minifyEnabled false
       }
     }
   }
   ```

3. **Build release bundle**:
   ```bash
   npx cap sync
   cd android
   ./gradlew bundleRelease
   # Output: android/app/build/outputs/bundle/release/app-release.aab
   ```

4. **Play Console** at [play.google.com/console](https://play.google.com/console):
   - Create new app → Production
   - Upload the `.aab` file
   - App category: Government
   - Content rating questionnaire: answer (no violence, no ads, government info app)
   - Paste FR/DE/EN descriptions above
   - Upload feature graphic (1024 × 500 px) and screenshots
   - Fill in data safety section (app collects: nothing beyond localStorage for language preference)

5. Submit for review.

---

## After submission

- Run `npx cap sync` before every release build to push web changes into native shells.
- Increment `versionCode` (Android) and `CURRENT_PROJECT_VERSION` (iOS) for each update.
- Keep `mobile/` (website) and `app/www/` (app) in sync when content changes.
