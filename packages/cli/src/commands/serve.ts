import path from "path";
import { Command } from "commander";
import { serve } from "@notebook-react/local-api";

interface LocalApiError {
  code: string;
}
const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  // [] means optional, <> means compulsory
  .command("serve [filename]")
  .description("open a file for editing")
  // "4005" is the default value
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port, 10),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port}`
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        // if port is already in use
        if (err.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a different port.");
        }
      } else if (err instanceof Error) {
        console.log("Heres the problem", err.message);
      }
      process.exit(1);
    }
  });
