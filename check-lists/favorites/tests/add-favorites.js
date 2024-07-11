import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import {
  buttonCatalogXpath,
  buttonSouvenirProductsXpath,
  lpXpath,
  bigFavoriteXpath,
  productContainerXpath,
} from "../xpaths.js";

import { getChildrenXpath, random } from "../../../utils/common.js";

export default {
  "add favorites": async (driver) => {
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

    await randomProduct.findElement(By.css('[data-action="favorite"]')).click();

    ///получаю общий класс для элементов и внутри него вызываю индивидуальный id
    const idElementCatalog = await randomProduct.findElement(
      By.css(".catalog-block__info")
    );
    const idCatalog = await idElementCatalog.getAttribute("data-id");

    await driver.findElement(By.xpath(lpXpath)).click();
    await driver.findElement(By.xpath(bigFavoriteXpath)).click();

    const idElementFavorite = await driver.findElement(
      By.css(".catalog-block__info")
    );
    const idFavorite = await idElementFavorite.getAttribute("data-id");

    assert.ok(idCatalog.includes(idFavorite), "wrong id");
    ///нужно удалить товар нажав на сердечко
    await driver.findElement(By.css('[data-action="favorite"]')).click();
    await driver.wait(until.elementLocated(By.css(".notetext")), 2000);
  },
};
