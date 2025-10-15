# Grocery Store Project

This project is a simple grocery store management system built with Python. It provides both backend and frontend components to manage products, orders, and units of measurement (UOM) for a grocery store.

## Features

- **Product Management:** Add, update, and delete products.
- **Order Management:** Create and manage customer orders.
- **Units of Measurement:** Manage units for products (e.g., kg, liter).
- **Backend:** Python-based server with data access objects (DAO) for products, orders, and UOM.
- **Frontend:** User interface for managing products and orders, built with HTML, CSS, and JavaScript.

## Project Structure

```
Grocery Store project/
├── backend/
│   ├── orders_dao.py
│   ├── products_dao.py
│   ├── server.py
│   ├── sql_connection.py
│   ├── uom_dao.py
│   └── __pycache__/
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
	git clone <repository-url>
	```
2. Install dependencies:
	```powershell
	pip install -r requirements.txt
	```
3. Run the backend server:
	```powershell
	python backend/server.py
	```
4. Open `ui/index.html` in your browser to access the frontend.

## Usage
- Use the UI to manage products and orders.
- Backend APIs handle data storage and retrieval.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.