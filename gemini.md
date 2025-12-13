# Project Context: Physiotherapist Portfolio

This project is a personal portfolio website for a physiotherapist, built with a modern frontend stack emphasizing visual appeal and user experience.

## Technology Stack

*   **Frontend Framework:** React (v19)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (v4) with extensive customization for glassmorphism and neon effects, supplemented by custom CSS in `src/styles.css`.
*   **Data Management:** Local JavaScript files (`.js`) within the `src/data` directory for content like education, experience, and reviews.
*   **Animations:** Animate On Scroll (AOS) library for scroll-triggered animations.

## Project Structure and Key Components

The application follows a component-based architecture, with reusable UI elements located in `src/components`.

### Main Application Flow (`src/App.jsx`)

The `App.jsx` component is the root of the application, orchestrating the display of major sections:

*   **`Hero.jsx`**: The introductory section, displaying the physiotherapist's summary and a carousel of patient case studies.
*   **`Experience.jsx`**: Details the physiotherapist's professional journey and expertise.
*   **`Education.jsx`**: Outlines academic background and qualifications.
*   **`Reviews.jsx`**: Showcases patient testimonials and feedback.
*   **`Footer.jsx`**: Contains contact information and social links.

### Core UI Components (`src/components/`)

*   **`NavBar.jsx`**: Desktop navigation bar with active section highlighting and social links.
*   **`MobileNavBar.jsx`**: Responsive navigation bar for mobile devices, including hero section controls.
*   **`ThemeSwitcher.jsx`**: Allows users to toggle between light and dark themes.
*   **`Carousel.jsx`**: Used for displaying featured reviews.
*   **`PatientCaseCarousel.jsx`**: Displays individual patient case studies within the Hero section.
*   **`PatientDetailsModal.jsx`**: A modal component to show detailed information about a selected patient case, including images and videos of treatment progress.

### Data Management (`src/data/`)

Static content is managed through dedicated JavaScript files:

*   `educationData.js`: Stores educational qualifications.
*   `experienceData.js`: Contains professional experience details.
*   `patientsData.js`: Holds information about patient case studies, including images and videos.
*   `reviewData.js`: Contains patient testimonials.
*   `summaryData.js`: Provides general profile information for the physiotherapist (e.g., name, bio, social links).
*   `uiLayout.json`: Potentially holds UI layout or theme-related configurations.

## Styling and Theming

The project heavily relies on Tailwind CSS for utility-first styling. The `tailwind.config.cjs` file defines a custom color palette, font families (`Poppins` for headings, `Inter` for body text), and custom utilities.

The `src/styles.css` file extends Tailwind with global styles and custom classes to achieve specific visual effects:

*   **Glassmorphism:** Achieved through `backdrop-filter` and transparent backgrounds with borders (`.glass-card`, `.solid-glass-nav`, `.solid-glass-pill`).
*   **Neon Effects:** Implemented with `box-shadow` and `text-shadow` for glowing elements (`.neon-glow`, `.neon-text`).
*   **Gradients:** Custom gradient definitions are used for text and backgrounds (`.gradient-text`, `--gradient-primary-light/dark`).
*   **Theming:** A `ThemeContext` (`src/context/ThemeContext.jsx`) is implemented to manage light and dark mode, dynamically applying CSS variables defined in `src/styles.css`.

## Overall Purpose

The portfolio aims to present the physiotherapist's professional information, expertise, and patient success stories in an engaging and visually modern manner. The use of interactive elements like carousels and modals enhances the presentation of patient case studies and testimonials.