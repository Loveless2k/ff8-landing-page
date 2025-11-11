# Security Plan
**Agent:** @security-architect  
**Feature:** Final Fantasy VIII Landing Page  
**Date:** 2025-11-11

---

## Constitution Analysis

**Stack:** Astro (Static Site Generation)  
**Backend:** No backend - fully static site  
**Deployment:** Static hosting (likely Vercel, Netlify, or similar)

**Risk Profile:** LOW (static site with no user input, no authentication, no database)

---

## Threat Model

### Attack Surface Analysis

**Assets:**
- Static HTML/CSS/JS files
- Character images and media assets
- GSAP animation library (third-party dependency)

**Potential Threats:**
1. **Supply Chain Attacks** - Compromised npm dependencies
2. **XSS via Third-Party Scripts** - Malicious code in GSAP or other libraries
3. **Content Injection** - If data files are ever user-editable
4. **Clickjacking** - Embedding site in malicious iframe
5. **Information Disclosure** - Exposing sensitive build information
6. **DDoS** - Overwhelming static hosting (mitigated by CDN)

**Threat Level:** LOW to MEDIUM (static site reduces most attack vectors)

---

## OWASP Top 10 Analysis (2021)

### A01: Broken Access Control
**Status:** ✅ NOT APPLICABLE  
**Reason:** No authentication, no user accounts, no protected resources  
**Action:** None required

---

### A02: Cryptographic Failures
**Status:** ✅ NOT APPLICABLE  
**Reason:** No sensitive data storage, no passwords, no PII  
**Action:** None required

---

### A03: Injection
**Status:** ⚠️ LOW RISK  
**Reason:** Static site with no database, but data files could be vulnerable if ever made dynamic

**Requirements:**
1. **Data Sanitization:** All character data in `src/data/characters.ts` MUST be treated as trusted, static content
2. **Astro Escaping:** Astro automatically escapes all dynamic content in templates - verify this is not bypassed
3. **No `set:html` Directive:** NEVER use Astro's `set:html` directive unless absolutely necessary and content is sanitized
4. **Validation:** If data files are ever loaded from external sources, they MUST be validated against TypeScript interfaces

**Validation Method:**
- Code review: Search for `set:html` usage
- Code review: Verify all data comes from static TypeScript files

---

### A04: Insecure Design
**Status:** ✅ SECURE BY DESIGN  
**Reason:** Static site architecture is inherently secure

**Requirements:**
1. **Static-First:** The site MUST remain static - no server-side rendering of user input
2. **No Client-Side Routing with User Input:** All navigation is hash-based or anchor links
3. **Content Security Policy:** Implement CSP headers (see A05)

---

### A05: Security Misconfiguration
**Status:** ⚠️ MEDIUM RISK  
**Reason:** Hosting configuration and HTTP headers are critical

**Requirements:**

1. **Content Security Policy (CSP):**
   ```
   Content-Security-Policy: 
     default-src 'self'; 
     script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; 
     style-src 'self' 'unsafe-inline'; 
     img-src 'self' data: https:; 
     font-src 'self' data:; 
     connect-src 'self'; 
     frame-ancestors 'none';
   ```
   - `frame-ancestors 'none'` prevents clickjacking
   - `script-src` allows GSAP from CDN (if used) or 'self' if bundled
   - `'unsafe-inline'` is required for Astro's inline scripts (minimize usage)

2. **Security Headers (to be configured in hosting platform):**
   ```
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: geolocation=(), microphone=(), camera=()
   ```

3. **HTTPS Only:**
   - The site MUST be served over HTTPS
   - HTTP requests MUST redirect to HTTPS
   - HSTS header MUST be enabled: `Strict-Transport-Security: max-age=31536000; includeSubDomains`

4. **Remove Sensitive Information:**
   - No `.env` files should be committed to Git
   - No API keys or secrets in source code (not applicable for this static site)
   - Remove source maps in production build

**Validation Method:**
- Use https://securityheaders.com to scan deployed site
- Verify CSP with browser DevTools
- Check for HTTPS redirect

---

### A06: Vulnerable and Outdated Components
**Status:** ⚠️ MEDIUM RISK  
**Reason:** Dependencies like GSAP, Astro, and Tailwind need regular updates

**Requirements:**

1. **Dependency Auditing:**
   - Run `npm audit` before every deployment
   - Fix all HIGH and CRITICAL vulnerabilities immediately
   - Review MODERATE vulnerabilities and fix if feasible

2. **Dependency Pinning:**
   - Use exact versions in `package.json` (no `^` or `~`)
   - Update dependencies intentionally, not automatically

3. **Subresource Integrity (SRI):**
   - If loading GSAP or any library from CDN, use SRI hashes:
     ```html
     <script 
       src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
       integrity="sha384-..."
       crossorigin="anonymous"
     ></script>
     ```

4. **Regular Updates:**
   - Review and update dependencies monthly
   - Subscribe to security advisories for Astro and GSAP

