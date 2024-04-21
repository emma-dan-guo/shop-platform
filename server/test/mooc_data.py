# using mysql-connector-python
# python -m pip install mysql-connector-python
import os
import random
import string
import hashlib
import urllib.parse

import mysql.connector # type: ignore

database_url = os.getenv('DATABASE_URL')
if database_url == '':
    print('Cannot get enviroment variable DATABASE_URL.')
    exit(1)

dsn = urllib.parse.urlparse(database_url)
user_password, host_port = dsn.netloc.split('@')
user, password = user_password.split(':')
if ':' in host_port:
    host, port = host_port.split(':')
else:
    host, port = host_port, 3306

print(host_port, host, port)
mydb = mysql.connector.connect(
    host=host,
    port=port,
    user=user,
    password=password,
    database=dsn.path[1:]
)

mycursor = mydb.cursor()


def get_random_string(length=4):
    alphabet = string.ascii_letters
    return ''.join(random.choice(alphabet) for _ in range(length))


# init tbl_category
category = ('Appliance', 'Exercise', 'Food', 'Accessory')
for i in range(len(category)):
    mycursor.execute(
        "INSERT INTO tbl_category (name) VALUES (%s)",
        (category[i],)
    )

# generate shop information
sql = "INSERT INTO tbl_sales_shop_info (shopName, category, locationLongitude, locationLatitude) VALUES (%s, %s, %s, %s)"
for i in range(100):
    val = (get_random_string() + "'s",
           i % len(category),
           round(random.random() * 360 - 180, 4),  # longitude: (-180, +180)
           round(random.random() * 190 - 85, 4))  # latitude: (-85, +85)
    mycursor.execute(sql, val)

# add users
sql = "INSERT INTO tbl_user (name, password, salt) values (%s, %s, %s)"
users = (('wbb', 'test1'), ('gdd', 'test2'), ('emma', 'test3'), ('jack', 'test1'))
for username, password_plain in users:
    salt = get_random_string(10)
    password_encrypted = hashlib.sha256((password_plain + salt).encode()).hexdigest()
    mycursor.execute(sql, (username, password_encrypted, salt))

# generate for tbl_sales_turnover
# get the start ID and end ID first
mycursor.execute("SELECT id FROM tbl_sales_shop_info order by id limit 1;")
shop_start_id = mycursor.fetchall()[0][0]
mycursor.execute("SELECT id FROM tbl_sales_shop_info order by id DESC limit 1;")
shop_end_id = mycursor.fetchall()[0][0]
mycursor.execute("SELECT id FROM tbl_user order by id limit 1;")
user_start_id = mycursor.fetchall()[0][0]
mycursor.execute("SELECT id FROM tbl_user order by id DESC limit 1;")
user_end_id = mycursor.fetchall()[0][0]

# then, generate data using the shop ID
sql = "INSERT INTO tbl_sales_order (userId, shopId, salesAmount, salesCategory, productName, provinceId) VALUES (%s, %s, %s, %s, %s, %s)"
for i in range(10000):
    val = (
        random.randint(user_start_id, user_end_id + 1),
        random.randint(shop_start_id, shop_end_id + 1),
        round(random.random() * 10000, 2),
        random.randint(0, len(category)),
        get_random_string(5),
        random.randint(0, 20)
    )
    mycursor.execute(sql, val)
    print(f'\ninserted {i} rows\r')

mydb.commit()

# validate mooc data
mycursor.execute("select max(shopId), min(shopId) from tbl_sales_order;")
max_shop_id, min_shop_id = mycursor.fetchall()[0]
mycursor.execute("select max(id), min(id) from tbl_sales_shop_info;")
assert max_shop_id, min_shop_id == mycursor.fetchall()[0]

print("records inserted")
