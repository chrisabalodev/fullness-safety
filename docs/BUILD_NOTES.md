## Build Configuration Notes

### Key Settings in next.config.js
- **Image Optimization**: Disabled (`images.unoptimized: true`)
  - Required for static exports
  - Add external domains if needed: `domains: ['your-cdn.com']`

- **Experimental Features**:
  ```javascript
  experimental: {
    serverActions: true, // Enable server-side actions
    optimizeServerReact: false, // Disabled for stability
    missingSuspenseWithCSRBailout: false
  }
  ```

- **TypeScript Handling**:
  ```javascript
  typescript: {
    ignoreBuildErrors: true // Temporary development setting
  }
  ```

### Recommended Build Commands
```bash
# Standard build
npm run build

# If needing static export (add output: 'export' to config):
npm run build && next export
```

### Deployment Considerations
1. For static hosting (GitHub Pages, S3):
   - Enable `output: 'export'` 
   - Set `trailingSlash: true`

2. For Node.js servers:
   - Keep serverActions enabled
   - Use `npm start` after build