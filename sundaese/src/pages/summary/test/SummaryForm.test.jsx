import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('checkbox and button before have been clicked', () => {
    render(<SummaryForm/>)
    const btn = screen.getByRole("button", {name:"Confirm Order"})
    const checkbox = screen.getByRole("checkbox", {name: /terms and conditions/i})

    expect(checkbox).not.toBeChecked();
    expect(btn).toBeDisabled();
})


test("checkbox disables button", () => {
    render(<SummaryForm/>)
    const checkbox = screen.getByRole("checkbox", {name:/terms and conditions/i})
    const btn = screen.getByRole("button", {name:"Confirm Order"})

    fireEvent.click(checkbox);
    expect(btn).toBeEnabled();
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(btn).toBeDisabled();
    expect(checkbox).not.toBeChecked()
})
