# Resume Builder Application

A full-stack application to manage the vessels and crew.  

Frontend: **Next.js** | Backend: **Node.js** | Database: **MongoDB**

---

## Features

- **User Login**
- **Add Issues and resolve issues for Admin** (update mobile and summary)
- **Add/Edit/Delete Vessels**
- **Add/Edit/Delete Users**

---

## Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   Copy code
   npm install

3. Create a .env file (based on .env.example) and configure:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Start the backend server:
   ```bash
   npm run dev

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Start the frontend:
   ```bash
   npm run dev
4. Open the app in your browser (usually at http://localhost:3000).

### Usage

#### Login
- Go to the Login page.
- Enter your email and password. (admin@gmail.com/Admin@123)
- After successful login, you will be redirected to your Profile Page.

#### Add Issues
- Navigate to the Issues Page.
- Add a new issue with the following details:
    - User (select a User – stored as userId)
    - Vessel (select a Vessel – stored as vesselId)
    - Category (Issue category, e.g., Engine, Safety, Navigation)
    - Description (optional detailed explanation)
    - Priority – Low / Medium / High
    - Status – defaults to Open, can be changed to Resolved
- Once added, issues will appear in a list below the form.
- You can Edit or Delete each issue.
- Each issue displays:
    - User
    - Vessel
    - Category
    - Priority
    - Status

Created & Updated timestamps

#### Add Vessels
- Navigate to the Vessels Page.
- Add a new vessel with the following fields:
    - Name (required)
    - IMO Number (unique & required)
    - Flag (country flag of the vessel)
    - Type – Cargo or Tanker
    - Status – Active or Maintenance
    - Last Inspection Date (optional)
- Newly added vessels appear in a list below the form.
- Each vessel record shows:
    - Name
    - IMO
    - Flag
    - Type
    - Status
    - Last Inspection Date
- You can Edit or Delete any vessel.

#### Add Users
- Navigate to the Users Page.
- Add a new user with the following fields:
    - Email
    - Password (will be hashed automatically)
    - Role – Crew or Admin
    - Assigned Vessels (choose one or multiple vessels → stored in assignedVesselIds)
- Password is hashed before saving.
- Each user entry will display:
    - Email
    - Role
    - Assigned Vessels
    - Created / Updated timestamps

#### Project Structure
   ```bash
   Copy code
   root/
   ├─ frontend/       # Next.js frontend
   ├─ backend/        # Node.js backend
   ├─ backend/.env    # Environment variables for backend
```
#### Notes
- Use two terminals to run the frontend and backend simultaneously.
- Ensure MongoDB is running and .env is correctly configured.
- All sensitive information like database URI and JWT secret should be in .env.

#### License
MIT License

