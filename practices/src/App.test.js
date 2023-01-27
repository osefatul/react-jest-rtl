import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';


  test('New Color Name',()=>{
    render(<App/>)
    const btnColor = screen.getByRole("button", {name: "Enable"})
    const checkBox = screen.getByRole("checkbox", {name: "Disable Button"})

    expect(btnColor).toHaveStyle('backgroundColor: MediumVioletRed')
    expect(checkBox).not.toBeChecked()

    //when click on button.
    fireEvent.click(btnColor);
    expect(btnColor).toHaveStyle('backgroundColor: MidnightBlue')


    //when checkbox is checked
    fireEvent.click(checkBox);
    expect(btnColor).toHaveStyle('backgroundColor:gray');
    expect(btnColor).toBeDisabled()
    expect(checkBox).toBeChecked()
  });



