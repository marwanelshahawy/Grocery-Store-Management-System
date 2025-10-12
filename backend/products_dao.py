from sql_connection import get_sql_connection
def get_all_products(connection):
   
    cursor = connection.cursor()

    query = '''SELECT products.product_id, products.name, products.uom_id, products.price_per_unit, uom.unit
    from products inner join uom on products.uom_id=uom.uom_id'''

    cursor.execute(query)

    response =[]

    for (product_id,name,uom_id,price_per_unit,unit) in cursor:
        response.append(
            {
                'product_id':product_id,
                'name':name.replace(' ', ''),
                'uom_id':uom_id,
                'price_per_unit':price_per_unit,
                'unit':unit.replace(' ', '')
            }
        )

    return response
    
def insert_new_product(connection,product):
    cursor = connection.cursor()
    data = (product['name'],product['uom_id'],product['price_per_unit'])
    query='''INSERT INTO products(name,uom_id,price_per_unit) 
    OUTPUT INSERTED.product_id
    VALUES(?,?,?)'''

    cursor.execute(query,data)
    last_id = cursor.fetchone()[0]
    connection.commit()
    return last_id
    
def edit_product(connection,product):
    cursor = connection.cursor()
    data = (
    product['name'],
    product['uom_id'],
    product['price_per_unit'],
    product['product_id']
    )

    query='''UPDATE products
    SET name = ?, uom_id = ?, price_per_unit = ?
    WHERE product_id = ? 
    '''

    cursor.execute(query,data)
    connection.commit()
    return product['product_id']
    
def delet_product(connection,product_id):
    cursor = connection.cursor()
    query='''DELETE FROM products
    WHERE product_id=?'''

    cursor.execute(query,product_id)
    
    connection.commit()

    
if __name__=="__main__":
    connection = get_sql_connection()
    
    # print(insert_new_product(connection, {
    #     'name': 'potatoes',
    #     'uom_id': '1',
    #     'price_per_unit': 10
    # }))
    print(edit_product(connection,{
        'name': 'Oil',
        'uom_id': '2',
        'price_per_unit': 55,
        'product_id':39
    }))