# React News Platform

A scalable, production-ready **News Aggregation Platform** built with **React** and modern frontend architecture principles.  
Designed for performance, maintainability, and real-world usage patterns.

---

## 🔍 Overview

This application consumes a third-party News API and presents categorized, searchable news content with a clean UX.  
The architecture follows **component-driven development**, **separation of concerns**, and **reusable logic via custom hooks**.

---

## ✨ Key Features

- Category-based news browsing (Business, Sports, Travel, Arts, Culture, Innovation)
- Article search with debounced input
- News detail view with routing
- Skeleton / shimmer loaders for better perceived performance
- Centralized error handling & 404 fallback
- Responsive layout (mobile-first)
- Clean and scalable folder structure
- Service-layer abstraction for API calls

---

## 🧱 Architecture Principles

- **Single Responsibility Components**
- **Reusable UI primitives**
- **Custom Hooks for side effects & data fetching**
- **Service Layer abstraction**
- **Predictable file organization**
- **CSS scoped at component level**

---

## 🛠 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend    | React (Vite) |
| Styling     | CSS (Component-scoped) |
| Routing     | React Router |
| Data Fetch  | Fetch / Axios |
| State Mgmt  | React Hooks |
| Build Tool  | Vite |

---

## 📁 Project Structure
```js
src/
├── assets/ # Static assets
│
├── components/ # Reusable UI components
│ ├── Navlist/
│ ├── Footer/
│ ├── NewsCard/
│ └── Shimmer/
│
├── hooks/ # Custom React hooks
│
├── pages/ # Route-level pages
│ ├── Home/
│ ├── News/
│ ├── Newsdetails/
│ ├── Search/
│ ├── Arts/
│ ├── Business/
│ ├── Culture/
│ ├── Innovation/
│ ├── Sports/
│ └── Travel/
│
├── services/ # API layer
│
├── utils/ # Helpers & constants
│
├── pagenotfound/ # 404 page
│
├── Error.jsx # Global error component
├── App.jsx # Application root
├── main.jsx # Entry point
└── index.css # Global styles
```
yaml
Copy code

---

## 🔧 Local Development

### Prerequisites
- Node.js >= 18
- npm or yarn


## 👨‍💻 Author
> Ravi Mishra
Frontend Developer (React)

