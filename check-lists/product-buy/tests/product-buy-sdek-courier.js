import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import {
  buttonCatalogXpath,
  interioiItemsXpath,
  basketTopXpath,
  basketButtonXpath,
  basketButtonFinalXpath,
  butotnChangeXpath,
  buttonSdekCourierXpath,
  anotherCityXpath,
  nigneiNovgorodXpath,
  tableOrderXpath,
  productContainerXpath,
  coockieXpath,
} from "../xpaths.js";

import {
  hasQueryParam,
  random,
  getChildrenXpath,
} from "../../../utils/common.js";
export default {
  "product buy SDEK courier": async (driver) => {
    await driver.get("https://preprod.artgor.ru");
    await driver.findElement(By.xpath(buttonCatalogXpath)).click();
    await driver.sleep(1000);
    await driver.findElement(By.xpath(interioiItemsXpath)).click();

    const productsContainer = await driver.findElement(
      By.xpath(productContainerXpath)
    );
    const products = await productsContainer.findElements(
      By.xpath(getChildrenXpath)
    );
    const randomProduct = await products[random(0, products.length - 1)];
    await driver.sleep(3000);
    await randomProduct.findElement(By.css('[data-action="basket"]')).click();

    const idElementCatalog = await randomProduct.findElement(
      By.css(".catalog-block__info")
    );
    const idCatalog = await idElementCatalog.getAttribute("data-id");
    console.log("idCatalog", idCatalog);

    await driver.findElement(By.xpath(basketTopXpath)).click();

    const idElementBasket = await driver.findElement(
      By.css(".item-action__inner")
    );
    const idBasket = await idElementBasket.getAttribute("data-id");
    console.log("idBasket", idBasket);
    assert.ok(idBasket.includes(idCatalog), "wrong id");

    const basketButton = await driver.wait(
      until.elementLocated(By.xpath(basketButtonXpath)),
      200
    );
    basketButton.click();
    const buttonChange = await driver.wait(
      until.elementLocated(By.xpath(butotnChangeXpath)),
      15000
    );
    await buttonChange.click();
    await driver.findElement(By.xpath(anotherCityXpath)).click();
    await driver.findElement(By.xpath(buttonSdekCourierXpath)).click();
    await driver.sleep(1000);
    const nigneiNovgorod = await driver.wait(
      until.elementLocated(By.xpath(nigneiNovgorodXpath)),
      5000
    );
    await nigneiNovgorod.click();
    await driver.sleep(3000);
    await driver.findElement(By.css("#soa-property-1")).sendKeys("test");
    await driver
      .findElement(By.css("#soa-property-2"))
      .sendKeys("qwerty@mail.ru");
    await driver.findElement(By.css("#soa-property-3")).sendKeys("1111111111");
    await driver.findElement(By.css("#soa-property-22")).sendKeys("testtest");
    await driver.findElement(By.css("#soa-property-23")).sendKeys("99");

    await driver.findElement(By.xpath(basketButtonFinalXpath)).click();
    await driver.wait(until.elementLocated(By.xpath(tableOrderXpath)), 20000);
  },
};
