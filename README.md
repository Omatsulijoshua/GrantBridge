# GrantBridge 🎓

> Connecting Ambition with Opportunity. A modern, responsive scholarship and grant management platform.

GrantBridge is a full-featured web platform designed to streamline the educational funding ecosystem. It connects ambitious students with verified foundations and providers, offering smart matching, real-time application tracking, and comprehensive management dashboards for both providers and system administrators.

---

## 🚀 Live Demo & Testing

For easy evaluation, the platform includes a **Demo Selector Panel** in the public header, allowing you to instantly switch roles without typing credentials.

### Pre-seeded Demo Accounts
If you prefer to log in manually via the Sign In page, use the password **`password`** with any of the following accounts:

*   **Student (Applicant):** `student@grantbridge.com`
*   **Provider (Verified Foundation):** `provider@grantbridge.com`
*   **Provider (Unverified Foundation):** `unverified@foundation.org`
*   **Super Administrator:** `admin@grantbridge.com`

---

## 🛠️ Tech Stack

*   **Frontend Core:** [React](https://react.dev/) + [Vite](https://vite.dev/) (Fast SPA architecture)
*   **Styling:** Custom Vanilla CSS (featuring CSS Custom Properties, Glassmorphism, and CSS Grid)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **State Management & Persistence:** React Context API + `localStorage` (fully functional without external database configuration)

---

## ✨ Features

### 1. Public Website
*   **Landing Page:** Hero section with quick search, key statistics, featured grants, and "How it Works" walkthroughs.
*   **Browse Grants:** Live search and advanced filtering by category, award amount, education level, and minimum GPA.
*   **Eligibility Match Score:** Logged-in students see a dynamically calculated percentage match score based on their academic profile.
*   **Pricing Page:** Toggleable billing cycles (Monthly/Annual) for foundations with tiered plans (Free, Pro, Enterprise) and FAQs.
*   **Contact Page:** Interactive contact form with simulated email sending.
*   **Auth System:** Tabbed Login/Signup interface with role-specific registrations.

### 2. Student Dashboard
*   **Overview:** Profile completion meter, saved opportunities sidebar, and matched grant recommendations.
*   **Profile Editor:** Manage GPA, major, education level, financial need, and upload transcripts/resumes.
*   **Applications Tracker:** View submitted applications and monitor review stages via an interactive vertical timeline.
*   **Feedback Integration:** Read reviewer comments and next-step instructions directly.

### 3. Provider/Foundation Dashboard
*   **Analytics Overview:** Track active listings, total applicants, success rate, and total disbursed funds.
*   **Grant Posting Portal:** Form to post new scholarships and set academic criteria (GPA, major, and education level).
*   **Applicant Manager:** Review student profiles, inspect uploaded resumes/transcripts, read essays, and update status (Shortlist/Approve/Reject) with personalized feedback.
*   **Verification Banner:** Indicates if the foundation is verified. Unverified foundations can draft grants, but they remain pending until admin verification.

### 4. Super Admin Dashboard
*   **Overview:** High-level platform statistics, pending grant approval queue, and category manager.
*   **User Management:** Search and audit all user accounts, with the ability to suspend (block) or unblock users.
*   **Verification Queue:** Verify newly registered foundations to authorize their listings.
*   **Directory Audit:** Global directory to monitor or take down any scholarship listing.

---

## 📦 Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) installed on your system.

### Steps
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Omatsulijoshua/GrantBridge.git
    cd GrantBridge
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
