# 🛒 Grocery Store Management System

A **complete grocery store management system** built with **Python (Flask)** for the backend and a **modern web interface** (HTML, CSS, JavaScript, jQuery) for the frontend.  
This project allows you to **manage products, units of measurement, and customer orders** efficiently through a clean and user-friendly interface.

---

## 🚀 Overview

The **Grocery Store Management System** is designed to help store owners and staff manage daily operations digitally —  
including managing products, units (like kg, liter, piece), and handling customer orders.  

The system is split into two main parts:
- 🖥️ **Frontend:** HTML, CSS, and JavaScript interface for easy management.  
- ⚙️ **Backend:** Python-based REST API handling database operations.

---

## ✨ Key Features

✅ **Product Management**  
- Add, edit, and delete products.  
- Assign units of measurement and price per unit.  

✅ **Order Management**  
- Create and manage customer orders easily.  
- View and calculate totals automatically.  

✅ **Units of Measurement (UOM)**  
- Add and manage units (kg, liter, box, etc.).  

✅ **Backend API Integration**  
- Python server handles CRUD operations via a structured DAO layer.  

✅ **Simple & Responsive UI**  
- Built with HTML, CSS, and jQuery for smooth interactivity.  

---

## 📂 Project Structure


```
Grocery Store project/
├── backend/
│   ├── orders_dao.py
│   ├── products_dao.py
│   ├── server.py
│   ├── sql_connection.py
│   ├── uom_dao.py
│   
├── ui/
│   ├── index.html
│   ├── manage-product.html
│   ├── order.html
│   ├── css/
│   ├── images/
│   └── js/
├── README.md
```

## Getting Started

### Prerequisites
- Python 3.x
- Required Python packages (see `requirements.txt`)

### Installation
1. Clone the repository:
	```powershell
	git clone https://github.com/marwanelshahawy/Grocery-Store-Management-System.git
	```

2. Run the backend server:
	```powershell
	python backend/server.py
	```
3. Open `ui/index.html` in your browser to access the frontend.

## Usage
- Use the UI to manage products and orders.
- Backend APIs handle data storage and retrieval.

## 🧱 Technologies Used
| Layer          | Technology Stack               |
| -------------- | ------------------------------ |
| **Backend**    | Python (Flask / Custom Server) |
| **Frontend**   | HTML, CSS, JavaScript, jQuery  |
| **Database**   | MySQL / SQLite (via DAO layer) |
| **Versioning** | Git, GitHub                    |

## Contributing
Contributions are welcome!
If you’d like to improve this project:
1. Fork the repository
2. Create a new branch (feature/your-feature-name)
3. Commit your changes
4. Push to your fork and submit a Pull Request

## License
This project is licensed under the MIT License.