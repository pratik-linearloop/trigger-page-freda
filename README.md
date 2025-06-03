# Vretta Assessment Platform - Secure Testing Environment

## Business-Ready Assessment Security Solution

A professional, enterprise-grade secure testing environment designed for educational institutions requiring comprehensive assessment security and integrity monitoring.

## Features

### 🔒 Security Features
- **Content Protection**: Complete blocking of copy, cut, paste operations
- **Tab Control**: Prevents new tabs and unauthorized navigation
- **Extension Management**: Temporary disabling of non-essential browser extensions
- **Focus Monitoring**: Tracks and logs focus violations
- **Chrome Help Me Write Protection**: Disables AI writing assistance
- **Right-Click Blocking**: Prevents context menu access
- **Developer Tools Prevention**: Blocks access to browser development tools

### 📝 Assessment Tools
- **Rich Text Editor**: Professional CKEditor with comprehensive formatting
- **Form Validation**: Real-time validation of required fields
- **Student Identification**: Secure student name and ID collection
- **Activity Logging**: Comprehensive monitoring and export capabilities

### 🎨 Professional Interface
- **Modern Design**: Clean, business-ready user interface
- **Responsive Layout**: Optimized for all device sizes
- **Status Indicators**: Clear visual feedback on security status
- **Professional Notifications**: User-friendly status messages

## Quick Start

1. **Install Extension**: Install the Vretta Soft Lock Plus browser extension
2. **Open Platform**: Navigate to the assessment platform page
3. **Enter Details**: Complete student name and ID fields
4. **Activate Security**: Click "Activate Secure Mode"
5. **Begin Assessment**: Use the provided text areas and rich text editor

## Security Activation Flow

```
Page Load → Extension Detection → Form Completion → Security Activation → Assessment Begin
```

## Technical Requirements

- **Browser**: Chrome/Edge with extension support
- **Extension**: Vretta Soft Lock Plus installed and enabled
- **Network**: Standard internet connection for CDN resources
- **JavaScript**: Must be enabled

## Usage Instructions

### For Students
1. Complete the student name and ID fields (required)
2. Click "Activate Secure Mode" to begin
3. Use the text areas to complete your assessment
4. Rich text editor available for formatted responses
5. Click "End Secure Session" when finished

### For Administrators
- Extension automatically manages security policies
- All student activity is logged and exportable
- Security violations are tracked and reported
- Browser extensions temporarily managed during sessions

## Security Policies

- **Standard Configuration**: Single, simplified security policy
- **Extension Allowlist**: Only essential Chrome extensions permitted
- **Content Protection**: All copy/paste operations blocked
- **Focus Tracking**: Window/tab switching monitored
- **AI Prevention**: Chrome Help Me Write feature disabled

## Support

For technical support or configuration assistance, contact your institution's IT department or Vretta support team.

## Version Information

- **Platform Version**: 2.0.0
- **Configuration**: Standard Business Profile
- **Last Updated**: 2024
- **Compatibility**: Chrome 90+, Edge 90+

# Vretta Assessment Platform - External Configuration System

## Dynamic Configuration Loading

The assessment platform now supports external configuration files that can be hosted alongside the trigger page. This allows for flexible control of browser extensions and security settings without modifying the extension itself.

## Configuration Files

### Available Configurations

1. **config-standard.json** - Default balanced security
2. **config-strict.json** - Enhanced security with minimal extension support
3. **config-ai-allowed.json** - Accessibility-friendly allowing AI text-to-speech tools

### Configuration Structure

```json
{
  "name": "Configuration Name",
  "version": "1.0.0",
  "description": "Configuration description",
  "extensionControl": {
    "mode": "allowlist",
    "allowedExtensions": ["extension-id-1", "extension-id-2"]
  },
  "assessmentSettings": {
    "allowNewTabs": false,
    "allowExtensionPages": false,
    "allowDeveloperTools": false,
    "strictMode": true,
    "focusEnforcement": true
  },
  "blockedExtensions": [
    {
      "id": "kohfgcgbkjodfcfkcackpagifgbcmimk",
      "name": "NaturalReader - AI Text to Speech",
      "reason": "AI tools not permitted in this assessment mode"
    }
  ]
}
```

## Extension Control Examples

