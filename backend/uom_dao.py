from sql_connection import get_sql_connection
def get_uoms(connection):
   
    cursor = connection.cursor()

    query = '''SELECT uom.uom_id, uom.unit from uom '''

    cursor.execute(query)

    response =[]

    for (uom_id,unit) in cursor:
        response.append(
            {
                'uom_id':uom_id,
                'unit':unit.replace(' ','')
            }
        )

    return response

if __name__=="__main__":
    connection = get_sql_connection()
    print(get_uoms(connection))
    # print(insert_new_product(connection, {
    #     'name': 'potatoes',
    #     'uom_id': '1',
    #     'price_per_unit': 10
    # }))