import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FilterBar from '../components/FilterBar';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

describe('FilterBar', () => {
  it('should update Job List', async () => {
    const user = userEvent.setup();
    const ipVal = 'developer';
    const isPending = false;
    const handleSearchChange = vi.fn();

    render(
      <FilterBar
        inputValue={ipVal}
        onSearchChange={handleSearchChange}
        isPending={isPending}
      />
    );

    const searchIp = screen.getByRole('textbox');

    await user.type(searchIp, 'developer');

    expect(handleSearchChange).toHaveBeenCalled();
    expect(searchIp).toHaveValue('developer');
  });
});
