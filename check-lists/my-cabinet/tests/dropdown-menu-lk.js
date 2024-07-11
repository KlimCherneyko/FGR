import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import { dropdownButtons, dropdownBodyXPath } from "../xpaths.js";
import { hoverOverElement } from "../../../utils/common.js";

export default {
  "Dropdown menu LK": async (driver) => {
    await driver.get("https://preprod.artgor.ru/");

    const dropdownButtonXPathList = Object.values(dropdownButtons);
    const urls = Object.keys(dropdownButtons);

    // for (let i = 0; i < array.length; i++) {
    //   const element = array[i];

    // }

    for (let i = 0; i < dropdownButtonXPathList.length; i++) {
      await hoverOverElement(
        driver,
        By.className("header-cabinet"),
        By.xpath(dropdownBodyXPath)
      );

      const buttonContainer = await driver.findElement(
        By.xpath(dropdownButtonXPathList[i])
      );

      await buttonContainer.click();

      await driver.sleep(200);

      const currentUrl = await driver.getCurrentUrl();

      assert.ok(currentUrl.includes(urls[i]));
    }
  },
};
