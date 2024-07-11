import addFavorites from "./tests/add-favorites.js";
import deleteFavorites from "./tests/delete-favorites.js";

const describe = {
  favorites: {
    ...addFavorites,
    ...deleteFavorites,
  },
};

export default describe;
