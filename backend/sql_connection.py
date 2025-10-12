import pyodbc as db
__conn = None
def get_sql_connection():
    global __conn
    if __conn is None:
        print("Openning sql connection.....")
        conn_str = (
                "Driver={ODBC Driver 17 for SQL Server};"
                "Server=DESKTOP-CIGVTTI;"  
                "Database=Grocery_Store;"            
                "Trusted_Connection=yes;"            
            )
        __conn =db.connect(conn_str)

        print("sql connect sucessfully ")
        return __conn