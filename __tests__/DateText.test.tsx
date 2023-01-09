import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { DateText } from '../__mocks__/DateText';
import '@testing-library/jest-dom';

describe('DateText', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date('1991/08/02').getTime());
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
  });
  
	test('should 1991/08/02', () => {
		render(<DateText />);
		act(() => {
			expect(screen.getByText('1991/08/02')).toBeInTheDocument();
		});
	});
});
