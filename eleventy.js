module.exports = function (eleventyConfig) {
    // Copy 'public' folder to '_site/public'
    eleventyConfig.addPassthroughCopy("public");

    return {
        dir: {
            input: ".",
            output: "_site" // This is what GitHub Pages will serve
        }
    };
};