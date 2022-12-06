import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // handle root entry file
      // this first onResolve filtering the entryPoints we set as an argumentthe build function 's call.
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      // handle relative paths in a module
      // this onResolve will be called whenever esbuild is trying to figure out a path to a particular imported module (so if the require or import statement includes ./ or ../)
      // we have to handle the case when relative files are required (ie: require('./utils') or require('../utils)) because if not, the onLoad method will receive a path like https://unpkg.com/medium-test-pkg/./utils instead of the one we actually want which would be : https://unpkg.com/medium-test-pkg/utils
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        // we use the URL api (because we are in the browser environment, on node JS we would have used path). It's important to don't forget the '/' at the end of the second argument
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
