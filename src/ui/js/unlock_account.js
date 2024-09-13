document.getElementById('unlockForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const unlockCode = document.getElementById('unlockCode').value;

  fetch('/unlock-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ unlockCode: unlockCode }),
  })
  .then(response => response.json())
  .then(data => {
    const responseMessage = document.getElementById('responseMessage');
    if (data.message === 'Done') {
      responseMessage.textContent = 'Your account has been successfully unlocked!';
    } else {
      responseMessage.textContent = data.message;
    }
  })
  .catch(error => {
    document.getElementById('responseMessage').textContent = 'Error: Something went wrong!';
  });
});
