const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = (config) => {
	// Set directories to pass through to the dist folder
	config.addPassthroughCopy('./src/images/');
	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: 'src',
			output: 'dist',
		},
	};
	// Returns portfolio items, sorted by display order
	config.addCollection('portfolio', (collection) => {
		return sortByDisplayOrder(collection.getFilteredByGlob('./src/portfolio/*.md'));
	});
	// Returns only the featured portfolio items, also sorted
	config.addCollection('featuredWork', (collection) => {
		return sortByDisplayOrder(collection.getFilteredByGlob('./src/portfolio/*.md').filter((x) => x.data.featured));
	});
};
