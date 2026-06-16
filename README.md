<div align="center">

# 🌿 Branch Reaper

> **Interactively sweep your repository for dead local Git branches and mass-delete them.**

[![npm version](https://badge.fury.io/js/branch-reaper.svg)](https://www.npmjs.com/package/branch-reaper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

```text
    ██████╗ ██████╗  █████╗ ███╗   ██╗ ██████╗██╗  ██╗    ██████╗ ███████╗ █████╗ ██████╗ ███████╗██████╗ 
    ██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔════╝██║  ██║    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
    ██████╔╝██████╔╝███████║██╔██╗ ██║██║     ███████║    ██████╔╝█████╗  ███████║██████╔╝█████╗  ██████╔╝
    ██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══██║    ██╔══██╗██╔══╝  ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗
    ██████╔╝██║  ██║██║  ██║██║ ╚████║╚██████╗██║  ██║    ██║  ██║███████╗██║  ██║██║     ███████╗██║  ██║
    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
```

Every developer has a graveyard of 50+ local Git branches (`fix-header`, `test-123`, `old-feature`) that they forgot to delete.

**Branch Reaper** is a beautiful, interactive CLI that scans your git repository, color-codes your local branches by age (highlighting ancient ones in red), and lets you safely mass-delete them in seconds.

## ✨ Features

- **🕒 Smart Age Detection:** Sorts your branches by last commit date and color-codes them (e.g. `2 years ago` is marked red).
- **🛡️ Safety First:** Prevents you from deleting your current active branch.
- **⚡ Mass Deletion:** Interactively select as many branches as you want using the Spacebar, or press `a` to select them all.
- **🎨 Premium UX:** Built with `inquirer` to ensure bulletproof scrolling, custom ASCII art, and satisfying UI feedback.

## 🚀 Installation

Run it instantly anywhere without installing:

```bash
npx branch-reaper
```

Or install it globally:

```bash
npm install -g branch-reaper
```

## 🎮 Usage

Navigate to any git repository and run:

```bash
branch-reaper
```

### Controls:
- **`↑ / ↓`** : Navigate the list of branches.
- **`Space`** : Select branches to delete.
- **`a`** : Select ALL branches.
- **`i`** : Invert selection.
- **`Enter`** : Proceed to deletion.

---

### Architected by [@lakshanmuruganandam](https://github.com/lakshanmuruganandam)
*Because nobody needs that `test-final-final-2` branch from 2023.*
