function renderHeader() {
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    if (window.location.pathname.endsWith("/")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
        return;
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav>
  `;

    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    }

    if (role === "admin") {
        headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
      <a href="#" onclick="logout()">Logout</a>
    `;
    }
    else if (role === "doctor") {
        headerContent += `
      <button class="adminBtn" onclick="window.location.href='/templates/doctor/doctorDashboard.html'">Home</button>
      <a href="#" onclick="logout()">Logout</a>
    `;
    }
    else if (role === "patient") {
        headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>
    `;
    }
    else if (role === "loggedPatient") {
        headerContent += `
      <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
      <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
      <a href="#" onclick="logoutPatient()">Logout</a>
    `;
    }
    else {
        headerContent += `
      <button id="loginBtn" class="adminBtn">Login</button>
      <button id="signupBtn" class="adminBtn">Sign Up</button>
    `;
    }

    headerContent += `
      </nav>
    </header>
  `;

    headerDiv.innerHTML = headerContent;

    attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
    const loginBtn = document.getElementById("patientLogin") || document.getElementById("loginBtn");
    const signupBtn = document.getElementById("patientSignup") || document.getElementById("signupBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            alert("Opening login modal...");
            // openModal('loginModal');  // optional modal logic
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            alert("Opening signup modal...");
            // openModal('signupModal');
        });
    }
}

function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    window.location.href = "/";
}

function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    window.location.href = "/pages/patientDashboard.html";
}

renderHeader();
