# Dynamic Scheduler Application

A simple scheduling application built with **Next.js** and a **JSON Server** (used as a mock API).

---

## 🚀 Installation

1. **Clone the repository** or navigate to your project directory:

   ```bash
   cd scheduler-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 🖥️ Running the Application

You need to run **two servers simultaneously**:

- One for the **JSON Server (Mock API)**
- Another for the **Next.js Development Server**

### Terminal 1: Start JSON Server (Mock API)

```bash
npm run json-server
```

> This starts the mock API server at **http://localhost:3001**

### Terminal 2: Start Next.js Development Server

```bash
npm run dev
```

> This starts the Next.js app at **http://localhost:3000**

---

## ⚙️ Tech Stack

- **Next.js** — Frontend framework
- **JSON Server** — Mock REST API
- **Node.js & npm** — Package management and scripts

---

## 🧑‍💻 Scripts

| Command               | Description                         |
| --------------------- | ----------------------------------- |
| `npm run dev`         | Runs the Next.js development server |
| `npm run json-server` | Runs the mock JSON API server       |
| `npm run build`       | Builds the project for production   |
| `npm run start`       | Starts the production server        |

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 💬 Feedback

If you encounter any issues or have suggestions, feel free to open an issue or contribute via pull requests.
