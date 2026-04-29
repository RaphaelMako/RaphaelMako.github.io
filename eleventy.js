module.exports = function (eleventyConfig) {
    // Copy 'public' folder to '_site/public'
    // eleventyConfig.addPassthroughCopy("./public/");
    return {
        dir: {
            input: "blog_src",
            includes: "_includes",
            output: "blog" // This is what GitHub Pages will serve
        }
    };
};