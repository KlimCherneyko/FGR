import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import {
  ordersXpath,
  historyOrdersXpath,
  canselOrdersXpath,
  correntOrdersXpath,
} from "../xpaths.js";

import { isMatchedPathName, hasQueryParam } from "../../../utils/common.js";

export default {
  "History of orders": async (driver) => {
    const orders = await driver.wait(
      until.elementLocated(By.xpath(ordersXpath)),
      10000
    );
    orders.click();
    const histiryOrders = await driver.wait(
      until.elementLocated(By.xpath(historyOrdersXpath)),
      5000
    );
    histiryOrders.click();

    await driver.sleep(500);

    const canselOrders = await driver.wait(
      until.elementLocated(By.xpath(canselOrdersXpath)),
      5000
    );
    canselOrders.click();
    assert.ok(await isMatchedPathName(driver, "/personal/orders/"));
    assert.ok(await hasQueryParam(driver, "filter_history"));
    const correntOrders = await driver.wait(
      until.elementLocated(By.xpath(correntOrdersXpath)),
      5000
    );
    correntOrders.click();
  },
};
