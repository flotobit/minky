document.getElementById('applyBtn').addEventListener('click', async () => {
  const bananas = parseInt(document.getElementById('bananaInput').value) || 0;
  const pumpkins = parseInt(document.getElementById('pumpkinInput').value) || 0;

  if (bananas <= 0 && pumpkins <= 0) {
    alert('Please enter a positive number for bananas or pumpkins.');
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: 'applyCheats', payload: { bananas, pumpkins } }, (response) => {
    console.log('Cheat injection response:', response);
  });
});
