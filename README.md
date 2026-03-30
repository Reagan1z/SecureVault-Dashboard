# SecureVault - Enterprise File Explorer

A high-performance, secure, and accessible "Cyber-Secure" file management dashboard built for industries requiring strict data integrity and compliance (Legal, Finance, IT Security).

## Project Overview

Per the SecureVault Inc. challenge, this dashboard replaces a legacy list view with a modern recursive tree navigation system, ensuring that enterprise clients can manage deeply nested document structures with precision and speed.

---

## Tech Stack & Constraints

1. **React**: Chosen for robust component abstraction and efficient DOM reconciliation.
2. **Pure CSS**: 100% hand-built layout and styling. **Zero component libraries** (no MUI, Chakra, or Bootstrap) to demonstrate master-level CSS layout and design token application.
3. **Context API**: Centralized state management for global selection, focus, and audit logging.

---

## Recursive Strategy

The core of this application is the **Recursive Selection Engine**.

- **Tree Rendering**: The `TreeNode` component uses a self-referencing pattern to render arbitrary depths of `data.json`.
- **State Optimization**: Instead of passing props deep, we use `FileContext` to track `collapsedIds`. This ensures that even in massive vaults, only the visible nodes are actively managed.
- **Path Traversal**: To support the breadcrumbs, a recursive `findPath` utility traverses the JSON vertically to calculate the exact ancestor chain for any given node ID in `O(n)` time.

---

## Wildcard Features ("Innovation Clause")

### 1. Forensic Audit Trail (Compliance & Integrity)

In high-security environments, knowing _who_ touched a file is as important as the file itself.

- **Impact**: Demonstrates that SecureVault is a professional security tool, not just a storage app.
- **Functionality**: A real-time timeline in the Properties Panel that logs "Chain of Custody" events (Decrypted, Shared, Downloaded) during the session, keeping a forensic record for the user.

---

## Keyboard Accessibility

Designed for power users who navigate via keyboard shortcuts:

- `Up/Down Arrows`: Smoothly move focus through all **currently visible** nodes in the tree.
- `Left/Right Arrows`: Instantly expand or collapse directory structures.
- `Enter`: Select the currently focused item to view its metadata.

---

## Design System (Figma)

**Design Link:** [Figma Design File - SecureVault Final Submission](https://www.figma.com/design/0Ihu5OsycheyJc1BOUbkri/Untitled?node-id=0-1&t=nG7VkeMokRyTqoPs-1)

The UI follows a **"Cyber-Secure" Dark Mode** aesthetic:

- **Primary Accent**: `#58A6FF` (Cyber Blue)
- **Backgrounds**: Deep paneling with glassmorphism borders (`rgba(255, 255, 255, 0.08)`)
- **Typography**: `Inter` for data density and `Manrope` for brand identity.

---

## Setup & Installation

1. Clone the repository.
2. Run `npm install` to install React and dependencies.
3. Run `npm run dev` to start the dashboard in development mode.
4. Open the link in your browser to experience the SecureVault Explorer.

---

_This project was completed as part of the SecureVault Frontend Engineering challenge. All components are custom implementations._
