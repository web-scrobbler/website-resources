function connectorsToHostFile(connectors) {
	const results = connectors
		.filter((connector) => 'matches' in connector)
		.map((connector) => {
			const label = connector.label;
			const urls = connector.matches.map(function (match) {
				match = match.replace(/\*:\/\/(\*\.)?/, '');
				match = match.replace(/\/\*.*/, '');
				match = match.replace(/\.\*/, '.tld');
				match = match.replace(/\/.+/, '');
				match = match.replace(/\/$/, '');
				return match;
			});

			console.log(urls);

			return `# ${label}\n${urls.join('\n')}`;
		})
		.filter((result) => !result.includes('*'));

	return results.join('\n\n');
}

module.exports = {
	connectorsToHostFile,
};
