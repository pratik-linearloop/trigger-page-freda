# Freda Soft Lock Plus - Configuration-Based Extension Control

## Overview

The Freda Soft Lock Plus extension now supports **granular 3rd party extension control** through external configuration files. This allows educational institutions to define precisely which browser extensions are allowed during assessments, making it ideal for Chromebook environments where students may have various educational tools installed.

## Key Features

### 🎯 **Granular Extension Control**
- **Allowlist Mode**: Only specified extensions remain enabled
- **Blocklist Mode**: Specific extensions are disabled, others remain
- **Category-Based Control**: Manage extensions by type (accessibility, productivity, games, etc.)

### 🌐 **External Configuration Management**
- Host configuration files alongside your trigger page
- Dynamic loading from any accessible URL
- Cached configurations for performance
- Fallback to default settings if loading fails

### ♿ **Accessibility Support**
- Pre-configured accessibility assessment mode
- Support for text-to-speech tools like **NaturalReader AI**
- Compliance with ADA, Section 508, and WCAG 2.1 AA standards

## Configuration Schema

### Basic Structure

```json
{
  "version": "1.0.0",
  "name": "Configuration Name",
  "description": "Description of this configuration",
  "extensionControl": {
    "mode": "allowlist|blocklist|disabled",
    "allowedExtensions": ["extension-id-1", "extension-id-2"],
    "blockedExtensions": ["extension-id-3", "extension-id-4"],
    "accessibilityExtensions": ["accessibility-extension-ids"],
    "categories": {
      "productivity": ["allow"],
      "accessibility": ["allow"],
      "entertainment": ["block"],
      "social": ["block"],
      "games": ["block"],
      "developer": ["block"]
    }
  },
  "assessmentSettings": {
    "allowNewTabs": false,
    "allowExtensionPages": false,
    "allowDeveloperTools": false,
    "strictMode": true
  }
}
```

### Extension Control Modes

#### 1. **Allowlist Mode** (Recommended)
```json
{
  "extensionControl": {
    "mode": "allowlist",
    "allowedExtensions": [
      "kohfgcgbkjodfcfkcackpagifgbcmimk",  // NaturalReader AI
      "kimpkiocicogmepnmbjckplebgffcpba",  // Read&Write for Chrome
      "ghbmnnjooekpmoecnnnilnnbdlolhkhi"   // Google Docs
    ]
  }
}
```
- Only extensions in the `allowedExtensions` list remain enabled
- All other extensions are temporarily disabled
- Most secure option for high-stakes assessments

#### 2. **Blocklist Mode**
```json
{
  "extensionControl": {
    "mode": "blocklist",
    "blockedExtensions": [
      "extension-id-of-game",
      "extension-id-of-social-media-tool"
    ]
  }
}
```
- Specific extensions in `blockedExtensions` are disabled
- All other extensions remain enabled
- Good for environments with many educational tools

#### 3. **Disabled Mode**
```json
{
  "extensionControl": {
    "mode": "disabled"
  }
}
```
- No extension management is performed
- All extensions remain in their current state

## Pre-Built Configurations

### 1. Default Assessment (`default-assessment.json`)
```json
{
  "name": "Default Assessment Configuration",
  "description": "Standard assessment mode with basic restrictions",
  "extensionControl": {
    "mode": "allowlist",
    "allowedExtensions": [
      "nkeimhogjdpnpccoofpliimaahmaaome",  // Google Hangouts
      "ghbmnnjooekpmoecnnnilnnbdlolhkhi",  // Google Docs
      "aapocclcgogkmnckokdopfmhonfmgoek",  // Google Slides
      "felcaaldnbdncclmgdcncolpebgiejap"   // Google Sheets
    ]
  }
}
```

### 2. Accessibility Assessment (`accessibility-assessment.json`)
```json
{
  "name": "Accessibility Assessment Configuration",
  "description": "Optimized for students with accessibility needs",
  "extensionControl": {
    "mode": "allowlist",
    "allowedExtensions": [
      "kohfgcgbkjodfcfkcackpagifgbcmimk",  // NaturalReader AI Text to Speech
      "kimpkiocicogmepnmbjckplebgffcpba",  // Read&Write for Google Chrome
      "iopcbpdjglgphfmedjipbgjojdkgfpem",  // Grammarly
      "ncjmfjffaalmghmiekhlcjdgmlhiklnm"   // ClaroRead Chrome
    ]
  },
  "assessmentSettings": {
    "strictMode": false  // Less restrictive for accessibility needs
  }
}
```

