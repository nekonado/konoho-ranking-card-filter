document.getElementById("filterButton").addEventListener("click", async () => {
  const productNames = document.getElementById("productNames").value.trim();

  if (!productNames) {
    alert("商品名を入力してください。");
    return;
  }

  // content.js にメッセージを送信
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        },
        () => {
          chrome.tabs.sendMessage(tabs[0].id, { productNames });
        }
      );
    }
  });
});
