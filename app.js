const socket = io("https://screen-sharing-backend.onrender.com/", {
    transports: ["websocket", "polling"]
}); // Backend URL

let localStream;

document.getElementById("start-share").addEventListener("click", async () => {
    try {
        localStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        document.getElementById("screen-video").srcObject = localStream;

        socket.emit("join-room", "screen-room", socket.id);

        document.getElementById("start-share").style.display = "none";
        document.getElementById("stop-share").style.display = "inline-block";
    } catch (error) {
        console.error("Error accessing screen sharing:", error);
        alert("Screen sharing is not supported or permission denied.");
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
