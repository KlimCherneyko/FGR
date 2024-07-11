import productBuyPickup from "./tests/product-buy-pickup.js";
import productBuySdekPostomat from "./tests/product-buy-sdek-postomat.js";
import productBuySdekCourier from "./tests/product-buy-sdek-courier.js";
import productBuySdekPickup from "./tests/product-buy-sdek-pickup.js";

const describe = {
  "Product buy Test": {
    ...productBuyPickup,
    ...productBuySdekCourier,
    ...productBuySdekPickup,
    ...productBuySdekPostomat,
  },
};

export default describe;
