const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const { stringify } = require("javascript-stringify");


module.exports = function (eleventyConfig) {
	// Set directories to pass through to the dist folder
	eleventyConfig.addPassthroughCopy('./src/images/');
	// A filter for testing jsonify
	eleventyConfig.addFilter("jsonify", function (value) {
		return stringify(value, null, 2); // Pretty-print with 2 spaces
	});
	// Returns portfolio items, sorted by display order
	eleventyConfig.addCollection('portfolio', (collection) => {
		return sortByDisplayOrder(collection.getFilteredByGlob('./src/portfolio/*.md'));
	});
	// Returns only the featured portfolio items, also sorted
	eleventyConfig.addCollection('featuredWork', (collection) => {
		return sortByDisplayOrder(collection.getFilteredByGlob('./src/portfolio/*.md').filter((x) => x.data.featured));
	});
	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: 'src',
			output: 'dist',
		},
	};

};
