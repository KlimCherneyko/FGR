import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import {
  buttonCatalogXpath,
  buttonSouvenirProductsXpath,
  lpXpath,
  bigBasketXpath,
  productContainerXpath,
  productInBasketXpath,
  basketTopXpath,
  deleteXpath,
} from "../xpaths.js";

import { getChildrenXpath, random } from "../../../utils/common.js";

export default {
  "add product basket": async (driver) => {
    await driver.get("https://preprod.artgor.ru");
    await driver.findElement(By.xpath(buttonCatalogXpath)).click();
    await driver.findElement(By.xpath(buttonSouvenirProductsXpath)).click();
    const productsContainer = await driver.findElement(
      By.xpath(productContainerXpath)
    );
    const products = await productsContainer.findElements(
      By.xpath(getChildrenXpath)
    );
    const randomProduct = await products[random(0, products.length - 1)];

    await randomProduct.findElement(By.css('[data-action="basket"]')).click();

    await driver.findElement(By.xpath(productInBasketXpath)).click();

    ///получаю общий класс для элементов и внутри него вызываю индивидуальный id
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
    // /нужно удалить товар нажав на урну
    await driver.sleep(1000);
    await driver.findElement(By.xpath(deleteXpath)).click();
    await driver.findElement(By.css(".basket-total-block__clear")).click();
    await driver.wait(
      until.elementLocated(By.css(".bx-sbb-empty-cart-text")),
      2000
    );
  },
};
