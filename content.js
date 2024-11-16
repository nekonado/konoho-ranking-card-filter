const buttonSelector =
  "[class*=RankingCardDisplayButton_konohoken_button_ellipse]";
const cardListSelector = "[class*=RankingCardList_card_list_block]";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { productNames } = message;

  if (!productNames) {
    console.warn("商品名が指定されていません。");
    return;
  }

  const targetProducts = productNames.split(",").map((name) => name.trim());

  async function loadAndFilterRankingCards() {
    let button = document.querySelector(buttonSelector);
    while (button) {
      button.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      button = document.querySelector(buttonSelector);
    }

    const parentBlock = document.querySelector(cardListSelector);
    if (!parentBlock) {
      console.warn("RankingCardList_card_list_blockが見つかりません。");
      return;
    }

    const cards = parentBlock.querySelectorAll(":scope > div");
    cards.forEach((card) => {
      if (
        !targetProducts.some((product) => card.textContent.includes(product))
      ) {
        card.remove();
      }
    });

    console.log("指定した商品名に一致するカードのみが残りました。");
  }

  loadAndFilterRankingCards();
});
