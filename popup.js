document.addEventListener('DOMContentLoaded', () => {

  // First, set up the listener to receive the message from the content script.
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "policyData") {
      document.getElementById('status').style.display = 'none';
      document.getElementById('results').style.display = 'block';
      document.getElementById('risk-level').innerText = `Risk Level: ${message.riskLevel}`;
      document.getElementById('summary').innerText = message.summary;
    }
  });

  // Then, get the active tab and execute the contentScript.js
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['contentScript.js']
    });
  });

});