# User Stories for Patient Appointment Portal

## User Story Template
**Title:**  
_As a [user role], I want [feature/goal], so that [reason]._

**Acceptance Criteria:**  
1. [Criteria 1]  
2. [Criteria 2]  
3. [Criteria 3]  

**Priority:** [High/Medium/Low]  
**Story Points:** [Estimated Effort in Points]  
**Notes:**  
- [Additional information or edge cases]

---

## 👨‍💼 Admin User Stories

**1.**  
**Title:** Admin Login  
_As an admin, I want to log into the portal using my username and password, so that I can manage the platform securely._  
**Acceptance Criteria:**  
1. Login accepts valid credentials.  
2. Invalid credentials show an error.  
**Priority:** High  
**Story Points:** 2  

**2.**  
**Title:** Admin Logout  
_As an admin, I want to log out of the portal, so that I can protect system access._  
**Acceptance Criteria:**  
1. Logout ends session securely.  
**Priority:** High  
**Story Points:** 1  

**3.**  
**Title:** Add Doctor  
_As an admin, I want to add doctors to the system, so that they can start managing appointments._  
**Acceptance Criteria:**  
1. Admin can add new doctor profiles with basic info.  
2. Doctor receives a confirmation email.  
**Priority:** High  
**Story Points:** 3  

**4.**  
**Title:** Delete Doctor  
_As an admin, I want to delete a doctor’s profile, so that I can keep the system up-to-date._  
**Acceptance Criteria:**  
1. Deleted doctors are removed from active lists.  
**Priority:** Medium  
**Story Points:** 2  

**5.**  
**Title:** Monthly Reports  
_As an admin, I want to run a stored procedure in MySQL CLI to get monthly appointment counts, so that I can analyze usage statistics._  
**Priority:** Medium  
**Story Points:** 3  

---

## 🧍‍♀️ Patient User Stories

**1.**  
**Title:** View Doctors  
_As a patient, I want to view a list of doctors without logging in, so that I can choose before registration._  
**Acceptance Criteria:**  
1. Doctor list displays specialization and availability.  
**Priority:** Medium  
**Story Points:** 2  

**2.**  
**Title:** Patient Sign Up  
_As a patient, I want to sign up using my email and password, so that I can book appointments._  
**Priority:** High  
**Story Points:** 3  

**3.**  
**Title:** Manage Bookings  
_As a patient, I want to log in and manage my bookings, so that I can update or cancel them easily._  
**Priority:** High  
**Story Points:** 3  

**4.**  
**Title:** Patient Logout  
_As a patient, I want to log out of the portal, so that I can secure my account._  
**Priority:** Medium  
**Story Points:** 1  

**5.**  
**Title:** View Upcoming Appointments  
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._  
**Priority:** Medium  
**Story Points:** 2  

---

## 👨‍⚕️ Doctor User Stories

**1.**  
**Title:** Doctor Login  
_As a doctor, I want to log into the portal, so that I can view my appointments._  
**Priority:** High  
**Story Points:** 2  

**2.**  
**Title:** Doctor Logout  
_As a doctor, I want to log out, so that I can protect my personal data._  
**Priority:** Medium  
**Story Points:** 1  

**3.**  
**Title:** Appointment Calendar  
_As a doctor, I want to view my appointment calendar, so that I can stay organized._  
**Priority:** High  
**Story Points:** 3  

**4.**  
**Title:** Mark Unavailability  
_As a doctor, I want to mark my unavailability, so that patients only book available time slots._  
**Priority:** High  
**Story Points:** 3  

**5.**  
**Title:** Update Profile  
_As a doctor, I want to update my specialization and contact info, so that patients have the latest details._  
**Priority:** Medium  
**Story Points:** 2  
