import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",
  output: [
    { dir: "./dist", entryFileNames: "index.js", format: "es", sourcemap: true },
    { dir: "./dist", entryFileNames: "index.cjs.js", format: "cjs", sourcemap: true },
  ],
  external: ["rxjs", "rxjs/operators"],
  plugins: [typescript({ useTsconfigDeclarationDir: true })],
};
