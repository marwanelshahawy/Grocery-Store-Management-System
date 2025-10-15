from flask import Flask,request,jsonify
import products_dao
import uom_dao
import orders_dao
import json
from sql_connection import get_sql_connection


app =Flask(__name__)

connection = get_sql_connection()

##                                Products APIs                               ##

## Get Products API
@app.route("/getProducts", methods=['GET'])
def get_product():
    products=products_dao.get_all_products(connection)
    response =jsonify(products)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

## delete Product API
@app.route("/deleteProduct",methods=['POST'])
def del_product():
    return_id = products_dao.delet_product(connection,request.form['product_id'])
    response = jsonify(
        {
            'product_id':return_id
        }
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

## Insert Product API
@app.route("/insertProduct",methods=['POST'])
def insert_product():
    requestpayload = json.loads(request.form['data'])
    return_id=products_dao.insert_new_product(connection,requestpayload)
    response = jsonify(
        {
            'product_id':return_id
        }
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

## Get UOM API
@app.route("/getUOM", methods=['GET'])
def get_uoms():
    uoms=uom_dao.get_uoms(connection)
    response =jsonify(uoms)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

## Edit Product API
@app.route("/editProduct",methods=['POST'])
def edit_product():
    requestpayload = {
        'name': request.form['name'],
        'uom_id': request.form['uom_id'],
        'price_per_unit': request.form['price_per_unit'],
        'product_id': request.form['product_id']
    }
    return_id=products_dao.edit_product(connection,requestpayload)
    response = jsonify(
        {
            'product_id':return_id
        }
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

##                                Orders APIs                               ##

## Get Orders API
@app.route("/getAllOrders", methods=['GET'])
def get_all_orders():
    orders=orders_dao.get_all_orders(connection)
    response =jsonify(orders)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

## Insert Order API
@app.route("/insertOrder",methods=['POST'])
def insert_order():
    requestpayload = json.loads(request.form['data'])
    return_id=orders_dao.insert_order(connection,requestpayload)
    response = jsonify(
        {
            'order_id':return_id
        }
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

## Get Order Details API
@app.route("/getOrderDetails", methods=['GET'])
def get_order_details():
    order_id = request.args.get('order_id')
    order_details = orders_dao.get_order_details(connection, order_id)
    response = jsonify(order_details)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__=="__main__":
    app.run(debug=True)

