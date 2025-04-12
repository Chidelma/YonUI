Bun.build({
    entrypoints : ["./src/main.js"],
    outdir: "./dist",
    minify: {
        whitespace: true,
        syntax: true,
        identifiers: true,
    }
}).then(() => {
    console.log("Build completed successfully!");
}).catch((err) => {
    console.error("Build failed:", err);
});