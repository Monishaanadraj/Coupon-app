function claimCoupon() {
    console.log("Claim Coupon function called...");

    fetch("https://capricious-whip-trapezoid.glitch.me/api/claim", { 
        method: "POST", 
        credentials: "include", // ✅ Keep credentials enabled
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data);
        document.getElementById("message").innerText = data.message;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Failed to load data!";
    });
}
