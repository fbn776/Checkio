import sqlite3

# Connect to the database
_sql_conn = sqlite3.connect("store.db")
_sql_cursor = _sql_conn.cursor()


def get_db() -> tuple[sqlite3.Connection, sqlite3.Cursor]:
    """
    Returns the database connection and cursor, the current implementation reuses the same connection and cursor.
    This might cause an issue in a multithreaded environment
    see:
        - https://flask.palletsprojects.com/en/2.0.x/patterns/sqlite3/
        - https://chatgpt.com/share/67a852a8-7e44-8000-b4bb-ec911596f17d
    :return: Tuple[sqlite3.Connection, sqlite3.Cursor]
    """
    return _sql_conn, _sql_cursor
