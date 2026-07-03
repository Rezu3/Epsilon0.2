from flask import Flask, render_template, request, redirect, session
import os

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "tuition_secret_key_123")

# অ্যাডমিনের নির্দিষ্ট ইউজারনেম ও পাসওয়ার্ড (যা রেজিস্ট্রেশন ছাড়াই কাজ করবে)
ADMIN_USERNAME = "9749469918"
ADMIN_PASSWORD = "000"  # আপনি আপনার সুবিধামতো পরিবর্তন করে নেবেন

# ---------------------------------------------
# ১. ল্যান্ডিং পেজ (Welcome & 3 Iconic Options)
# ---------------------------------------------
@app.route("/")
def index():
    return render_template("index.html")

# ---------------------------------------------
# ২. লগইন ও রেজিস্ট্রেশন রুট (Routes)
# ---------------------------------------------
@app.route("/login/<role>", methods=["GET", "POST"])
def login(role):
    error = None
    if request.method == "POST":
        # অ্যাডমিনের জন্য ইউজারনেম, টিচার ও স্টুডেন্টের জন্য ফোন নম্বর ব্যবহার হবে
        username_or_phone = request.form.get("username_or_phone")
        password = request.form.get("password")
        
        # অ্যাডমিন লগইন ভেরিফিকেশন
        if role == "admin":
            if username_or_phone == ADMIN_USERNAME and password == ADMIN_PASSWORD:
                session["user"] = {"role": "admin", "username": ADMIN_USERNAME}
                return redirect("/admin/dashboard")
            else:
                error = "Invalid Admin Username or Password"
        
        # টিচার ও স্টুডেন্ট লগইন (এখানে পরবর্তীতে Supabase ভেরিফিকেশন বসবে)
        else:
            # সাময়িকভাবে সরাসরি ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে
            session["user"] = {"role": role, "username": username_or_phone}
            return redirect(f"/{role}/dashboard")
            
    return render_template(f"login_{role}.html", role=role, error=error)

@app.route("/signup/<role>", methods=["GET", "POST"])
def signup(role):
    if role == "admin":
        return redirect("/")
        
    if request.method == "POST":
        # এখানে পরবর্তীতে Supabase-এ টিচার/স্টুডেন্ট ডেটা সেভ হবে
        return redirect(f"/login/{role}")
        
    return render_template(f"signup_{role}.html", role=role)

# ---------------------------------------------
# ৩. ড্যাশবোর্ড রুট (Dashboards)
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
# ৪. লগআউট (Logout)
# ---------------------------------------------
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)