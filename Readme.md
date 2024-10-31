# Accessibility Report Generator (ARG)

The Accessibility Report Generator (ARG) is a tool that allows users to check the accessibility of multiple URLs by generating detailed reports, including issues found on each page. It displays results in an organized, easy-to-read format with interactive dropdowns for individual URLs, and provides options to re-run tests for URLs that encountered errors.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Contributing](#contributing)

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

The application will start on `http://localhost:3000` by default.

---

## Usage

1. **Enter URLs**: Add multiple URLs in the textarea, one per line.
2. **Generate Report**: Click "Generate Report" to analyze the URLs for accessibility issues.
3. **View Results**: Results are displayed in categories with dropdowns for:
   - URLs with Issues
   - URLs with No Issues
   - URLs with Errors
4. **Re-run Analysis**: If some URLs encountered errors, a "Re-run Analysis" button will allow users to re-test only those URLs.
5. **Print Report**: Click "Expand All & Print" to open all dropdowns and prepare the page for printing.

---

## Features

- **Interactive URL Testing**: Tests each URL independently, displaying results with icons and dropdowns.
- **Timer**: Shows the total time elapsed during the test.
- **Result Sorting**: Categorizes results by issues, no issues, and errors.
- **Retry Option**: Allows re-testing for URLs that encountered errors.
- **Expandable Textarea**: Automatically resizes with content when the "Generate Report" button is clicked.
- **Print Feature**: Opens all dropdowns and generates a print-ready format for reports.

---

## Configuration

- **Server Port**: By default, the server runs on port `3000`. Change it by setting the environment variable:
  ```bash
  PORT=your_port_number
  ```
- **Testing URLs**: Send URLs to `/analyze-multiple` endpoint in a POST request with a JSON payload containing an array of URLs.

---

## Contributing

1. Fork the project.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Please ensure your code adheres to the repository's style guidelines.

---

### Developer Notes

- The main file is `index.html`, which uses JavaScript to call the `/analyze-multiple` API endpoint.
- The `checkButton` triggers the main accessibility testing workflow, sorting and displaying results by URL.
- Results are organized with categories (`issues`, `noIssues`, `errors`) and formatted for readability.
- You can expand the `textarea` dynamically only when needed, as defined in the JavaScript.
- The "Print Report" feature expands all dropdowns and initiates `window.print()` for a print-friendly view.

For any issues, please reach out to the repository maintainers (That's me, Sehaj)

---
