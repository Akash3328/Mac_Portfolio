<div align="center">
  <h1>🍎 macOS Style Portfolio – Akash Odedara</h1>
  <p>
    <strong>A macOS-inspired interactive portfolio built using React, Zustand, GSAP, and modern frontend practices.</strong>
  </p>
  <p>
    This project simulates a desktop operating system experience inside the browser, featuring draggable windows, a dock, Finder, Photos, Terminal, and more.
  </p>
</div>

---

## ✨ Features

### 🖥️ macOS Desktop UI
- **Dock**: Functional dock with app icons (Terminal, Photos, Finder, Contact, etc.).
- **Window Management**: Click-to-open windows just like the real macOS.

### 🪟 Window Management System
- **Controls**: Open, minimize, and close windows.
- **Focus Logic**: Smart z-index handling (active window always on top).
- **Draggable**: Fully draggable windows using **GSAP Draggable**.
- **Animations**: Smooth opening and closing transitions.

### 📁 Finder-like Interface
- **Navigation**: Sidebar navigation support.
- **State**: Location-based state management.
- **File System**: Simulated file and folder structure.

### 🖼️ Photos App
- **Gallery**: Sidebar categories and image grid view.
- **Interaction**: Click on an image to open it in a separate **Image Viewer** window.

### 💻 Terminal Window
- **Developer Aesthetic**: Tech stack display and intro text.
- **Theme**: Authentic macOS terminal colors and styling.

### 📇 Contact Window
- **Socials**: Quick links to social profiles.
- **Actions**: Clickable email link (opens default mail app).

### 🎨 Animations
- **GSAP**: High-performance transitions for window movements and UI interactions.
- **Feel**: Realistic "bouncy" and smooth macOS feel.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **JavaScript (ES6+)**
- **Tailwind CSS / Custom CSS**

### State Management
- **Zustand** (Global state)
- **Immer** (Immutability support)

### Animations
- **GSAP** (GreenSock Animation Platform)
- **GSAP Draggable**

### Icons
- **Lucide React**

---

## 📂 Project Structure (Simplified)

```text
src/
├── components/        # Dock, WindowControls, reusable UI
├── windows/           # Terminal, Photos, Finder, Contact, Image viewer
├── hoc/               # WindowWrapper (window behavior logic)
├── store/             # Zustand stores (window state, filesystem location)
├── constants/         # App configs, gallery data, sidebar links
├── assets/images/     # Photos, icons, gallery images
└── App.jsx
```

---

## Author

**Akash Odedara**  
🎓 NEXT.JS | Backend Development | Full Stack Learner  
🔗 [LinkedIn](https://www.linkedin.com/in/akashodedara3328)
📁 [GitHub Projects](https://github.com/Akash3328)

---