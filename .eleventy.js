const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./public/");

    const md = markdownIt({ html: true, breaks: true, linkify: true }).use(markdownItFootnote);
    eleventyConfig.setLibrary("md", md);

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        }
    };
};