# Project Overview

This is a SvelteKit application for managing reminders. It's a single-page application (SPA) that uses TailwindCSS for styling and Svelte Runes for state management. The application is purely client-side, which means that the data is not persistent and will be lost on page refresh.

## Key Technologies

*   **Framework:** SvelteKit
*   **Styling:** TailwindCSS
*   **State Management:** Svelte Runes
*   **Forms:** sveltekit-superforms
*   **Validation:** zod

## Project Structure

*   `src/routes`: Contains the application's pages.
    *   `/`: The home page.
    *   `/reminders`: The main page for viewing reminders.
    *   `/reminders/new`: The page for creating a new reminder.
    *   `/reminders/[id]`: The page for viewing/editing a single reminder.
*   `src/lib`: Contains the application's components, stores, and utilities.
    *   `src/lib/components`: Contains the Svelte components.
    *   `src/lib/stores`: Contains the Svelte stores for managing application state.
    *   `src/lib/utils`: Contains utility functions and type definitions.

# Building and Running

## Prerequisites

*   Node.js
*   npm (or pnpm/yarn)

## Installation

```sh
npm install
```

## Running the Development Server

```sh
npm run dev
```

## Building for Production

```sh
npm run build
```

## Previewing the Production Build

```sh
npm run preview
```

# Development Conventions

## Code Style

This project uses Prettier for code formatting. To format the code, run:

```sh
npm run format
```

## Type Checking

This project uses TypeScript and svelte-check for type checking. To check for type errors, run:

```sh
npm run check
```
