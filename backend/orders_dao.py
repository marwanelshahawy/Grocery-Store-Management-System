from sql_connection import get_sql_connection
from datetime import datetime
def get_all_orders(connection):
    cursor = connection.cursor()
    query = '''SELECT * FROM orders'''

    response = []
    cursor.execute(query)
    for(order_id, customer_name, Datetime, total) in cursor:
        response.append(
            {
                'order_id':order_id,
                'customer_name':customer_name,
                'Datetime':Datetime,
                'total':total
            }
        )
    
    return response

def insert_order(connection,order):
    cursor = connection.cursor()
    query = '''INSERT INTO orders(customer_name,Datetime,total)
    OUTPUT INSERTED.order_id
    VALUES(?,?,?)'''
    order_data=(order['customer_name'],datetime.now(),order['total'])
    cursor.execute(query,order_data)
    return_id=cursor.fetchone()[0]
    query_order_details='''INSERT INTO order_details(order_id,product_id,quantity,total_price)
    VALUES(?,?,?,?)'''
    order_details = []
    for record in order['order_details']:
        order_details.append(
            (
                return_id,
                record['product_id'],
                record['quantity'],
                record['total_price']
            )
        )
    cursor.executemany(query_order_details, order_details)
    connection.commit()
    return return_id

def get_order_details(connection, order_id):
    cursor = connection.cursor()
    query = '''SELECT o.order_id, o.customer_name, o.Datetime, o.total,
               od.product_id, p.name as product_name, od.quantity, od.total_price
               FROM orders o
               LEFT JOIN order_details od ON o.order_id = od.order_id
               LEFT JOIN products p ON od.product_id = p.product_id
               WHERE o.order_id = ?'''
    
    cursor.execute(query, (order_id,))
    results = cursor.fetchall()
    
    if not results:
        return None
    
    order_data = {
        'order_id': results[0][0],
        'customer_name': results[0][1],
        'Datetime': results[0][2],
        'total': results[0][3],
        'order_details': []
    }
    
    for row in results:
        if row[4]:  # If product_id exists
            order_data['order_details'].append({
                'product_id': row[4],
                'product_name': row[5],
                'quantity': row[6],
                'total_price': row[7]
            })
    
    return order_data


if __name__ == "__main__":
    connection = get_sql_connection()
    # print(get_all_orders(connection))
    order = {'customer_name':'nada','total':580,'order_details': [{'product_id': 40,'quantity':2,'total': 120},{'product_id': 43,'quantity':3,'total': 90}]}
    print(insert_order(connection,order))
    
{'customer_name':'nada','total':580,'order_details': [{'product_id': 40,'quantity':2,'total': 120},{'product_id': 43,'quantity':3,'total': 90}]}
{'customer_name': 'Marwan','total':'135.00','order_details':[{'product_id':'39','quantity':'1','total_price':'55.00'}, {'product_id':'41','quantity':'2','total_price':'80.00'}]}