function injectCheatScript(code) {
  const script = document.createElement('script');
  script.textContent = code;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'applyCheats') {
    const { bananas, pumpkins } = request.payload;
    const code = `
      (function() {
        if (typeof bananas === 'number') bananas += ${bananas};
        if (typeof pumpkins === 'number') pumpkins += ${pumpkins};
        if (typeof saveAndUpdate === 'function') saveAndUpdate();
        alert('Cheats applied: +${bananas} bananas, +${pumpkins} pumpkins');
      })();
    `;
    injectCheatScript(code);
    sendResponse({ status: 'done' });
  }
  return true; // Keep channel open for async response
});
