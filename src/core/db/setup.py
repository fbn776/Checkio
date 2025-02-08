import sqlite3

def init_db():
    con = sqlite3.connect("store.db")
    cur = con.cursor()
    cur.execute("CREATE TABLE movie(title, year, score)")


if __name__ == "__main__":
    init_db()
