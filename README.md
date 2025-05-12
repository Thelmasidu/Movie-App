#  Serverless Movies App

**Name:** Ngozi Thelma Nwanesindu  
**Course:** Enterprise Web Development  
**Assignment:** Serverless REST API and React SPA  
**Tech Stack:** React + TypeScript + AWS Lambda + DynamoDB + Cognito + S3
**Demo Video:** https://youtu.be/IpTQbaf-zUE
**Bucket website endpoint:** http://tmdb-movie.s3-website-eu-west-1.amazonaws.com
---

## SS Overview

This is a full-stack **Serverless Movies App** project built as part of an academic assignment. It combines a modern **React** frontend with a **serverless backend** using **AWS Lambda** and **Amazon DynamoDB**, with **Cognito** providing user authentication and **Amazon S3** serving the frontend.

---

##  Features

###  Core Functionality
- Browse Movies and TV Series
- View Actor Profiles
- View Similar Movies
- Add and View Reviews
- Translate Reviews (via Amazon Translate)
- Create Fantasy Movies
- Add Movies/Actors/Series to Favourites
- Search & Filter Movies

###  User Authentication
- Secure sign-up/login with **Amazon Cognito**
- Token-based access for private routes
- Role-based access to fantasy movie creation

###  UI Enhancements
- Pagination via **React Query**
- Dynamic Routing (Parameterized URLs)
- Responsive Design
- Enhanced Detail Views

---

##  Tech Stack

| Frontend            | Backend               | Cloud Services        |
|---------------------|-----------------------|------------------------|
| React + Vite + TS   | AWS Lambda (CDK)      | AWS S3 (Hosting)       |
| React Router DOM    | Amazon DynamoDB       | Amazon Cognito (Auth)  |
| React Query         | REST API Gateway      | Amazon Translate       |

---

##  Folder Structure

```
serverless-movies-app/
├── src/
│   ├── api/                # API integration
│   ├── components/         # Reusable components
│   ├── pages/              # Route-based pages
│   ├── hooks/              # Custom hooks
│   ├── contexts/           # Context API for state
│   └── main.tsx, App.tsx   # Entry points
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

---


##  Authentication

- Uses **AWS Cognito** for secure login and registration.
- JWT tokens are used to protect API routes and identify users.
- Only logged-in users can post reviews, create fantasy movies, or mark favourites.

---

##  Extended Features

- **Fantasy Movie Builder**  
  Users can design their own fantasy movies with poster uploads, cast, and genres.

- **Review Translation**  
  Translate reviews into different languages using Amazon Translate.

- **Actor Details View**  
  Detailed profiles with biography and filmography.

- **Advanced Search**  
  Filter by genre, rating, release year.
