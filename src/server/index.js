import { createServer } from "miragejs";
import jobs from "./jobs";

export default function makeServer() {
  return createServer({
    routes() {
      this.namespace = "api";

      this.get("/jobs", () => {
        return { jobs };
      });
    }
  });
}
