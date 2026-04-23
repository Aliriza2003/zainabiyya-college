import sqlite3

def init_db():
    # Connects to (or creates) the school database file
    conn = sqlite3.connect('zainabiyya_college.db')
    cursor = conn.cursor()
    
    # Create the table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Students (
            admission_no INTEGER PRIMARY KEY,
            full_name TEXT NOT NULL,
            grade TEXT,
            parent_contact TEXT
        )
    ''')
    conn.commit()
    conn.close()

def add_student(adm_no, name, grade, contact):
    conn = sqlite3.connect('zainabiyya_college.db')
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO Students VALUES (?, ?, ?, ?)", (adm_no, name, grade, contact))
        conn.commit()
        print(f"Successfully added: {name}")
    except sqlite3.IntegrityError:
        print("Error: Admission Number already exists.")
    finally:
        conn.close()

def view_students():
    conn = sqlite3.connect('zainabiyya_college.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Students")
    rows = cursor.fetchall()
    
    print("\n--- Student List ---")
    for row in rows:
        print(f"ID: {row[0]} | Name: {row[1]} | Grade: {row[2]} | Contact: {row[3]}")
    conn.close()

# --- Main Execution ---
init_db()
# Example: add_student(101, "Ayesha Khan", "Grade 10", "077-1234567")
# view_students()