import { createServer } from "miragejs";
import jobsData from "./jobs";

export default function makeServer() {
  let jobs = [...jobsData];

  return createServer({
    routes() {
      this.namespace = "api";
      this.get("/jobs", () => {
        return { jobs };
      });
      this.post("/jobs", (schema, request) => {
        const newJob = JSON.parse(request.requestBody);
        jobs.push(newJob);
        return { job: newJob };
      });
    }
  });
}
