# Accessibility Report Generator (ARG) & Accessibility Quality User-first Assurance (AQUA)

**ARG (Accessibility Report Generator)** and **AQUA (Accessibility Quality User-first Assurance)** join forces to provide an all-in-one solution for making the web accessible to everyone. These tools empower developers, testers, and content creators to identify, analyze, and resolve accessibility issues with ease.

- **ARG**: Analyze multiple URLs in bulk and generate detailed accessibility reports.
- **AQUA**: Perform real-time, on-page debugging with interactive tools like ARIA label highlighters and image alt-text checkers.

Together, ARG and AQUA ensure compliance with accessibility standards and foster an inclusive web experience.

---

## Table of Contents

1. [Features](#-arg-features)
2. [Bookmarklets: AQUA Features](#-bookmarklets-aqua-features)
3. [Installation](#-installation)
4. [Usage](#-usage)
5. [Configuration](#-configuration)
6. [AQUA Bookmarklets](#-aqua-bookmarklets)
7. [User Interface](#-user-interface)
8. [Contributions](#-contributions)
9. [Acknowledgments](#-acknowledgments)
10. [Versions and Compatibility](#-versions-and-compatibility)
11. [Live Deployment](#-live-deployment)
12. [License](#-license)

## 🚀 ARG Features

- **Multi-URL Bulk Analysis**: Test accessibility for numerous URLs in one go.
- **Comprehensive Reporting**:
  - Categorized insights: Violations, No Issues, Errors, and Manual Checks.
  - Drill-down views for each issue, complete with descriptions and solutions.
- **Interactive Client Tools**: AQUA Bookmarklet for real-time, on-page accessibility checks.
- **Error Handling**: Retry functionality for failed URLs.
- **Performance Tracking**: Built-in timer to track analysis speed.
- **Customizable Views**: Expand all, collapse all, or toggle specific sections for reports.
- **Print & Share**: Generate print-friendly reports for sharing or documentation.

---

## 🌈 Bookmarklets: AQUA Features

AQUA provides interactive tools directly in your browser to improve accessibility:

1. **Highlight ARIA Labels**: Identify ARIA attributes with hover tooltips or inline annotations.
2. **Run Axe Checks**: Perform on-page accessibility audits instantly.
3. **Image Alt Tag Checker**: Verify image alt texts, formats, and fallbacks.
4. **Form Accessibility**: Evaluate forms for ARIA labels, ARIA-labelledby attributes, and other vital accessibility features.

Use AQUA to visually understand and debug accessibility issues without leaving your webpage.

---

## 📦 Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/sehaj97/ARG.git
   cd ARG
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Application**:

   ```bash
   npm run start
   ```

4. **Access the App**: Open `http://localhost:3000` in your browser.

---

## 💻 Usage

1. **Enter URLs**: Add multiple URLs into the text area (one URL per line).
2. **Analyze**: Click the "Generate Report" button.
3. **View Results**:
   - Explore categories: No Issues, Violations, and Errors.
   - Drill down into detailed views for each issue.
4. **Retry Failed URLs**: Re-run the analysis for any URLs with errors.
5. **Print Reports**: Generate a print-friendly version of your report.

---

## 🔧 Configuration

- **Server Port**: Default is `3000`. Change by setting the `PORT` environment variable:

  ```bash
  PORT=your_port_number
  ```

- **API Endpoint**: Use `/analyze-multiple` for testing via API. Send a POST request with a JSON payload containing URLs.

---

## 🌟 AQUA Bookmarklets

1. **Setup**:

   - Minify the `aqua.js` file using an online minifier.
   - Create a new browser bookmark with the prefix `javascript:` followed by the minified code.

2. **Activate**: Click on the bookmarklet while on any webpage to:
   - Highlight ARIA labels.
   - Run accessibility audits.
   - Check image alt tags and formats.
   - Validate form ARIA attributes.

---

## 🎨 User Interface

The ARG web interface is designed with user-friendliness in mind:

- **Dynamic Input Fields**: Resizable text area for URL input.
- **Real-Time Stats**: Track the total URLs scanned, issues found, and time taken.
- **Interactive Dropdowns**: Expand or collapse sections for detailed results.
- **Grid Summary**: Get an at-a-glance view of accessibility status.
- **Dark-Themed Design**: Sleek, modern, and easy on the eyes.

---

## 🤝 Contributions

We welcome contributions to make ARG even better! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

---

## 📚 Acknowledgments

Special thanks to the tools and libraries that power ARG:

- [Puppeteer](https://pptr.dev/) for browser automation.
- [Axe-core](https://github.com/dequelabs/axe-core) for accessibility testing.
- [Express](https://expressjs.com/) for the web server framework.

---

## Versions and Compatibility

- **Axe Core v4.4.1** for server.js: This version prevents stack overflow errors on larger or more complex pages, which were encountered with v4.10.0.
- **Axe Core v4.10.0** for Bookmarklets: The latest version supports robust rule sets for more comprehensive page-level analysis.

## 🌐 Live Deployment

ARG is deployed on **Heroku**. Access the tool live at:

[**Accessibility Report Generator on Heroku**](https://arg-59e796a7daaf.herokuapp.com/)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

**Let’s make the web accessible for everyone, one URL at a time! 🌍**