### Standard Configuration
- **Purpose**: Balanced security for most assessments
- **Extension Policy**: Allows essential Google Workspace extensions
- **AI Tools**: Blocked (including NaturalReader)
- **Use Case**: Regular academic assessments

### Strict Configuration  
- **Purpose**: Maximum security for high-stakes testing
- **Extension Policy**: Only core Google Drive/Docs extensions
- **AI Tools**: All AI tools blocked
- **Additional**: YouTube and voice search disabled
- **Use Case**: Standardized tests, final exams

### AI-Allowed Configuration
- **Purpose**: Accessibility support for students with learning needs
- **Extension Policy**: Standard allowlist + AI text-to-speech tools
- **AI Tools**: NaturalReader and similar accessibility tools permitted
- **Use Case**: Students with accessibility accommodations

## Technical Implementation

### Web Page Integration

The trigger page sends the configuration URL to the extension:

```javascript
// Get selected configuration
const configFile = document.getElementById('configSelection').value;
const configUrl = window.location.origin + window.location.pathname.replace(/[^\/]*$/, '') + configFile;

// Activate with configuration
await window.vrettaSoftLockExtension.activateSoftLock(window.location.href, configUrl);
```

### Extension Processing

The extension fetches and applies the configuration:

```javascript
// Load external configuration
const response = await fetch(configUrl);
const configuration = await response.json();

// Apply extension control
for (const ext of extensions) {
  if (!configuration.extensionControl.allowedExtensions.includes(ext.id)) {
    await chrome.management.setEnabled(ext.id, false);
  }
}
```

## Deployment Options

### Option 1: Same Domain Hosting
```
https://school.edu/assessment/
├── index.html
├── config-standard.json
├── config-strict.json
└── config-ai-allowed.json
```

### Option 2: CDN Hosting
```javascript
const configUrl = "https://cdn.school.edu/configs/assessment-strict.json";
await activateSoftLock(currentUrl, configUrl);
```

### Option 3: Dynamic Configuration
```javascript
// Generate config URL based on assessment type
const assessmentType = getAssessmentType(); // "standard", "strict", "ai-allowed"
const configUrl = `${baseUrl}/config-${assessmentType}.json`;
```

## Security Benefits

1. **Centralized Control**: Configuration managed separately from extension
2. **Flexible Deployment**: Different configs for different assessment types
3. **Real-time Updates**: Configurations can be updated without extension changes
4. **Institution Control**: Schools can create custom configurations
5. **Audit Trail**: All configuration loading is logged

## NaturalReader Text-to-Speech Control

### Blocking (Standard/Strict Modes)
```json
"blockedExtensions": [
  {
    "id": "kohfgcgbkjodfcfkcackpagifgbcmimk",
    "name": "NaturalReader - AI Text to Speech",
    "reason": "AI text-to-speech tools not permitted during secure assessment"
  }
]
```

### Allowing (Accessibility Mode)
```json
"extensionControl": {
  "allowedExtensions": [
    "kohfgcgbkjodfcfkcackpagifgbcmimk"
  ]
},
"allowedExtensions": [
  {
    "id": "kohfgcgbkjodfcfkcackpagifgbcmimk",
    "name": "NaturalReader - AI Text to Speech",
    "reason": "Permitted for accessibility and learning support"
  }
]
```

## Configuration Selection UI

The assessment platform provides a dropdown to select configuration:

- **Standard Configuration (Default)** - Balanced security
- **Strict Mode (Enhanced Security)** - Maximum restrictions  
- **AI-Assisted (Accessibility)** - Supports text-to-speech tools

## Activity Logging

All configuration loading and extension management is logged:

```json
{
  "type": "configuration_loaded",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "details": {
    "configUrl": "https://school.edu/config-strict.json", 
    "configName": "Strict Assessment Configuration",
    "configVersion": "1.0.0"
  }
}
```

## Error Handling

- **Configuration Load Failure**: Falls back to default configuration
- **Invalid Configuration**: Uses default with error logging
- **Network Issues**: Graceful degradation to built-in settings
- **Permission Errors**: Extensions requiring admin rights are skipped

This system provides the flexibility requested for controlling 3rd party tools like NaturalReader while maintaining security and providing clear audit trails. 