### 3. Strict Assessment (`strict-assessment.json`)
```json
{
  "name": "Strict Assessment Configuration",
  "description": "High-security mode for standardized testing",
  "extensionControl": {
    "mode": "allowlist",
    "allowedExtensions": [
      // Only essential Chrome extensions allowed
    ]
  },
  "assessmentSettings": {
    "strictMode": true,
    "securityLevel": "maximum"
  }
}
```

## Implementation Guide

### 1. **Host Configuration Files**

Place your configuration files in a publicly accessible location:

```
your-domain.com/
├── assessment-trigger.html
├── configs/
│   ├── default-assessment.json
│   ├── accessibility-assessment.json
│   ├── strict-assessment.json
│   └── custom-math-assessment.json
```

### 2. **Configure Trigger Page**

Update your trigger page to specify the configuration:

```html
<select id="configSelect">
  <option value="default">Default Assessment</option>
  <option value="accessibility">Accessibility Assessment</option>
  <option value="strict">Strict Assessment</option>
  <option value="custom">Custom Configuration</option>
</select>

<input type="url" id="configUrlInput" 
       placeholder="https://your-domain.com/configs/custom-config.json">
```

### 3. **JavaScript Integration**

```javascript
// Get configuration URL based on selection
function getConfigurationUrl() {
  const configSelect = document.getElementById('configSelect');
  const customUrlInput = document.getElementById('configUrlInput');
  
  if (configSelect.value === 'custom') {
    return customUrlInput.value.trim();
  } else {
    return `./configs/${configSelect.value}-assessment.json`;
  }
}

// Activate with configuration
async function activateSoftLock() {
  const configurationUrl = getConfigurationUrl();
  
  // Send to extension
  chrome.runtime.sendMessage(extensionId, {
    type: 'ACTIVATE_SOFT_LOCK',
    triggerUrl: window.location.href,
    configurationUrl: configurationUrl
  });
}
```

## Common Extension IDs

### Accessibility Extensions
```json
{
  "kohfgcgbkjodfcfkcackpagifgbcmimk": "NaturalReader AI Text to Speech",
  "kimpkiocicogmepnmbjckplebgffcpba": "Read&Write for Google Chrome",
  "icoloanbecehinobmflpeglknkplbfbm": "Voice Dream Reader",
  "jlmpjdjjbgclbocgajdjefcidcncaied": "Text to Speech Reader",
  "ncjmfjffaalmghmiekhlcjdgmlhiklnm": "ClaroRead Chrome",
  "iopcbpdjglgphfmedjipbgjojdkgfpem": "Grammarly",
  "lfheijjkpjkpjhpfdoioaggijkblbnnl": "Immersive Reader"
}
```

### Google Workspace Extensions
```json
{
  "ghbmnnjooekpmoecnnnilnnbdlolhkhi": "Google Docs",
  "aapocclcgogkmnckokdopfmhonfmgoek": "Google Slides", 
  "felcaaldnbdncclmgdcncolpebgiejap": "Google Sheets",
  "apdfllckaahabafndbhieahigkjlhalf": "Google Drive",
  "aohghmighlieiainnegkcijnfilokake": "Google Docs Offline"
}
```

## Use Cases

### 1. **K-12 Chromebook Deployment**
```json
{
  "name": "Elementary School Assessment",
  "extensionControl": {
    "mode": "allowlist",
    "allowedExtensions": [
      "kohfgcgbkjodfcfkcackpagifgbcmimk",  // NaturalReader for reading support
      "ghbmnnjooekpmoecnnnilnnbdlolhkhi",  // Google Docs for writing
      "educational-math-extension-id"       // Subject-specific tools
    ]
  }
}
```

### 2. **Higher Education Testing**
```json
{
  "name": "University Exam Mode",
  "extensionControl": {
    "mode": "blocklist",
    "blockedExtensions": [
      "social-media-extension-id",
      "messaging-extension-id",
      "entertainment-extension-id"
    ]
  }
}
```

