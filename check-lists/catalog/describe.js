import subcategoryInterior from "./tests/subcategory-interior.js";
import subcategorySouvenir from "./tests/subcategory-souvenir.js";
import subcategoryForChildren from "./tests/subcategory-for-children.js";
import subcategoryForKitchen from "./tests/subcategory-for-kitchen.js";

const describe = {
  catalog: {
    ...subcategoryInterior,
    ...subcategorySouvenir,
    ...subcategoryForChildren,
    ...subcategoryForKitchen,
  },
};

export default describe;
