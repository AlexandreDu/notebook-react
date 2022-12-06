import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

// indexDb caching layer
const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // onLoad method receive the object returned by onResolve in the unpkg-path-pluging.ts

      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check to see if we have already fetched this file
        // and if it is, return immediately (and the other onLoad method won't run because we returned something already)
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // Check to see if we have already fetched this file
        // and if it is, return immediately

        const { data, request } = await axios.get(args.path);

        const fileType = args.path.match(/.css$/) ? "css" : "jsx";
        console.log("fileType", fileType);
        const escaped = data
          // all new lines are removed
          .replace(/\n/g, "")
          // all " are escaped
          .replace(/"/g, '\\"')
          // all ' are escaped
          .replace(/'/g, "\\'");

        // Esbuild normally creates a separate file for css during the bundle, but because we are bundling in the browser, we don't have a file system, so we must inject the css content in a variable which will be attached to the head of the js content
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          // resolveDir: This is the file system directory where we found the original file.  NB: for require('axios') for example, we don't use resolveDir but directly the path: `https://unpkg.com/${args.path}` above
          // responseUrl from the request object is the redirected url (it happens with the unpkg cdn for nested directories with src for example)
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store it in the indexDb (cache)
        await fileCache.setItem(args.path, result);
        // and then return it
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          // resolveDir: This is the file system directory where we found the original file.  NB: for require('axios') for example, we don't use resolveDir but directly the path: `https://unpkg.com/${args.path}` above
          // responseUrl from the request object is the redirected url (it happens with the unpkg cdn for nested directories with src for example)
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store it in the indexDb (cache)
        await fileCache.setItem(args.path, result);
        // and then return it
        return result;
      });
    },
  };
};
