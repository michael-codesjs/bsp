# Project Submission Spec

**Goal**: Build a small prototype feature to evaluate frontend structure, form handling, and implementation quality.

## Core Requirements

### 1. Public Business Profile Page
- **Route**: `/business-profile/[slug]` (e.g., `/business-profile/strongest-fitness`)
- **Access**: Public (no login required).
- **Content**:
  - Logo (Square)
  - Banner (Landscape)
  - Business Info (Name, Description, etc.)
  - Social Links

### 2. Mock Login
- **Flow**: Simple login page with hardcoded credentials.
- **Mechanism**: Set a cookie upon successful login to mimic authentication state.

### 3. Dashboard (Private)
- **Route**: `/dashboard` (or similar)
- **Functionality**:
  - Form to create/edit the Business Profile data.
  - **Image Uploads**:
    - Must include **Cropping** functionality before saving.
    - Logo: Square crop.
    - Banner: Landscape crop.
  - **Persistence**: Saved data must persist and reflect on the public Business Profile page.

### 4. Graphing (Bonus/Spec Check)
- **Requirement**: "Dashboard - To create graphs" (from API list spec).
- **Note**: The prompt mentions "Dashboard form" but the API list mentions "Dashboard - To create graphs". We should be prepared to add a simple chart if time permits, or at least structure the dashboard to allow it.

## Deliverables

1.  **GitHub Repo**: Clean code, committed often.
2.  **Deployed Link**: Hosted on Vercel or similar.

## API Reference
Base URL: `https://test-api.gymble.us`

1.  **Login**: Authenticate user.
2.  **Edit Business Profile**: Store profile data.
3.  **Get Business Details**: Retrieve profile data.
4.  **Profile Details**: Public endpoint for the profile page.
5.  **Dashboard**: Endpoint for graph data.

## Implementation Plan

1.  **Setup**: Next.js app with `DM Sans` and Tailwind CSS configured with `colors.md`.
2.  **Auth**: Middleware to protect `/dashboard`, login page to set cookie.
3.  **Profile Page**: Dynamic route `[slug]` fetching data from "Profile Details" API.
4.  **Dashboard Page**:
    - Fetch existing data ("Get Business Details").
    - Form to update data ("Edit Business Profile").
    - Image cropper implementation (e.g., `react-easy-crop`).
