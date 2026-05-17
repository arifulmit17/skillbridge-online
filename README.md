# SkillBridge

**A full-stack platform connecting learners with expert tutors for seamless session booking and management.**

---

## 📌 Problem Statement

Finding the right tutor can be time-consuming and inefficient. Students often struggle to discover qualified tutors, check their availability, and book sessions smoothly. On the other hand, tutors lack a centralized platform to showcase their expertise, manage schedules, and track sessions. Additionally, there is a need for proper administration to maintain platform integrity and user management.

---

Live link: https://skillbridge-online.vercel.app/
Backend: https://b6-skill-bridge-backend.vercel.app/

## 💡 Solution Overview

SkillBridge solves this problem by providing a centralized, user-friendly platform where:

* Students can easily explore tutor profiles, check availability, and book sessions instantly.
* Tutors can manage their profiles, availability, and teaching sessions efficiently.
* Admins can oversee the entire system, manage users, and ensure smooth platform operations.

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* ShadCN UI

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* BetterAuth 

### Other Tools

* REST API
* Fetch
* Toast Notifications (Sonner)

---

## ✨ Key Features

### 👨‍🎓 For Students

* Browse tutor profiles
* View tutor availability
* Book sessions instantly
* Leave reviews and ratings

### 👩‍🏫 For Tutors

* Create and manage profiles
* Set availability schedule
* Manage booked sessions
* Track teaching history

### 🛡️ Admin Panel

* Manage users (students & tutors)
* Control user roles and status
* Monitor platform activities

### ⚙️ General Features

* Secure authentication system
* Responsive UI/UX
* Real-time feedback with notifications
* Clean dashboard interfaces

---



Example:

* Home Page
* Tutor Listing Page
* Booking Flow
* Admin Dashboard

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/arifulmit17/skillbridge-online
cd skillbridge
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add the required variables (see below).

### 4️⃣ Run Database Migrations

```bash
npx prisma migrate dev
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

App will be running at:

```
http://localhost:3000
```

---

## 🔐 Environment Variables

```env
# Database
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# API
NEXT_PUBLIC_API_URL=http://localhost:5000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
