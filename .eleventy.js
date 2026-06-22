const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItLinkAttributes = require("markdown-it-link-attributes");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./public/");

    const md = markdownIt({ html: true, breaks: true, linkify: true })
        .use(markdownItFootnote)
        .use(markdownItLinkAttributes, {
            matcher(href) {
                return href.startsWith("http");
            },
            attrs: {
                target: "_blank",
                rel: "noopener",
            },
        });

    md.renderer.rules.footnote_caption = (tokens, idx) => {
        return String(Number(tokens[idx].meta.id + 1));
    };
    eleventyConfig.setLibrary("md", md);

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        }
    };
};