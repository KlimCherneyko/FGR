import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import { favoriteProductsXpath } from "../xpaths.js";
import { isMatchedPathName } from "../../../utils/common.js";

export default {
  "favorite products": async (driver) => {
    const favoriteProduct = await driver.wait(
      until.elementLocated(By.xpath(favoriteProductsXpath))
    );
    favoriteProduct.click();

    await driver.sleep(500);
    assert.ok(await isMatchedPathName(driver, "/personal/favorite/"));
  },
};
