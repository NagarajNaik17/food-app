
# 🍲 Food Donating App

A full-stack MEARN (MongoDB, Express, React, Node.js) application that connects **donors** with **NGOs** to facilitate food donations. Donors post food details and location, and NGOs accept and collect them.

---

## 📝 Description

This project helps reduce food waste by enabling:
- **Donors** (individuals, hotels, event organizers) to post surplus food with pickup details.
- **NGOs** to view, accept, and manage food pickups in real time.

---

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Others:** Axios, dotenv, concurrently (for development)

> 🔐 **Note**: This version does not use JWT authentication. Authentication logic may be basic or not implemented.

---

## 🚀 Getting Started

### 🔁 Clone the Repository
```bash
git clone https://github.com/NagarajNaik17/food-app.git
cd food-app
````

### 📦 Install Dependencies

For the backend:

```bash
cd backend
npm install
```

For the frontend:

```bash
cd ../frontend
npm install
```

### 🔐 Setup Environment Variables

Create a `.env` file in both `backend` and `frontend`.

#### `backend/.env`

```
PORT=5000
MONGO_URI=your_mongo_connection_string
```

#### `frontend/.env`

```
REACT_APP_API_URL=http://localhost:5000
```

### ▶️ Run the App

In one terminal (backend):

```bash
cd backend
npm run dev
```

In another terminal (frontend):

```bash
cd frontend
npm start
```

Visit: `http://localhost:3000`

---

## 🌱 Future Ideas for Contribution

* Add login/auth (e.g. NGO approval or admin access)
* Real-time notification for new food posts
* Google Maps integration for donor/NGO locations
* NGO verification system
* Donation history and analytics
* Mobile responsiveness or mobile app
* Multi-language support
* Rating or feedback system for NGOs and donors

---

## 🤝 Contributing

We welcome all contributors:

1. Fork this repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add your message here'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## ❤️ Made with love by Nagaraj



