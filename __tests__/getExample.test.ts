import { getExamples } from './../__mocks__/getExample';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { GetExamplesResponse } from '../__mocks__/getExample';
import 'cross-fetch/polyfill';

describe('/example', () => {
	const server = setupServer();
	beforeAll(() => server.listen());
	beforeEach(() => {
		server.use(
			rest.get('http://localhost:3000/examples', async (_req, res, ctx) => {
				return res(
					ctx.status(200),
					ctx.json<GetExamplesResponse>({
						examples: [
							{ id: '1', name: 'nus1' },
							{ id: '2', name: 'nus2' },
							{ id: '3', name: 'nus3' },
						],
					})
				);
			})
		);
	});
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('should called get example api', async () => {
		const response = await getExamples();
		expect(response).toStrictEqual({
			examples: [
				{ id: '1', name: 'nus1' },
				{ id: '2', name: 'nus2' },
				{ id: '3', name: 'nus3' },
			],
		});
	});
});
