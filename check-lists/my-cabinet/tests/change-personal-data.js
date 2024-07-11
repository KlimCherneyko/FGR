import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import { personalDataXpath } from "../xpaths.js";
import { isMatchedPathName } from "../../../utils/common.js";
import { useUser } from "../../../utils/auth.js";

export default {
  "change personal data": async (driver) => {
    await driver.get("https://preprod.artgor.ru/");
    await driver.findElement(By.className("header-cabinet")).click();
    await driver.findElement(By.xpath(personalDataXpath)).click();

    assert.ok(await isMatchedPathName(driver, "/personal/private/"));

    const changesName = await driver.wait(
      until.elementLocated(By.id("NAME")),
      10000
    );
    changesName.sendKeys("zxc");

    const changesEmail = await driver.findElement(By.id("EMAIL"));
    changesEmail.clear();
    const user = await useUser();
    changesEmail.sendKeys(user.login);

    const changesTelephone = await driver.findElement(By.id("PERSONAL_PHONE"));
    changesTelephone.clear();
    changesTelephone.sendKeys("9155555555");

    await driver.findElement(By.name("save")).click();

    const expectedalertText = "Изменения сохранены";
    const alert = await driver.wait(
      until.elementLocated(By.className("alert alert-success")),
      5000
    );
    const actualAlertText = await alert.getText();
    assert.ok(await alert.isDisplayed());
    assert === (actualAlertText, expectedalertText, "wrong alert");
  },
};
