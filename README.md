# MERN Job Postings

A full-stack job posting application built with the MERN stack (MongoDB, Express, React, Node.js).

---

🚀 **Live Demo:** [https://zero1-mern-job-posting.onrender.com/](https://zero1-mern-job-posting.onrender.com/)

- **Admin Username:** `admin`
- **Admin Password:** `mernposting`

---

## Features

- **Admin authentication (JWT):** Only admins can create, edit, or delete job postings
- **Admin login page:** Secure login for admin, with JWT stored in browser
- **Create, browse, edit, and delete job postings**
- **Responsive and modern UI**
- **Toast notifications for user feedback**
- **Single port deployment (backend serves frontend)**
- **Zustand for state management**
- **React Router for navigation**

## Tech Stack

- **Frontend:** React, Vite, Zustand, React Router, React Icons, React Toastify
- **Backend:** Node.js, Express, MongoDB (with Mongoose), JWT

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd 01-mern-job-posting
   ```
2. **Install dependencies:**
   ```sh
   npm install
   npm install --prefix frontend
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory with your MongoDB URI and secrets:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     JWT_SECRET=your_jwt_secret
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=admin123
     ```

### Development

- **Start the app (dev mode):**
  ```sh
  npm run dev
  ```
  The backend runs on [http://localhost:5000](http://localhost:5000) and proxies API requests to the frontend in dev mode.

### Production Build

1. **Build the frontend and install all dependencies:**
   ```sh
   npm run build
   ```
2. **Start the backend (serves frontend and API):**
   ```sh
   npm start
   ```
   Visit [http://localhost:5000](http://localhost:5000)

## Admin Authentication

- Visit `/login` to log in as admin (default: admin/admin123, or set via env)
- Only admins can see the "Create a Job" link and edit/delete buttons
- JWT is stored in localStorage and sent with API requests

## Folder Structure

```
01-mern-job-posting/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── store/
│   ├── App.css
│   ├── index.html
│   └── vite.config.js
├── .gitignore
└── README.md
```

## License

MIT

---

Feel free to contribute or open issues for improvements!
