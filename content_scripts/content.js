function getTextFromXPath(xpath) {
    return new XPathEvaluator()
        .createExpression(xpath)
        .evaluate(document, XPathResult.FIRST_ORDERED_NODE_TYPE)
        .singleNodeValue.textContent.trim()
}

function textToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        console.log("Copied to clipboard")
        console.log(text)
    }, function () {
        console.log("Copying to clipboard failed")
    });
}

function execute(request, sender, sendResponse) {
    title = getTextFromXPath('//*[@id="productTitle"]')
    low_high_price = getTextFromXPath('//*[@id="priceblock_ourprice"]')

    textToClipboard(JSON.stringify({
        title, price: low_high_price
    }))

    browser.runtime.onMessage.removeListener(execute);
}


browser.runtime.onMessage.addListener(execute);