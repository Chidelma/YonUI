Bun.build({
    entrypoints : ["./src/main.js"],
    outdir: "./dist",
    minify: true
}).then(() => {
    console.log("Build completed successfully!");
}).catch((err) => {
    console.error("Build failed:", err);
});