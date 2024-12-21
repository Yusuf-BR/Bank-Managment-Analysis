document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear user session or authentication
            localStorage.removeItem('loggedInUser');
            // Redirect to login page
            window.location.href = 'index.html'; // Adjust path if necessary
        });
    }
});

// JavaScript for Login and Sign-Up
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const fullname = document.getElementById('signupFullname').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const role = document.getElementById('signupRole').value;
    const gender = document.getElementById('signupGender').value;

    if (!username || !password || !fullname || !email || !gender) {
        alert('All fields are required.');
        return;
    }

    if (!validatePassword(password)) {
        alert('Password must be at least 8 characters long and contain letters, numbers, and special characters.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Email must be a valid @gmail.com address.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.username === username)) {
        alert('Username already exists. Please choose a different one.');
        return;
    }

    users.push({ username, password, fullname, email, role, gender });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful! Please log in.');
    toggleForm('login');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert('Username and Password are required.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert(`Welcome, ${user.role}!`);
        // Store the logged-in user information
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        // Redirect or load the respective dashboard based on role
        if (user.role === 'admin') {
            window.location.href = 'admin_dashboard.html';
        } else {
            window.location.href = 'user_dashboard.html';
        }
    } else {
        alert('Invalid username or password.');
    }
});

function validatePassword(password) {
    const minLength = 8;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasLetters && hasNumbers && hasSpecialChars;
}

function validateEmail(email) {
    const gmailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
}

function toggleForm(form) {
    if (form === 'signup') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
    } else {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    }
}
