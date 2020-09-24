import { prod_config } from "./prod";
import { dev_config } from "./dev";

const key = {
  mongoURI: (key) => {
    if (key === "production") {
      return prod_config.mongoURI;
    } else {
      return dev_config.mongoURI;
    }
  },
};

export default key;
