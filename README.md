# Co-Invoice

Co-Invoice is a modern invoice generator built with React and Tailwind CSS. It lets you create, customize, preview, and export professional invoices with real-time updates and flexible design options.

---

## Features

* 4 invoice templates: Modern, Classic, Bold, Minimal
* 30 Google Fonts (Serif, Sans Serif, Monospace)
* Accent color presets and custom color picker
* Company and client information management
* Dynamic line items with automatic calculations
* Tax, currency, and date configuration
* Real-time preview
* Dark mode editor
* Responsive layout (desktop and mobile)
* PDF and print export
* Local storage persistence

---

## Tech Stack

* React
* Vite
* Tailwind CSS
* shadcn/ui (Radix UI)
* Zustand
* Lucide React
* react-to-print

---

## Getting Started

### Prerequisites

* Node.js 16+
* npm

### Installation

```bash
git clone https://github.com/mraxays/co-invoice
cd co-invoice
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Usage

1. Add company and client details
2. Configure invoice number, dates, currency, and tax
3. Add line items
4. Customize template, fonts, and colors
5. Export as PDF or print

---

## Project Structure

```text
src/
├── components/
│   ├── invoice/
│   │   ├── forms/
│   │   └── templates/
├── lib/
├── store/
└── App.jsx
```

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
```

---

## License
This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.

You are free to:

- ✅ Use for personal projects
- ✅ Modify and adapt the code
- ✅ Share with others (with attribution)

You are NOT allowed to:

- ❌ Use for commercial purposes
- ❌ Sell or profit from this project

For details, see the [LICENSE](LICENSE.md) file or visit [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

---

## Contributing

Contributions are welcome. Fork the repo, create a feature branch, and submit a pull request.
