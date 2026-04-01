# CodeTrack – CSE Department Coding Practice Platform

CodeTrack is a Full Stack Web Application created for the Computer Science Department to allow students to log in and practice coding problems, track their progress, and see their submission history.

## Technology Stack
- **Backend API**: Node.js with Express.js
- **Student Portal**: Angular (v17+)
- **Admin Portal**: React (Vite)
- **Database**: MongoDB (Mongoose)

## Features
**Student Capabilities (Angular App)**
- Login using CSE credentials
- Dashboard to view progress and stats dynamically
- View coding problems, filter by difficulty (Easy, Medium, Hard)
- Submit solution code via an integrated UI
- Admin Login redirect button

**Admin Capabilities (React App)**
- Secure Admin login gateway
- Create and Delete problems on a fast, responsive interface

---

## 🚀 Deployment Instructions

### 1. GitHub Setup

You need to host your source code on GitHub for Render and Vercel to automatically pull and deploy.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Create your repo on GitHub, then add your remote URL:
git remote add origin <github-repo-url>
git push -u origin main
```

### 2. MongoDB Atlas Setup
1. Create a [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas).
2. Create a Cluster (Free tier works perfectly).
3. Under Database > Networking Access, whitelist your IP `0.0.0.0/0` to allow connecting from anywhere.
4. Under Database > Database Access, create a user and copy the exact connection string.
5. Example: `mongodb+srv://<username>:<password>@cluster.mongodb.net/codetrack`

### 3. Deploy Backend API and Static Hosting on Render
To deploy the full-stack system, you must first build both frontend applications locally, push them to GitHub, and let Render host the Express server.

1. First build the frontends locally (or configure Render to do so):
```bash
cd student-portal && npm install && npm run build
cd ../admin-portal && npm install && npm run build
```
2. Go to [Render.com](https://render.com/).
3. Click **New Web Service** and connect your GitHub repo.
4. Settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
5. Click on **Advanced** -> **Environment Variables** and add:
   - `MONGO_URI` = `mongodb+srv://<username>:<password>@...`
   - `SESSION_SECRET` = `very_secret_key_codetrack`
   - `PORT` = `10000`
6. Click **Deploy**.

### 4. Optional Vercel Hosting
If you wish to host the SPAs entirely decoupled on Vercel, you can configure Vercel to point specifically to the `student-portal` or `admin-portal` directory and specify the Node API URL. However, the `app.js` server natively hosts them securely under one domain.

---

## Running Locally

1. Create a `.env` file in the root directory.
2. Run `npm install` in the base directory.
3. Run `npm install` in `student-portal`, and `npm install` in `admin-portal`.
4. Run `npm run build` in both SPA directories.
5. Start the API with `node app.js`.
6. Access the Student Portal at `http://localhost:10000`.
7. Access the Admin Portal by clicking "Admin" or navigating to `http://localhost:10000/admin`.
