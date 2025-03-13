async function claimCoupon() {
    const response = await fetch("/claim", {
        method: "POST",
        credentials: "include"
    });

    const data = await response.json();
    document.getElementById("message").innerText = data.message;
}
