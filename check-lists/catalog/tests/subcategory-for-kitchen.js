import { By, until } from "selenium-webdriver";
import { assert, expect } from "chai";
import {
  catalogButtonXpath,
  buttonForKitchenXpath,
  urlKeysForKitchen,
  roditelForKitchenXpath,
  roditelForKitchenIconXpath,
  productForKitchenXpath,
} from "../xpaths-old.js";

export default {
  subcategoryForKitchen: async (driver) => {
    await driver.get("https://preprod.artgor.ru");

    const catalogButton = await driver.findElement(
      By.xpath(catalogButtonXpath)
    );
    catalogButton.click();
    await driver.sleep(1000);
    const buttonForKithen = await driver.findElement(
      By.xpath(buttonForKitchenXpath)
    );
    await buttonForKithen.click();

    const urls = Object.keys(urlKeysForKitchen);

    const roditel = await driver.findElement(By.xpath(roditelForKitchenXpath));
    const children = await roditel.findElements(By.xpath("./child::*"));

    for (let i = 0; i < children.length; i++) {
      const roditel2 = await driver.findElement(
        By.xpath(roditelForKitchenXpath)
      );
      const children2 = await roditel2.findElements(By.xpath("./child::*"));
      const child = await children2[i].findElement(By.css("a"));
      await child.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.ok(currentUrl.includes(urls[i]));
    }

    await driver.findElement(By.xpath(productForKitchenXpath)).click();
    const roditelIcon = await driver.findElement(
      By.xpath(roditelForKitchenIconXpath)
    );
    const childrenIcon = await roditelIcon.findElements(By.xpath("./child::*"));

    for (let i = 0; i < childrenIcon.length; i++) {
      const roditelIcon2 = await driver.findElement(
        By.xpath(roditelForKitchenIconXpath)
      );
      const childrenIcon2 = await roditelIcon2.findElements(
        By.xpath("./child::*")
      );
      const child = await childrenIcon2[i].findElement(By.css("a"));
      await child.click();

      const currentUrl = await driver.getCurrentUrl();
      assert.ok(currentUrl.includes(urls[i]));

      await driver.navigate().back();
    }
  },
};
