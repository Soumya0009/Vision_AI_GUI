# VisionAI Classifier

VisionAI Classifier is a modern web-based application built with React that enables users to perform image classification using deep learning models such as VGG16. The platform provides an intuitive dashboard to visualize predictions, monitor model performance, and manage image data efficiently.

---

## Overview

The application is designed to deliver a seamless experience for interacting with AI-powered image classification systems. It includes structured navigation, real-time prediction insights, and a scalable architecture suitable for enterprise or research use.

---

## Key Features

### Dashboard

* Centralized view of all processed images
* Category-wise distribution (e.g., Cats, Dogs, Persons, Cars)
* Clean and responsive UI for efficient navigation

### Image Gallery

* Grid-based layout for displaying classified images
* Interactive selection to view detailed prediction results
* Optimized rendering for performance

### Prediction Details

* Displays predicted class with confidence score
* Shows inference time for each prediction
* Provides metadata such as file name and upload timestamp

### Model Selection

* Supports switching between different deep learning models (e.g., VGG16)
* Designed for extensibility to integrate additional models

### History Tracking

* Maintains a record of previous predictions
* Useful for auditing and analysis

---

## Authentication and Login

The application includes a secure login system to control access and protect data.

### Features

* User authentication using username and password
* Client-side validation for required fields
* Error handling with user-friendly notifications
* Session-based access control (extendable with JWT or token-based authentication)

### Typical Flow

1. User enters credentials on the login screen
2. Input validation ensures fields are not empty
3. Credentials are verified via backend API
4. On successful authentication:

   * User is redirected to the dashboard
   * Session/token is stored securely
5. On failure:

   * Appropriate error message is displayed

### Security Enhancements (Recommended)

* Token-based authentication (JWT)
* Password hashing (bcrypt)
* HTTPS enforcement
* Role-based access control (RBAC)

---

## Technology Stack

* Frontend: React.js
* Styling: CSS / Tailwind CSS (based on implementation)
* State Management: React Hooks / Context API
* Routing: react-router-dom
* Backend (optional): Flask / FastAPI / Node.js
* API Communication: Axios / Fetch API

---

## Project Structure

```
vision-ai/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Sidebar.js
│   │   ├── Dashboard.js
│   │   ├── ImageGrid.js
│   │   ├── PredictionPanel.js
│   │   └── Login.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── History.js
│   │   ├── Metrics.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   └── auth.js
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── App.js
│   ├── routes.js
│   └── index.js
│
├── package.json
└── README.md
```

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/Soumya0009/Vision_AI_GUI.git
cd Vision_AI_GUI
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## API Integration

The frontend can be integrated with a backend service for model inference.

### Example Endpoint

```
POST /predict
```

### Request Payload

```json
{
  "image": "base64_encoded_image"
}
```

### Response

```json
{
  "class": "Cat",
  "confidence": 0.985,
  "inference_time": "240ms"
}
```

---

## Future Enhancements

* Image upload and drag-and-drop functionality
* Real-time model inference
* Advanced analytics and visualization
* Multi-model comparison dashboard
* User role management and permissions
* Export reports in PDF/CSV format

---

## Author

Soumya Ranjan Mohanty
GitHub: [https://github.com/Soumya0009](https://github.com/Soumya0009)
Email: [soumyaranjanmohanty0009@gmail.com](mailto:soumyaranjanmohanty0009@gmail.com)

---

## License

This project is licensed under the MIT License.

---

If you want next improvements, I can help you:

* Add **versioning (e.g., VisionAI v1.0.0) inside UI**
* Create **professional login UI + JWT integration**
* Build **backend (Flask/FastAPI) for your AI model**
* Prepare **resume-ready project explanation**

Just tell me what you want to enhance next.