**Validation Method:**
- Run `npm audit` in CI/CD pipeline
- Use Dependabot or Renovate for automated dependency updates
- Verify SRI hashes if using CDN

---

### A07: Identification and Authentication Failures
**Status:** ✅ NOT APPLICABLE  
**Reason:** No authentication system  
**Action:** None required

---

### A08: Software and Data Integrity Failures
**Status:** ⚠️ LOW RISK  
**Reason:** Build process and deployment pipeline integrity

**Requirements:**

1. **Build Integrity:**
   - Use a CI/CD pipeline (GitHub Actions, Vercel, Netlify)
   - Verify build artifacts are not tampered with
   - Use signed commits (optional but recommended)

2. **Dependency Integrity:**
   - Use `package-lock.json` to ensure consistent builds
   - Verify npm packages with `npm audit signatures` (npm 8.15+)

3. **No Auto-Updates:**
   - Never use `npm update` in production builds
   - All updates must be reviewed and tested

**Validation Method:**
- Verify `package-lock.json` is committed to Git
- Review CI/CD pipeline configuration

---

### A09: Security Logging and Monitoring Failures
**Status:** ⚠️ LOW RISK  
**Reason:** Static site has minimal logging needs

**Requirements:**

1. **Error Monitoring (Optional):**
   - Consider using Sentry or similar for client-side error tracking
   - Log JavaScript errors to catch issues in production

2. **Analytics (Optional):**
   - If using analytics (Google Analytics, Plausible), ensure privacy compliance
   - Use privacy-focused analytics if possible

3. **No Sensitive Data in Logs:**
   - Ensure no user data is logged (not applicable for this static site)

**Validation Method:**
- Review analytics configuration for privacy compliance

---

### A10: Server-Side Request Forgery (SSRF)
**Status:** ✅ NOT APPLICABLE  
**Reason:** No server-side code, no API calls from server  
**Action:** None required

---

## Additional Security Requirements

### 1. Git Security

**Requirements:**
- Never commit `.env` files or secrets
- Use `.gitignore` to exclude sensitive files
- Review all commits for accidental secret exposure
- Use `git-secrets` or similar tools to prevent secret commits

**Validation Method:**
- Review `.gitignore` file
- Scan repository with `truffleHog` or `git-secrets`

---

### 2. Deployment Security

**Requirements:**
- Use a reputable static hosting provider (Vercel, Netlify, Cloudflare Pages)
- Enable automatic HTTPS
- Configure security headers in hosting platform
- Use a CDN for DDoS protection
- Enable branch previews for testing before production

**Validation Method:**
- Verify hosting platform security settings
- Test preview deployments before merging to main

---

### 3. Asset Security

**Requirements:**
- All images MUST be optimized and scanned for malware (unlikely but good practice)
- No executable files should be in the `public/` directory
- Verify all assets are from trusted sources

**Validation Method:**
- Review all files in `public/` and `src/assets/`
- Use `clamscan` or similar to scan for malware (optional)

---

## Security Checklist for Deployment

Before deploying to production, verify:

- [ ] All dependencies are up-to-date and audited (`npm audit`)
- [ ] Security headers are configured (CSP, X-Frame-Options, HSTS)
- [ ] HTTPS is enabled and HTTP redirects to HTTPS
- [ ] No `.env` files or secrets in Git repository
- [ ] Source maps are disabled in production build
- [ ] SRI hashes are used for any CDN-loaded scripts
- [ ] `package-lock.json` is committed and up-to-date
- [ ] Site has been scanned with https://securityheaders.com
- [ ] No `set:html` or dangerous directives in Astro components
- [ ] All images are from trusted sources and optimized

---

## Validation Commands

```bash
# Audit dependencies
npm audit

# Check for secrets in Git history
git secrets --scan-history

# Build for production
npm run build

# Preview production build
npm run preview

# Test security headers (after deployment)
curl -I https://your-site.com
```

---

## Security Incident Response

**If a vulnerability is discovered:**

1. **Assess Impact:** Determine if the vulnerability affects the deployed site
2. **Patch Immediately:** Update dependencies or fix code
3. **Rebuild and Redeploy:** Deploy patched version ASAP
4. **Notify Users (if applicable):** If user data was affected (unlikely for static site)
5. **Post-Mortem:** Document what happened and how to prevent it

---

## Risk Summary

| Risk Category | Level | Mitigation |
|---------------|-------|------------|
| Injection | LOW | Astro auto-escaping, static data |
| XSS | LOW | No user input, CSP headers |
| Clickjacking | LOW | X-Frame-Options: DENY |
| Supply Chain | MEDIUM | npm audit, SRI, dependency pinning |
| Misconfiguration | MEDIUM | Security headers, HTTPS |
| Data Breach | NONE | No sensitive data |

**Overall Risk Level:** LOW

---

**Status:** ✅ Plan Complete  
**Compliance:** Aligned with OWASP Top 10 and security best practices for static sites

