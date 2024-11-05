# Accessibility Report Generator (ARG)

The Accessibility Report Generator (ARG) is an accessibility testing tool that analyzes multiple URLs for compliance with WCAG standards and best practices. ARG provides comprehensive accessibility reports, with features designed for developers, testers, and content creators to identify and address accessibility issues. The tool leverages **Axe Core v4.4.1** for server-side testing to prevent recursion depth issues and **Axe Core v4.10.0** for client-side bookmarklets, ensuring broad compatibility and performance optimization.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Bookmarks](#bookmarks)
- [Contributing](#contributing)

---

## Overview

ARG provides accessibility reports for URLs in an organized format with interactive dropdowns for each URL. The tool includes retry functionality for error-prone URLs and print-friendly views of reports.

### Versions and Compatibility

- **Axe Core v4.4.1** for `server.js`: This version prevents stack overflow errors on larger or more complex pages, which were encountered with v4.10.0.
- **Axe Core v4.10.0** for Bookmarklets: The latest version supports robust rule sets for more comprehensive page-level analysis.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sehaj97/ARG.git
   cd ARG
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

The application will start on `http://localhost:3000` by default.

---

## Usage

1. **Enter URLs**: Add multiple URLs in the textarea, one per line.
2. **Generate Report**: Click "Generate Report" to analyze the URLs for accessibility issues.
3. **View Results**:
   - Organized in categories: URLs with Issues, URLs with No Issues, and URLs with Errors.
   - Interactive dropdowns and links for each URL.
4. **Re-run Analysis**: Retry only the URLs that encountered errors.
5. **Print Report**: Click "Print Report" to expand all dropdowns and format the page for printing.

---

## Features

- **URL Analysis with Timer**: Tracks the time taken to analyze all URLs.
- **Error Handling and Retry**: Re-run analysis for URLs that encountered errors.
- **Dynamic Textarea Resizing**: Expands based on input.
- **Print-Ready Report**: Expands dropdowns and prepares a print-friendly view.
- **Grid Summary and Dropdowns**: Organizes results with icons and counts for easy viewing.

---

## Configuration

- **Server Port**: Default is `3000`. Change by setting the environment variable:

  ```bash
  PORT=your_port_number
  ```

- **API Endpoint**:
  - Use `/analyze-multiple` for testing via API by sending a POST request with an array of URLs.

---

## Bookmarks

The `ARG-Bookmarks` folder contains two bookmarklet files, each with a minified version:

1. **ARG-issues-only.js**: Runs Axe Core v4.10.0 to detect and highlight only issues on the page.
2. **ARG-fullreport.js**: Runs a full Axe Core v4.10.0 analysis, categorizing results as Violations, Passes, Incomplete, and Inapplicable items.

**How to Use**:

- Drag the bookmarklet files to the bookmarks bar to run accessibility checks on any web page.

---

## Contributing

1. Fork the project.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

### Developer Notes

- **server.js**: The core server-side testing logic uses **Axe Core v4.4.1** to avoid stack overflow issues with larger pages, ensuring stable and efficient testing.
- **index.html**: The front-end UI, providing the main workflow for generating accessibility reports.
- **Expandable Textarea**: Auto-resizes on report generation for optimal UX.
- **Grid Summary**: Displays URL analysis counts and elapsed time.

For any issues, please reach out to the repository maintainers.
