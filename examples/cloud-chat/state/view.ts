import { proxy } from "valtio";

class View {
  current = "search";
}

export default proxy(new View());
