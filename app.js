const socket = io("http://localhost:5000"); // Backend ka address

let localStream;

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

document.getElementById("start-share").addEventListener("click", async () => {
    try {
        localStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        document.getElementById("screen-video").srcObject = localStream;

        socket.emit("join-room", "screen-room", socket.id);

        document.getElementById("start-share").style.display = "none";
        document.getElementById("stop-share").style.display = "inline-block";
    } catch (error) {
        console.error("Error accessing screen sharing:", error);
    }
});

// Stop Screen Sharing
document.getElementById("stop-share").addEventListener("click", () => {
    if (localStream) {
        let tracks = localStream.getTracks();
        tracks.forEach(track => track.stop());
    }

    document.getElementById("screen-video").srcObject = null;
    document.getElementById("start-share").style.display = "inline-block";
    document.getElementById("stop-share").style.display = "none";
});
