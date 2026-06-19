const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");


module.exports = function (eleventyConfig) {
    // Copy 'public' folder to '_site/public'
    eleventyConfig.addPassthroughCopy("./public/");
    const md = markdownIt({ html: true }).use(markdownItFootnote);
    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site" // This is what GitHub Pages will serve
        }
    };

    let options = {
        html: true,
        breaks: true,
        linkify: true,
    };

    eleventyConfig.setLibrary("md", md);

};