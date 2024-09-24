const utils = require('./utils.ts');

test('hostfile no matches', () => {
	const connectors = [
		{
			label: 'test',
		},
	];

	expect(utils.connectorsToHostFile(connectors)).toBe('');
});

test('hostfile basic', () => {
	const connectors = [
		{
			label: 'test',
			matches: ['*://*.example.com/*'],
		},
	];

	expect(utils.connectorsToHostFile(connectors)).toBe('# test\nexample.com');
});

test('hostfile with tld', () => {
	const connectors = [
		{
			label: 'test',
			matches: ['*://example.*/*'],
		},
	];

	expect(utils.connectorsToHostFile(connectors)).toBe('# test\nexample.tld');
});

test('hostfile with wildcard domain', () => {
	const connectors = [
		{
			label: 'test',
			matches: ['*://*nts.live/'],
		},
	];

	expect(utils.connectorsToHostFile(connectors)).toBe('');
});

test('hostfile basic with trailing slash', () => {
	const connectors = [
		{
			label: 'test',
			matches: ['*://*.example.com/'],
		},
	];

	expect(utils.connectorsToHostFile(connectors)).toBe('# test\nexample.com');
});
