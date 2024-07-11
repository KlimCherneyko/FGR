import registration from "./tests/registration.js";
import logout from "./tests/logout.js";
import authorization from "./tests/authorization.js";
import changePersonalData from "./tests/change-personal-data.js";
import changePassword from "./tests/change-password.js";
import historyOfOrders from "./tests/history-of-orders.js";
import favoriteProducts from "./tests/favorite-products.js";
import personalWrapper from "./tests/personal-wrapper.js";
import dropdownMenuLK from "./tests/dropdown-menu-lk.js";
const describe = {
  "Registration Form Test": {
    ...registration,
    ...logout,
    ...authorization,
    ...changePersonalData,
    ...changePassword,
    ...historyOfOrders,
    ...favoriteProducts,
    ...personalWrapper,
    ...dropdownMenuLK,
  },
};

export default describe;
