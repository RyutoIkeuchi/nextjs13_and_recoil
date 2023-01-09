import { render, screen, waitFor } from '@testing-library/react';
import { Toast } from '../__mocks__/Toast';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Toast', () => {
	jest.useFakeTimers();
	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	test('should be show and hide toast', async () => {
		const user = userEvent.setup();

		render(<Toast />);
		expect(screen.queryByRole('alert')).toBe(null);

		user.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(screen.queryByRole('alert')).toBeInTheDocument();
		});

		jest.advanceTimersByTime(3000);

		await waitFor(() => {
			expect(screen.queryByRole('alert')).toBeNull();
		});
	});
});
