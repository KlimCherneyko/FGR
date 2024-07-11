import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import {
  myCabinetXpath,
  iconHistoryXpath,
  iconOrderXpath,
  iconPersonalDataXpath,
} from "../xpaths.js";
import { isMatchedPathName, hasQueryParam } from "../../../utils/common.js";

export default {
  "personal wrapper": async (driver) => {
    await driver.get("https://preprod.artgor.ru/");
    await driver.findElement(By.className("header-cabinet")).click();

    const iconHistory = await driver.findElement(By.xpath(iconHistoryXpath));
    iconHistory.click();
    await driver.sleep(500);

    assert.ok(await isMatchedPathName(driver, "/personal/orders/"));
    assert.ok(await hasQueryParam(driver, "filter_history"));

    await driver.findElement(By.xpath(myCabinetXpath)).click();

    const iconOrder = await driver.findElement(By.xpath(iconOrderXpath));
    iconOrder.click();
    await driver.sleep(500);

    assert.ok(await isMatchedPathName(driver, "/personal/orders/"));
    await driver.findElement(By.xpath(myCabinetXpath)).click();

    const iconPersonalData = await driver.findElement(
      By.xpath(iconPersonalDataXpath)
    );
    iconPersonalData.click();
    await driver.sleep(500);
    assert.ok(await isMatchedPathName(driver, "/personal/private/"));
    await driver.findElement(By.xpath(myCabinetXpath)).click();
  },
};
