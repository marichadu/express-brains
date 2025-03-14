document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const guessForm = document.getElementById('guessForm');
  const guessInput = document.getElementById('guessInput');
  const timerDiv = document.getElementById('timer');
  const resultDiv = document.getElementById('result');
  const questionMarkDiv = document.querySelector('.question-mark');

  let gameState = {
    attempts: 0,
    startTime: null,
    gameOver: false,
  };

  if (playButton) {
    playButton.addEventListener('click', async () => {
      playButton.style.display = 'none';
      guessForm.style.display = 'block';
      timerDiv.style.display = 'block';
      gameState.attempts = 0;

      // Send a request to the server to update the start time
      await fetch('/start-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      gameState.startTime = Date.now(); // Set the client-side start time
      startCountdownTimer();
    });
  }

  if (guessForm) {
    guessForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const guess = parseInt(guessInput.value, 10);
      if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Invalid guess! Please enter a number between 1 and 100.');
        return;
      }
      const response = await fetch('/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess }),
      });
      const data = await response.json();

      if (data.correct) {
        questionMarkDiv.style.color = 'green';
        questionMarkDiv.textContent = data.correctNumber || '?';
        resultDiv.innerHTML = data.message;
        stopCountdownTimer();
        guessForm.style.display = 'none';
        timerDiv.style.display = 'none';
        gameState.gameOver = true;

        playButton.style.display = 'block';
        playButton.textContent = 'Play Again';
        playButton.onclick = () => {
          resetGame();
        };
      } else {
        gameState.attempts = data.attempts;
        resultDiv.innerHTML = `Tentatives: ${gameState.attempts}<br>${data.message}`;
        guessInput.value = '';
      }
    });
  }

  function startCountdownTimer() {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeTaken = currentTime - gameState.startTime;

      const minutes = Math.floor(timeTaken / 60000);
      const seconds = Math.floor((timeTaken % 60000) / 1000);
      const milliseconds = Math.floor((timeTaken % 1000) / 10);

      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
      timerDiv.textContent = formattedTime;
    }, 10);
    gameState.intervalId = intervalId;
  }

  function stopCountdownTimer() {
    clearInterval(gameState.intervalId);
  }

  function resetGame() {
    gameState.attempts = 0;
    gameState.startTime = Date.now();
    gameState.gameOver = false;

    questionMarkDiv.style.color = 'black';
    questionMarkDiv.textContent = '?';
    resultDiv.innerHTML = '';
    guessInput.value = '';
    guessForm.style.display = 'block';
    timerDiv.style.display = 'block';

    startCountdownTimer();
    playButton.style.display = 'none';
  }

  // Admin delete button logic
  const deleteButtons = document.querySelectorAll('.delete-btn');

  if (deleteButtons.length > 0) {
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const userId = event.target.getAttribute('data-id');

        // Show confirmation dialog
        const confirmed = confirm('Are you sure you want to delete this user?');
        if (!confirmed) {
          return; // Exit if the user cancels the action
        }

        try {
          const response = await fetch(`/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            event.target.closest('tr').remove();
            alert('User deleted successfully');
          } else {
            alert('Failed to delete user');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred');
        }
      });
    });
  }
});

