from src.core.db.db import sql_cursor

sql_cursor.execute("CREATE TABLE IF NOT EXISTS testcases (id INTEGER PRIMARY KEY, name TEXT, input TEXT, output TEXT)")