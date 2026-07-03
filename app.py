from flask import Flask, render_template, request, redirect, session
import os
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "tuition_secret_key_123")

# রেন্ডারের Environment Variables থেকে সরাসরি ডাটাবেজ ইউআরএল নেবে
DATABASE_URL = os.environ.get("DATABASE_URL")

def get_db_connection():
    # সরাসরি PostgreSQL ডাটাবেজের সাথে কানেক্ট করার ফাংশন
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

# টেবিল তৈরি করার ফাংশন (যদি না থাকে)
def init_db():
    if DATABASE_URL:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS teachers (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                phone TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        ''')
        conn.commit()
        cur.close()
        conn.close()

# অ্যাপ রান হওয়ার সময় টেবিল তৈরি হবে
try:
    init_db()
except Exception as e:
    print("Database init error:", e)

ADMIN_USERNAME = "9749469918"
ADMIN_PASSWORD = "000"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login/<role>", methods=["GET", "POST"])
def login(role):
    error = None
    if request.method == "POST":
        username_or_phone = request.form.get("username_or_phone")
        password = request.form.get("password")
        
        if role == "admin":
            if username_or_phone == ADMIN_USERNAME and password == ADMIN_PASSWORD:
                session["user"] = {"role": "admin", "username": ADMIN_USERNAME}
                return redirect("/admin/dashboard")
            else:
                error = "Invalid Admin Username or Password"
        
        elif role == "teacher":
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute("SELECT * FROM teachers WHERE phone = %s", (username_or_phone,))
                user_data = cur.fetchone()
                cur.close()
                conn.close()
                
                if user_data and user_data["password"] == password:
                    session["user"] = {"role": "teacher", "username": user_data["name"]}
                    return redirect("/teacher/dashboard")
                else:
                    error = "Invalid Phone Number or Password"
            except Exception as e:
                error = "Database Error! Try again."
        else:
            session["user"] = {"role": role, "username": username_or_phone}
            return redirect(f"/{role}/dashboard")
            
    return render_template(f"login_{role}.html", role=role, error=error)

@app.route("/signup/<role>", methods=["GET", "POST"])
def signup(role):
    if role == "admin":
        return redirect("/")
        
    if request.method == "POST":
        if role == "teacher":
            name = request.form.get("name")
            phone = request.form.get("phone")
            password = request.form.get("password")
            
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute("INSERT INTO teachers (name, phone, password) VALUES (%s, %s, %s)", (name, phone, password))
                conn.commit()
                cur.close()
                conn.close()
                return redirect(f"/login/{role}")
            except Exception as e:
                return "Registration Failed! Phone number might already exist."
        else:
            return redirect(f"/login/{role}")
        
    return render_template(f"signup_{role}.html", role=role)

@app.route("/admin/dashboard")
def admin_dashboard():
    if "user" not in session or session["user"]["role"] != "admin":
        return redirect("/")
    return render_template("admin_dashboard.html")

@app.route("/teacher/dashboard")
def teacher_dashboard():
    if "user" not in session or session["user"]["role"] != "teacher":
        return redirect("/")
    return render_template("teacher_dashboard.html")

@app.route("/student/dashboard")
def student_dashboard():
    if "user" not in session or session["user"]["role"] != "student":
        return redirect("/")
    return render_template("student_dashboard.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
