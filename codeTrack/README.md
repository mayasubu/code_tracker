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

### 3. Deploy to Render (Full-Stack Unified)

CodeTrack is configured for **unified deployment**, meaning your Node.js server will serve both the Student and Admin portals from a single URL. This is the most efficient and cost-effective way to host.

1.  Connect your GitHub repository to [Render.com](https://render.com/).
2.  Choose **New Web Service**.
3.  Configure the following settings:
    - **Runtime**: `Node`
    - **Build Command**: `npm run build` (This automatically builds both portals)
    - **Start Command**: `node app.js`
4.  Click **Advanced** -> **Add Environment Variable**:
    - `MONGO_URI`: Your MongoDB Atlas connection string.
    - `SESSION_SECRET`: A long, random string for security.
    - `PORT`: `10000` (optional, Render uses this by default).
5.  Click **Deploy**.

*Congratulations! Your platform is now live.*

---

## 🛠️ Troubleshooting & Local Development

1. Create a `.env` file in the root directory.
2. Run `npm install` in the base directory.
3. Run `npm install` in `student-portal`, and `npm install` in `admin-portal`.
4. Run `npm run build` in both SPA directories.
5. Start the API with `node app.js`.
6. Access the Student Portal at `http://localhost:10000`.
7. Access the Admin Portal by clicking "Admin" or navigating to `http://localhost:10000/admin`.
