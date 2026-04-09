// =================== Hide Forms ===================
function hideForms() {
    document.getElementById("studentlogin").style.display = "none";
    document.getElementById("companylogin").style.display = "none";
    document.getElementById("studentregister").style.display = "none";
    document.getElementById("companyregister").style.display = "none";
    document.getElementById("loginoptions").style.display = "none";

    // Clear any previous messages when switching forms
    let msgs = document.querySelectorAll('.form-msg');
    msgs.forEach(m => m.style.display = 'none');
}

// =================== Message Helper ===================
function showMsg(id, text, isError = true) {
    let msgDiv = document.getElementById(id);
    msgDiv.innerText = text;
    msgDiv.className = isError ? "form-msg msg-error" : "form-msg msg-success";
}

// =================== Show Forms ===================
function showStudentLogin() {
    hideForms();
    document.getElementById("studentlogin").style.display = "block";
}

function showCompanyLogin() {
    hideForms();
    document.getElementById("companylogin").style.display = "block";
}

function showStudentRegister() {
    hideForms();
    document.getElementById("studentregister").style.display = "block";
}

function showCompanyRegister() {
    hideForms();
    document.getElementById("companyregister").style.display = "block";
}

function showOptions() {
    hideForms();
    document.getElementById("loginoptions").style.display = "block";

    // Clear student registration fields when going back to options

    document.getElementById("student_reg_fullname").value = "";
    document.getElementById("student_reg_department").value = "";
    document.getElementById("student_reg_phone").value = "";
    document.getElementById("student_reg_username").value = "";
    document.getElementById("student_reg_email").value = "";
    document.getElementById("student_reg_password").value = "";

    // Clear student login fields when going back to options

    document.getElementById("student_login_username").value = "";
    document.getElementById("student_login_password").value = "";

    // Clear company registration fields when going back to options
    
    document.getElementById("company_reg_name").value = "";
    document.getElementById("company_reg_email").value = "";
    document.getElementById("company_reg_password").value = "";

    // Clear company login fields when going back to options
    
    document.getElementById("company_login_name").value = "";
    document.getElementById("company_login_password").value = "";


}

// =================== Student Registration ===================
function studentRegister() {
    let fullname = document.getElementById("student_reg_fullname").value;
    let department = document.getElementById("student_reg_department").value;
    let phone = document.getElementById("student_reg_phone").value;
    let username = document.getElementById("student_reg_username").value;
    let email = document.getElementById("student_reg_email").value;
    let password = document.getElementById("student_reg_password").value;

    if (!username || !password) {
        showMsg("student_reg_msg", "Username and password are required!");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (students.find(s => s.username === username)) {
        showMsg("student_reg_msg", "Username already exists!");
        return;
    }

    students.push({ fullname, department, phone, email, username, password });
    localStorage.setItem("students", JSON.stringify(students));

    showMsg("student_reg_msg", "Account created! Redirecting to login...", false);

    // Wait a moment so the user sees the success message before switching
    setTimeout(() => {
        showStudentLogin();
    }, 1500);
}

// =================== Student Login ===================
function studentLogin() {
    let username = document.getElementById("student_login_username").value;
    let password = document.getElementById("student_login_password").value;

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let found = students.find(s => s.username === username && s.password === password);

    if (found) {
        showMsg("student_login_msg", "Login successful! Welcome.", false);
        setTimeout(() => {
            window.location.href = "main.html";
        }, 1000);
    } else {
        showMsg("student_login_msg", "Invalid username or password!");
    }
}

// =================== Company Registration ===================
function companyRegister() {
    let name = document.getElementById("company_reg_name").value;
    let email = document.getElementById("company_reg_email").value;
    let password = document.getElementById("company_reg_password").value;

    if (!name || !password) {
        showMsg("company_reg_msg", "Company name and password are required!");
        return;
    }

    let companies = JSON.parse(localStorage.getItem("companies")) || [];

    if (companies.find(c => c.name === name)) {
        showMsg("company_reg_msg", "Company already exists!");
        return;
    }

    companies.push({ name, email, password });
    localStorage.setItem("companies", JSON.stringify(companies));

    showMsg("company_reg_msg", "Company registered successfully!", false);

    setTimeout(() => {
        showCompanyLogin();
    }, 1500);
}

// =================== Company Login ===================
function companyLogin() {
    let name = document.getElementById("company_login_name").value;
    let password = document.getElementById("company_login_password").value;

    let companies = JSON.parse(localStorage.getItem("companies")) || [];
    let found = companies.find(c => c.name === name && c.password === password);

    if (found) {
        showMsg("company_login_msg", "Login successful!", false);
        setTimeout(() => {
            window.location.href = "company_main.html";
        }, 1000);
    } else {
        showMsg("company_login_msg", "Invalid company name or password!");
    }
}

// =================== Toggle Sidebar ===================
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}



// =================== Load Dashboard ==================
function loadDashboard() {
    // Show the dashboard home section and hide others
    document.querySelector(".dashboard-home").style.display = "block";
    document.querySelector(".dashboard-jobs").style.display = "block";
    document.querySelector(".dashboard-students").style.display = "none";
    document.querySelector(".dashboard-companies").style.display = "none";
    document.querySelector(".dashboard-analytics").style.display = "none";
    document.querySelector(".dashboard-settings").style.display = "none";
}   
