# MERN Job Postings

A full-stack job posting application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create, browse, edit, and delete job postings
- Responsive and modern UI
- Toast notifications for user feedback
- Single port deployment (backend serves frontend)
- Zustand for state management
- React Router for navigation

## Tech Stack

- **Frontend:** React, Vite, Zustand, React Router, React Icons, React Toastify
- **Backend:** Node.js, Express, MongoDB (with Mongoose)

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
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory with your MongoDB URI and any other secrets:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

### Development

- **Start the backend:**
  ```sh
  cd backend
  npm run dev
  ```
- **Start the frontend (for development):**
  ```sh
  cd frontend
  npm run dev
  ```
  The frontend runs on [http://localhost:5000](http://localhost:5000) and proxies API requests to the backend.

### Production Build

1. **Build the frontend:**
   ```sh
   cd frontend
   npm run build
   ```
2. **Start the backend (serves frontend and API):**
   ```sh
   cd backend
   node server.js
   ```
   Visit [http://localhost:5000](http://localhost:5000)

## Folder Structure

```
01-mern-job-posting/
├── backend/
│   ├── config/
│   ├── controllers/
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
