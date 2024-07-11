import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome.js";

import myCabinetDescribe from "./my-cabinet/describe.js";
import catalogDescribe from "./catalog/describe.js";
import productBuyDescribe from "./product-buy/describe.js";
import favoritesDescribe from "./favorites/describe.js";
import basket from "./basket/describe.js";

const describes = {
  ...myCabinetDescribe,
  ...catalogDescribe,
  ...favoritesDescribe,
  ...basket,
  ...productBuyDescribe,
};

for (let describeName in describes) {
  describe(describeName, async () => {
    let driver;

    // before(async () => {
    //   driver = await new Builder().forBrowser("chrome").build();
    // });
    before(async () => {
      let options = new Options();
      if (false) {
        options.addArguments("--headless");
      }
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    });

    for (let itName in describes[describeName]) {
      it(itName, async () => {
        await describes[describeName][itName](driver);
      });
    }
  });
}

// describes[describeName]
