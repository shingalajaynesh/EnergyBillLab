# Security Policy

Energy Bill Lab takes the security of our application, API infrastructure, user data, and electricity utility calculation models seriously.

## Supported Versions

We provide security updates and patches for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

If you believe you have discovered a security vulnerability in Energy Bill Lab, please report it privately to our security maintainers:

- **Email**: [contact@energybilllab.com](mailto:contact@energybilllab.com)
- **Response Time**: We aim to acknowledge vulnerability reports within **48 hours** and provide periodic updates on progress until resolved.

### What to Include in Your Report

To help us investigate and triage your report efficiently, please include:

1. **Description**: A clear summary of the vulnerability.
2. **Impact**: Expected potential security or privacy impact.
3. **Reproduction Steps**: Step-by-step instructions or proof-of-concept script.
4. **Environment**: Web browser, operating system, or API endpoint affected.
5. **Mitigation**: Any suggested patch or remediation steps, if known.

## Security Practices & Rules

- **Zero Secret Exposure**: We never commit database credentials, EIA API keys, private tokens, or session secrets into source control.
- **Frontend Isolation**: Backend secrets and API credentials are kept strictly server-side and are never prefixed with `NEXT_PUBLIC_`.
- **Public Methodology**: All electricity rate calculation algorithms, data sources, and state averages are public, audited, and deterministic.
