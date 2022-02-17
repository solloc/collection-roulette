document.addEventListener('keydown', logKey);
function logKey(e) {
    if (e.code === "KeyR") {
        console.log("refreshing");
        window.location.href = '/post/random';
    }
}