// Function to clear local storage
function startNewGame() {
    // Clear previous session data
    localStorage.removeItem('userResponses');
}

// Attach this function to the "Draw First Card" button
document.getElementById('onwards-btn').addEventListener('click', startNewGame);
