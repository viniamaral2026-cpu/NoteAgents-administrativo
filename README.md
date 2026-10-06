# NoteAgents Administrativo

## Administrative Platform

**NoteAgents Administrativo** is the administrative dashboard and control panel for the NoteAgents ecosystem. This repository provides the administrative interface for managing the entire platform, including user management, project oversight, system configuration, and monitoring.

---

## 📋 Overview

This repository serves as the **administrative center** for the NoteAgents platform, offering:

- Project management and oversight
- User and organization management
- System configuration and settings
- Service and integration monitoring
- Audit and evidence review
- RBAC (Role-Based Access Control)
- System health and readiness monitoring
- Deployment and integration management

---

## 🏗️ Repository Structure

```
NoteAgents-administrativo/
├── .gitignore          # Git ignore configuration
├── next.config.mjs     # Next.js configuration
├── vercel.json         # Vercel deployment configuration
└── web/               # Administrative Web Application
    ├── app/           # App router pages and layouts
    ├── components/    # Reusable React components
    ├── hooks/         # Custom React hooks
    ├── lib/           # Utility functions and helpers
    ├── services/      # API services and integrations
    ├── styles/        # Styling and theming
    └── types/         # TypeScript type definitions
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/viniamaral2026-cpu/NoteAgents-administrativo.git
cd NoteAgents-administrativo

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 🔧 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Components**: React with shadcn/ui primitives
- **Styling**: Tailwind CSS
- **State Management**: React Context + Custom hooks
- **Deployment**: Vercel-optimized

---

## 📦 Available Features

Based on the codebase structure, the administrative panel includes:

- Dashboard with system overview
- Project management interface
- User and organization management
- Agent and skill configuration
- MCP integration management
- Audit and evidence review
- Readiness and health monitoring
- System settings and configuration
- RBAC and permissions management
- Integration and source management

---

## 🔗 Ecosystem Integration

This repository integrates with:

- **NoteAgents Core**: https://github.com/deevo-solucoes-finaceiras/NoteAgents
- **NoteAgents Dev**: https://github.com/deevo-solucoes-finaceiras/Noteagents-dev
- **NoteAgents Community**: https://github.com/deevo-solucoes-finaceiras/NoteAgents-comunidade

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests |

---

## 📜 License

The license definitive must be defined before the first public release.

---

## 🤝 Contributing

Please read the following before contributing:

- `GOVERNANCE.md` - Governance policies
- Project issues and pull requests follow the repository's contribution guidelines

See `ARCHITECTURAL-FREEZE-1.0.md` for architectural decisions that must be followed.