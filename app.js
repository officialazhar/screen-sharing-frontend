const socket = io("https://screen-sharing-backend.onrender.com/", {
    transports: ["websocket", "polling"]
}); // Backend URL

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("app-container").style.display = "flex";
    } else {
        alert("Invalid Credentials! Please try again.");
    }
}

// Ensure login button is working
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-btn").addEventListener("click", login);
});
