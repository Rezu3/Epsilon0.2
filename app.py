from flask import Flask, render_template, request, redirect, session, flash
import os
from supabase import create_client, Client

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "tuition_secret_key_123")

# ---------------------------------------------
# Supabase ক্লায়েন্ট ইনিশিয়ালাইজেশন
# ---------------------------------------------
# এটি Render-এর Environment Variables থেকে URL এবং KEY খুঁজে নেবে
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# যদি Render-এ ভ্যারিয়েবল সেট করা থাকে, তবেই ক্লায়েন্ট তৈরি হবে
supabase: Client = None
if url and key:
    supabase = create_client(url, key)

# অ্যাডমিনের নির্দিষ্ট ইউজারনেম ও পাসওয়ার্ড
ADMIN_USERNAME = "9749469918"
ADMIN_PASSWORD = "000"

# ---------------------------------------------
# ১. ল্যান্ডিং পেজ
# ---------------------------------------------
@app.route("/")
def index():
    return render_template("index.html")

# ---------------------------------------------
# ২. লগইন রুট (Supabase ভেরিফিকেশন সহ)
# ---------------------------------------------
@app.route("/login/<role>", methods=["GET", "POST"])
def login(role):
    error = None
    if request.method == "POST":
        username_or_phone = request.form.get("username_or_phone")
        password = request.form.get("password")
        
        # অ্যাডমিন লগইন ভেরিফিকেশন
        if role == "admin":
            if username_or_phone == ADMIN_USERNAME and password == ADMIN_PASSWORD:
                session["user"] = {"role": "admin", "username": ADMIN_USERNAME}
                return redirect("/admin/dashboard")
            else:
                error = "Invalid Admin Username or Password"
        
        # টিচার লগইন (সরাসরি Supabase থেকে চেক হবে)
        elif role == "teacher":
            if not supabase:
                error = "Database configuration missing!"
            else:
                try:
                    # Supabase-এর teachers টেবিলে ফোন নম্বর দিয়ে খোঁজা হচ্ছে
                    response = supabase.table("teachers").select("*").eq("phone", username_or_phone).execute()
                    user_data = response.data
                    
                    if user_data and user_data[0]["password"] == password:
                        session["user"] = {"role": "teacher", "username": user_data[0]["name"]}
                        return redirect("/teacher/dashboard")
                    else:
                        error = "Invalid Phone Number or Password"
                except Exception as e:
                    error = "Database Error! Try again."
        
        # স্টুডেন্ট লগইন (আপাতত সরাসরি ড্যাশবোর্ড, পরে Supabase যুক্ত হবে)
        else:
            session["user"] = {"role": role, "username": username_or_phone}
            return redirect(f"/{role}/dashboard")
            
    return render_template(f"login_{role}.html", role=role, error=error)

# ---------------------------------------------
# ৩. রেজিস্ট্রেশন রুট (Supabase-এ ডেটা সেভ করা)
# ---------------------------------------------
@app.route("/signup/<role>", methods=["GET", "POST"])
def signup(role):
    if role == "admin":
        return redirect("/")
        
    if request.method == "POST":
        if role == "teacher":
            name = request.form.get("name")
            phone = request.form.get("phone")
            password = request.form.get("password")
            
            if not supabase:
                return "Database connection not established!"
                
            try:
                # Supabase-এর teachers টেবিলে নতুন টিচারের ডেটা ইনসার্ট
                data = {
                    "name": name,
                    "phone": phone,
                    "password": password
                }
                supabase.table("teachers").insert(data).execute()
                return redirect(f"/login/{role}")
            except Exception as e:
                return "Registration Failed! Phone number might already exist."
                
        # স্টুডেন্ট সাইনআপ (আপাতত সরাসরি লগইনে রিডাইরেক্ট)
        else:
            return redirect(f"/login/{role}")
        
    return render_template(f"signup_{role}.html", role=role)

# ---------------------------------------------
# ৪. ড্যাশবোর্ড রুটসমূহ
# ---------------------------------------------
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

# ---------------------------------------------
# ৫. লগআউট
# ---------------------------------------------
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
