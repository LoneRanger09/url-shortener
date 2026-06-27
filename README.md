# 🌐 Modern Brutalist URL Shortener

A high-performance, responsive URL shortener application built with a **React (Vite + TailwindCSS)** frontend and an **Express (Node.js)** backend, backed by **Firebase Firestore** for persistent storage and secure **JWT authentication**.

Designed with a sleek, minimalist, monospaced brutalist aesthetic that prioritizes content, data clarity, and ultra-fast page load times.

---

## ✨ Features

- **Anonymous Shortening:** Anyone can instantly shorten long URLs from the homepage.
- **User Accounts:** Secure registration & login powered by **bcryptjs** and **JSON Web Tokens (JWT)**.
- **Link Management Dashboard:** Authenticated users can view their created links, track total redirect clicks, and monitor click statistics.
- **High-Speed Redirection:** Efficient server-side redirection (301 Permanent Redirect) using Firestore index keys.
- **Seamless Copy-to-Clipboard:** Quick copy button with transient feedback state.
- **Minimalist Brutalist UI:** Styled with **TailwindCSS v4**, featuring an elegant pixel-grid pattern, technical design layout markers, and clean typography with *Space Grotesk* and *Space Mono* fonts.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Styling:** TailwindCSS v4
- **Router:** React Router DOM (v7)
- **API Client:** Axios (proxied to API server)

### Backend
- **Framework:** Express (Node.js)
- **Database:** Google Cloud Firebase / Firestore (via Firebase Admin SDK)
- **Security:** bcryptjs, JSON Web Tokens (JWT)
- **Utilities:** nanoid, valid-url

---

## 📂 Project Structure

```
url-shortener/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Common UI Components (Navbar, PrivateRoute, Spinner)
│   │   ├── context/            # AuthContext (State Management)
│   │   ├── pages/              # Page Views (HomePage, Dashboard, Login, Register)
│   │   ├── services/           # Axios API Client Modules (authService, linkService, apiService)
│   │   ├── App.jsx             # Main App Shell & Router
│   │   ├── index.css           # Global CSS and Brutalist Theme Settings
│   │   └── main.jsx            # Entry Point
│   ├── vite.config.js          # Vite Config (includes backend API proxy)
│   └── package.json
│
├── config/                     # Firebase Init & Config
├── controllers/                # Request Handlers (auth, links, urls)
├── middleware/                 # Auth Guards & Global Error Handlers
├── models/                     # Firestore Collection Validators
├── routes/                     # Router Mappings
├── server.js                   # Express App Entry Point
├── .env                        # Environment Configuration
├── serviceAccountKey.json      # Firebase Admin Credentials
└── package.json
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **Firebase Project:** A Firebase project with Firestore database initialized in Native mode.

### 2. Configuration Setup

#### Backend Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
BASE_URL=http://localhost:5000
JWT_SECRET=your_super_secret_jwt_key_here
```

#### Firebase Credentials
1. Navigate to the Firebase Console -> **Project Settings** -> **Service accounts**.
2. Click **Generate new private key** and download the JSON file.
3. Rename the downloaded file to `serviceAccountKey.json` and place it in the root directory.

---

### 3. Installation & Run

#### Run the Backend Server
From the root directory:
```bash
# Install server dependencies
npm install

# Start server in development mode (with nodemon)
npm run dev
```

#### Run the Frontend Client
From a separate terminal window, navigate to the `client/` directory:
```bash
# Navigate to client
cd client

# Install client dependencies
npm install

# Start the Vite dev server
npm run dev
```

The frontend will run on `http://localhost:5173/`, and Vite will automatically proxy API calls to the backend on `http://localhost:5000/`.

---

## 📡 API Reference

### 🔐 Authentication

#### Register a New User
* **Endpoint:** `POST /api/auth/register`
* **Access:** Public
* **Request Body:**
```json
{
  "name": "Arnav Vats",
  "email": "user@example.com",
  "password": "strongpassword123"
}
```

#### Login User
* **Endpoint:** `POST /api/auth/login`
* **Access:** Public
* **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword123"
}
```
* **Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🔗 Link & Shortening Operations

#### Create Short URL
* **Endpoint:** `POST /api/shorten`
* **Access:** Public / Private (Include header `x-auth-token` if logged in to link the URL to your account)
* **Request Body:**
```json
{
  "longUrl": "https://www.google.com/search?q=open+source+url+shorteners"
}
```
* **Response:**
```json
{
  "success": true,
  "data": {
    "longUrl": "https://www.google.com/search?q=open+source+url+shorteners",
    "shortUrl": "http://localhost:5000/xYz89Ab",
    "urlCode": "xYz89Ab",
    "user": "optional-user-id"
  }
}
```

#### Get User's Created Links
* **Endpoint:** `GET /api/links/my-links`
* **Access:** Private (Requires header `x-auth-token`)
* **Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "longUrl": "https://www.google.com",
      "shortUrl": "http://localhost:5000/aBc12De",
      "urlCode": "aBc12De",
      "clicks": 14,
      "date": "2026-06-27T04:45:00.000Z"
    }
  ]
}
```

#### Redirect Short Code
* **Endpoint:** `GET /:code`
* **Access:** Public
* **Action:** Automatically increments clicks counts and performs a permanent `301` redirect to the target `longUrl`.

---

## 🔒 Security & Best Practices
- **Password Protection:** User passwords are encrypted using `bcryptjs` using a salt work factor of 10 prior to storage.
- **Stateless Session Tokens:** Client authentication status is validated server-side on every request using JWT middleware guards.
- **Input Validation:** Backend validation on incoming long URLs checks for active URI formatting to prevent database contamination.