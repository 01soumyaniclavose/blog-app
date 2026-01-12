# Blog App

A blog application built with **React**, **TypeScript**, **Material UI**, and **React Hook Form**.Users can create blog posts using a rich text editor and view them on the home page. Data is persisted using a local **JSON Server**.
## Features 
- Create new blog posts
- Rich text editor using React Quill
- Form validation with React Hook Form
- Material UI responsive design
- Client-side routing with React Router
- JSON Server as a mock backend
- Snackbar notifications on successful actions
- Global state management using React Context API

## Tech Stack
- **React**
- **TypeScript**
- **Material UI (MUI)**
- **React Hook Form**
- **React Router**
- **React Quill**
- **JSON Server**

## 📂 Project Structure

```text
├── public/data        # Server 
src/
│
├── components/        # Reusable UI components
├── pages/             # Page components (Home, BlogForm, etc.)
├── context/           # Context API (BlogContext)
├── models/            # TypeScript interfaces and models
├── routes/            # App routing configuration
└── main.tsx           # Application entry point
```

## Setup Instructions
Follow these steps to run the project locally.
#### Step 1: Install Dependencies
npm install
#### Step 2: Start JSON Server
npx json-server --watch db.json --port 5000
#### Step 3: Start the React Application
npm start 

## Future Improvements
1. Need to create a home page and make the card component a separate reusable component. Now this is my home page.
2. Need to create a new component to handle all button actions (Add blog, Edit, Delete, etc).
3. Need to add a toggle message after successfully saving or updating the blog details.
4. The rich text style is removed before sending the data to the server, but the server still saves the style and resets the value during editing. 
5. Design improvements:
   - Based on the screen size, on the home page, the card number needs to be adjusted (row and column). For example, for the bigger screens, the number of rows and columns needs to be added.
   - The Add/Edit page needs to be more responsive.

