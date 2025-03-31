import psycopg2
import sys
import os

ENDPOINT="database-museu-postegres.cz9ghptubzlk.us-east-1.rds.amazonaws.com"
PORT="5432"
USER="postgres"
REGION="us-east-1a"
DBNAME="museu"

PASSWORD="postgres"

try:
    conn = psycopg2.connect(host=ENDPOINT, port=PORT, database=DBNAME, user=USER, password=PASSWORD)
    cur = conn.cursor()
    cur.execute("""SELECT * FROM mydb.Funcionario""")
    query_results = cur.fetchall()
    print(query_results)
except Exception as e:
    print("Database connection failed due to {}".format(e))                
                