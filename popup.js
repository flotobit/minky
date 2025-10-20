document.getElementById('applyBtn').addEventListener('click', async () => {
  const bananas = parseInt(document.getElementById('bananaInput').value) || 0;
  const pumpkins = parseInt(document.getElementById('pumpkinInput').value) || 0;

  if (bananas <= 0 && pumpkins <= 0) {
    alert('Please enter a positive number for bananas or pumpkins.');
    return;
  }

  const cheatCode = `
    (function() {
      if (typeof bananas === 'number') bananas += ${bananas};
      if (typeof pumpkins === 'number') pumpkins += ${pumpkins};
      if (typeof saveAndUpdate === 'function') saveAndUpdate();
      alert('Added ${bananas} bananas and ${pumpkins} pumpkins!');
    })();
  `;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (code) => {
      const script = document.createElement('script');
      script.textContent = code;
      (document.head || document.documentElement).appendChild(script);
      script.remove();
    },
    args: [cheatCode],
  });
});
