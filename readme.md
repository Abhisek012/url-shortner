# URI - Fast, Secure & Free URL Shortener

URI is a full-stack URL shortener application engineered to convert long, complex web addresses into clean, manageable links. It features one-click clipboard copying with visual confirmation, QR code generation and download, browser-based history tracking, and dark/light mode themes.

---

## Key Features

| Category | Feature | Description |
|---|---|---|
| **Shortening** | NanoID Generation | Creates unique, collision-resistant 8-character identifiers stored in MongoDB. |
| **User Experience** | One-Click Copy | Copies the short URL to the clipboard; the button turns green with "Copied" text for 2 seconds. |
| **Offline Sharing** | QR Code Generator | Produces high-resolution QR codes that can be scanned or downloaded as PNG images. |
| **Persistence** | Local History | Automatically stores recently created links in `localStorage` with search and deletion capabilities. |
| **Interface** | Dual Theme Support | Includes Light Mode (White & Red) and Dark Mode (Black & Orange) with instant switching. |
| **Security** | Protocol Validation | Validates incoming URLs against strict HTTP/HTTPS protocol standards to block malicious inputs. |
| **Analytics** | Redirect Tracking | Tracks total click counts per URL using Mongoose schema counters. |

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19, Vite | Core user interface, reactive state management, and asset bundling |
| **Styling** | Modern CSS3 | Custom properties, design tokens, responsive layout, glassmorphism |
| **Icons** | SVG Components | Lightweight, scalable vector icons without third-party dependencies |
| **Backend** | Node.js, Express.js 5 | REST API server, routing, and controller execution |
| **Database** | MongoDB Atlas, Mongoose | Cloud document database, schemas, and object data modeling |
| **Identifier** | NanoID | Secure, URL-friendly unique identifier generator |
| **Networking** | CORS | Cross-Origin Resource Sharing middleware for multi-domain communication |

---

## Project Structure

```text
URL-shortner/
├── BACKEND/
│   ├── SRC/
│   │   ├── config/          # Database configuration and connection setup
│   │   ├── controller/      # HTTP request handling and response dispatch
│   │   ├── dao/             # Data Access Objects (direct database operations)
│   │   ├── middleware/      # Error handling middleware
│   │   ├── models/          # Mongoose database schemas
│   │   ├── routes/          # Express API route declarations
│   │   ├── services/        # Business logic and URL validation rules
│   │   └── utils/           # NanoID generation utility
│   ├── .env                 # Backend environment configuration
│   ├── app.js               # Application entry point
│   └── package.json
│
├── FRONTEND/
│   ├── public/              # Static assets and custom SVG favicon
│   ├── src/
│   │   ├── components/      # UI elements (Navbar, Hero, RecentLinks, QrModal, FAQ, Footer)
│   │   ├── App.jsx          # Main application component and theme state
│   │   ├── App.css          # Component and layout styling
│   │   ├── index.css        # Base stylesheet and theme color variables
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js       # Vite build and proxy settings
│
└── readme.md
```

---

## Request Flow

```text
React (Client)
   │  POST /api/create { url }
   ▼
Express Router (shorturl.route.js)
   │
   ▼
Controller (shorturl.controller.js)
   │
   ▼
Service (shorturl.services.js) ──► generateNanoId()
   │
   ▼
DAO (shorturl.js)
   │
   ▼
Mongoose Model (shorturl.model.js) ──► MongoDB Atlas
```

---

## Local Development Setup

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB Atlas connection string or local MongoDB instance

### Step 1: Clone the Repository
```bash
git clone https://github.com/Abhisek012/url-shortner.git
cd url-shortner
```

### Step 2: Configure and Start Backend
```bash
cd BACKEND
npm install
```

Create a `.env` file inside the `BACKEND` folder:
```env
MONGO_URI="your_mongodb_connection_string"
APP_URL=http://localhost:3000/
PORT=3000
```

Start the backend:
```bash
npm run dev
```

### Step 3: Configure and Start Frontend
Open a separate terminal:
```bash
cd FRONTEND
npm install
npm run dev
```

Access the frontend application at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `POST` | `/api/create` | `{ "url": "https://example.com" }` | Validates destination URL, generates short ID, stores record, and returns the short link |
| `GET` | `/:id` | None | Looks up target URL by short ID, increments click counter, and redirects client |

---

## Deployment Configuration

| Component | Recommended Platform | Configuration Settings | Environment Variables |
|---|---|---|---|
| **Backend** | Render / Railway | Root directory: `BACKEND`<br>Build: `npm install`<br>Start: `npm start` | `MONGO_URI`<br>`APP_URL=https://your-backend.onrender.com/` |
| **Frontend** | Vercel | Root directory: `FRONTEND`<br>Framework: `Vite`<br>Build: `npm run build` | `VITE_API_URL=https://your-backend.onrender.com` |

---

## Author and Project Links

| Platform | Details | Link |
|---|---|---|
| **GitHub Repository** | Source code and issue tracking | [url-shortner](https://github.com/Abhisek012/url-shortner.git) |
| **Developer Profile** | Abhisek Prusty | [GitHub Profile](https://github.com/Abhisek012) |
| **Twitter / X** | Social updates | [@Abhip44](https://x.com/Abhip44) |
| **Email** | Contact | [abhisekprusty018@gmail.com](mailto:abhisekprusty018@gmail.com) |

---

## License

This project is licensed under the [ISC License](LICENSE).
