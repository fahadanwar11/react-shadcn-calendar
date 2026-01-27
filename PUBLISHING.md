# Publishing Guide

This guide will help you publish your calendar package to npm.

## Pre-publish Checklist

1. **Update package.json**
   - Change `@your-username/react-shadcn-calendar` to your actual npm username/org
   - Update `author` field with your name
   - Update `repository` URL with your GitHub repo
   - Set appropriate `version` (start with 1.0.0 for first release)

2. **Create npm account** (if you don't have one)
   ```bash
   npm adduser
   ```

3. **Build the package**
   ```bash
   npm install
   npm run build
   ```

4. **Test locally before publishing**
   ```bash
   npm pack
   ```
   This creates a `.tgz` file that you can install in another project to test:
   ```bash
   npm install /path/to/your-username-react-shadcn-calendar-1.0.0.tgz
   ```

## Publishing to npm

### First-time publish

1. **Login to npm**
   ```bash
   npm login
   ```

2. **Publish the package**
   ```bash
   npm publish --access public
   ```
   
   Note: Use `--access public` if publishing a scoped package (@username/package-name)

### Publishing updates

1. **Update version**
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. **Publish**
   ```bash
   npm publish
   ```

## Git & GitHub Setup

1. **Initialize git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: React Shadcn Calendar package"
   ```

2. **Create GitHub repository** and push
   ```bash
   git remote add origin https://github.com/your-username/react-shadcn-calendar.git
   git branch -M main
   git push -u origin main
   ```

3. **Create a release tag**
   ```bash
   git tag v1.0.0
   git push --tags
   ```

## Best Practices

1. **Semantic Versioning**
   - MAJOR: Breaking changes
   - MINOR: New features (backwards compatible)
   - PATCH: Bug fixes

2. **Changelog**
   - Create a CHANGELOG.md to document changes
   - Follow [Keep a Changelog](https://keepachangelog.com/) format

3. **Testing**
   - Test in a real project before publishing
   - Consider adding automated tests

4. **Documentation**
   - Keep README updated
   - Add examples
   - Document breaking changes

## Troubleshooting

### Package name already exists
- Choose a different name or use a scoped package: `@your-username/package-name`

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors: `npx tsc --noEmit`

### Import errors in consumer projects
- Ensure `peerDependencies` are correct
- Check that exports in package.json match your file structure

## Useful Commands

```bash
# View package contents before publishing
npm pack --dry-run

# Check package metadata
npm view @your-username/react-shadcn-calendar

# Unpublish (within 72 hours of publishing)
npm unpublish @your-username/react-shadcn-calendar@1.0.0

# Check for outdated dependencies
npm outdated
```

## Next Steps

After publishing:
1. Share your package on social media, Reddit (r/reactjs), etc.
2. Add badges to README (npm version, downloads, etc.)
3. Create demo site with examples
4. Add to shadcn/ui community resources
5. Consider adding to awesome-react lists