### 3. **Accessibility Accommodations**
```json
{
  "name": "IEP/504 Assessment Mode",
  "extensionControl": {
    "mode": "allowlist",
    "allowedExtensions": [
      "kohfgcgbkjodfcfkcackpagifgbcmimk",  // Text-to-speech
      "kimpkiocicogmepnmbjckplebgffcpba",  // Reading support
      "iopcbpdjglgphfmedjipbgjojdkgfpem"   // Writing assistance
    ]
  },
  "specialAccommodations": {
    "extendedTime": true,
    "audioInstructions": true,
    "screenReaderCompatible": true
  }
}
```

## Best Practices

### 1. **Configuration Management**
- Host configurations on the same domain as your trigger page
- Use descriptive names and version numbers
- Include metadata for documentation
- Test configurations before deployment

### 2. **Extension ID Discovery**
To find extension IDs:
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Find the extension ID in the extension card
4. Add to your configuration file

### 3. **Fallback Strategy**
```json
{
  "extensionControl": {
    "mode": "allowlist",
    "allowedExtensions": [
      // Always include essential Chrome extensions
      "nkeimhogjdpnpccoofpliimaahmaaome",
      "ghbmnnjooekpmoecnnnilnnbdlolhkhi"
    ]
  }
}
```

### 4. **Testing Workflow**
1. Create configuration file
2. Test with sample extensions installed
3. Verify expected extensions remain enabled/disabled
4. Check activity logs for verification
5. Deploy to production environment

## Security Considerations

### 1. **Configuration Validation**
- Extension validates all configuration schemas
- Invalid configurations fall back to default settings
- Malformed URLs are handled gracefully

### 2. **Extension Management Safety**
- Never disables the Freda Soft Lock Plus extension itself
- Skips system and admin-installed extensions
- Only manages user-installed extensions that can be safely disabled

### 3. **Restoration Guarantee**
- All disabled extensions are restored when security mode ends
- Original states are preserved and logged
- Failed restorations are reported for manual intervention

## Troubleshooting

### Common Issues

#### Configuration Not Loading
```
Error: Failed to load configuration from URL
```
**Solutions:**
- Verify URL is accessible and returns valid JSON
- Check CORS headers if loading from different domain
- Ensure configuration follows the required schema

#### Extensions Not Being Managed
```
Warning: Extension management had no effect
```
**Solutions:**
- Verify extension IDs are correct (32-character strings)
- Check that extensions are user-installed (not admin-forced)
- Ensure extensions are currently enabled and can be disabled

#### Permission Errors
```
Error: Extension management permission denied
```
**Solutions:**
- Verify Freda Soft Lock Plus has management permissions
- Check that Chrome policies don't prevent extension management
- Ensure running on supported Chrome version

### Debugging Tools

#### Activity Logs
The extension logs all configuration and extension management activities:
```javascript
// Get detailed logs
chrome.runtime.sendMessage(extensionId, { type: 'EXPORT_ACTIVITIES' }, (response) => {
  console.log('Extension management log:', response.data.activities);
});
```

#### Configuration Validation
```javascript
// Test configuration loading
chrome.runtime.sendMessage(extensionId, { 
  type: 'LOAD_CONFIGURATION',
  configurationUrl: 'https://your-domain.com/config.json'
}, (response) => {
  if (response.success) {
    console.log('Configuration loaded:', response.configuration);
  } else {
    console.error('Configuration failed:', response.error);
  }
});
```

## API Reference

### Extension Messages

#### Load Configuration
```javascript
{
  type: 'LOAD_CONFIGURATION',
  configurationUrl: 'https://example.com/config.json'
}
```

#### Activate with Configuration
```javascript
{
  type: 'ACTIVATE_SOFT_LOCK',
  triggerUrl: 'https://assessment-site.com',
  configurationUrl: 'https://assessment-site.com/configs/math-test.json'
}
```

#### Get Current Configuration
```javascript
{
  type: 'GET_CURRENT_CONFIGURATION'
}
```

### Response Format
```javascript
{
  success: true,
  configuration: { /* configuration object */ },
  configurationUrl: 'https://example.com/config.json',
  state: {
    isActive: true,
    managedExtensions: 5,
    allowedExtensions: 3
  }
}
```

## Support and Resources

- **Live Demo**: https://pratik-linearloop.github.io/trigger-page-freda/
- **Sample Configurations**: Available in the `/configs/` directory
- **Extension Management**: Automatic with detailed logging
- **Accessibility Compliance**: ADA, Section 508, WCAG 2.1 AA

This configuration system provides the flexibility needed for diverse educational environments while maintaining the security and monitoring capabilities essential for assessment integrity. 