import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import { changesPasswordXpath } from "../xpaths.js";
import { isMatchedPathName } from "../../../utils/common.js";
import { useUser } from "../../../utils/auth.js";
export default {
  "change password": async (driver) => {
    await driver.findElement(By.xpath(changesPasswordXpath)).click();

    assert.ok(await isMatchedPathName(driver, "/personal/change-password/"));

    const changesPassword = await driver.wait(
      until.elementLocated(By.id("NEW_PASSWORD")),
      10000
    );
    const user = await useUser();
    changesPassword.sendKeys(user.password);
    await driver
      .findElement(By.id("NEW_PASSWORD_CONFIRM"))
      .sendKeys(user.password);
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
