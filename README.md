🛒 BaskNOW — Smart Delivery with Kirana Fallback
BaskNOW is a smart delivery simulation app that mimics how real-world platforms like Zepto or Instamart handle inventory shortages. When items are missing from a central dark store, the system intelligently falls back to nearby kirana stores to fulfill the order — ensuring smooth delivery without customer disruption.

🚀 Features
✅ Dark store inventory fulfillment
✅ Smart fallback to local kirana stores
✅ Animated map-based rider delivery simulation
✅ ETA calculation using geolocation logic
✅ Clean, modern UI with smooth transitions
✅ Fully modular and componentized using React
✅ No backend needed (mock data used for kiranas and inventory)

🧠 Project Use-Case
This project is ideal for:

Simulating last-mile fallback delivery strategies

Demonstrating real-world delivery edge cases (like stockouts)

Practicing fallback-based routing logic and mapping systems

Portfolio / Resume project showing full product thinking

🗺️ Flow Overview
User Order → Items requested by customer

Dark Store Check → Fulfilled if in stock

Fallback Matching → Missing items mapped to local kiranas

Route Simulation → Rider animated across stores + to customer

Final Order Summary → Merged total cost and item summary

🧩 Tech Stack
Technology	Purpose
React.js	Frontend Framework
React-Leaflet	Map rendering and marker animation
OpenStreetMap	Map tiles
CSS3	Styling + animation
JS Haversine Formula	ETA calculation (based on distance)
Mock Data	Kirana inventory & user order simulation

📦 Folder Structure
css
Copy
Edit
📦src
 ┣ 📂components
 ┃ ┣ 📜DarkStoreSummary.jsx
 ┃ ┣ 📜FallbackItemMatcher.jsx
 ┃ ┣ 📜MapRouteSimulator.jsx
 ┃ ┣ 📜OrderSummary.jsx
 ┃ ┣ 📜FinalOrderSummary.jsx
 ┣ 📜App.jsx
 ┣ 📜index.js
🧪 Future Enhancements
🔐 Add backend + auth for store logins

📦 Make inventory dynamically changeable

🔄 Real-time rider tracking using sockets

📱 Fully responsive mobile-first UI

📍 Filter fallback kiranas by distance, not just pincode

📊 Add analytics dashboard (distance saved, ETA accuracy)

🤓 Learnings
Geo-based logic & Haversine distance in JS
Real-world order fallback planning
Component-based UI architecture
React + animation handling (marker movement)
Designing for edge cases (out-of-stock fallback)

📄 License
MIT License – Free to use, fork, and remix with credit.

✨ Credits
Built with ❤️ by Rajan Kumar Das
Design inspiration from real-world delivery systems like Minutes Zepto,and Instamart.

📌 Star This Repo!
If you liked the project, consider giving it a ⭐
Helps others discover and motivates me to build more!


