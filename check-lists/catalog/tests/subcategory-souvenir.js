import { By, until } from "selenium-webdriver";
import { assert, expect } from "chai";
import {
  catalogButtonXpath,
  buttonSuvenirProductsXpath,
  UrlKeysSuvenirProducts,
  roditelSuvenirProductsIconXpath,
  roditelSuvenirProductsXpath,
  suvenirProductsKategoryXpath,
  roditelIteriorItemsIconXpath,
} from "../xpaths-old.js";

export default {
  subcategorySouvenir: async (driver) => {
    await driver.get("https://preprod.artgor.ru");

    const catalogButton = await driver.findElement(
      By.xpath(catalogButtonXpath)
    );
    catalogButton.click();
    await driver.sleep(1000);
    const buttonSuvenirProducts = await driver.findElement(
      By.xpath(buttonSuvenirProductsXpath)
    );
    await buttonSuvenirProducts.click();

    const urls = Object.keys(UrlKeysSuvenirProducts);

    const roditel = await driver.findElement(
      By.xpath(roditelSuvenirProductsXpath)
    );
    const children = await roditel.findElements(By.xpath("./child::*"));

    for (let i = 0; i < children.length; i++) {
      const roditel2 = await driver.findElement(
        By.xpath(roditelSuvenirProductsXpath)
      );
      const children2 = await roditel2.findElements(By.xpath("./child::*"));
      const child = await children2[i].findElement(By.css("a"));
      await child.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.ok(currentUrl.includes(urls[i]));
    }

    await driver.findElement(By.xpath(suvenirProductsKategoryXpath)).click();
    const roditelIcon = await driver.findElement(
      By.xpath(roditelIteriorItemsIconXpath)
    );
    const childrenIcon = await roditelIcon.findElements(By.xpath("./child::*"));

    for (let i = 0; i < childrenIcon.length; i++) {
      const roditelIcon2 = await driver.findElement(
        By.xpath(roditelSuvenirProductsIconXpath)
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
