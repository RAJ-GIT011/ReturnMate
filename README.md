# 🔄 ReturnMate – Smart Return & Refund System

ReturnMate is an intelligent return and refund automation platform built for e-commerce businesses. It aims to reduce refund delays, flag return fraud, and optimize inventory classification using trust-based decision-making and product grading.

---

## 🚀 Features

### 🧍 Customer Side
- 📦 Submit a return request via a simple form
- 📸 Upload product and invoice images
- ⚡ Instant refunds for trusted users
- 📊 Track return and refund status

### 🏭 Admin Side
- 🧠 Auto-score return credibility using Trust Score Engine
- 📝 Grade returned products (Grade A/B/C)
- ♻️ Classify inventory as Resell, Refurbish, or Scrap

---

## 💡 Problem Solved

> Traditional return systems are:
- Slow (3–5 day refund time)
- Prone to abuse (frequent fake returns)
- Wasteful (usable products often discarded)
- Manual and error-prone

**ReturnMate** solves this with:
- Trust Score–based instant decisions
- Automated grading panel
- Smart inventory reclassification

---

## 🧱 Tech Stack

| Layer        | Technology           |
|-------------|----------------------|
| Frontend     | React.js, Axios, CSS |
| Backend      | Node.js, Express     |
| Database     | MongoDB Atlas        |
| File Upload  | Cloudinary or Firebase (Optional) |
| Hosting      | Render / GitHub Pages (for demo) |

---

## 🗂 Project Structure
returnmate/
├── client/ # React frontend
│ └── src/
│ ├── pages/
│ │ ├── Customer/ # ReturnForm.jsx, ReturnStatus.jsx
│ │ └── Admin/ # GradingPanel.jsx, InventoryDashboard.jsx
│ └── services/ # Axios API functions
│
├── server/ # Node.js backend
│ ├── models/ # MongoDB Schemas
│ ├── routes/ # API Routes
│ ├── controllers/ # Business Logic
│ └── utils/ # Trust score logic, image uploader

🧪 Demo Credentials (For Admin Testing)
Add fake credentials for grading panel if needed.

📈 Roadmap
 Return form with file upload

 Trust score logic

 Admin product grading

 Email/OTP-based login (optional)

 Analytics panel

 Mobile responsiveness

🙌 Contribution
Feel free to fork, raise issues, or suggest features via pull requests.

📄 License
MIT License

👨‍💻 Built By
Rajan Kumar Das & 
contributors ✨
