import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';


//Group multiple tests
describe("Spaces before camelCase capital letter", ()=>{

  test('for One inner capital letter',()=>{
    expect(replaceCamelWithSpaces("Red")).toBe("Red")
  });

  test('joined camelCase letter',()=>{
    expect(replaceCamelWithSpaces("MidnightGreen")).toBe("Midnight Green")
  });

  test('long camelCase letter',()=>{ 
    expect(replaceCamelWithSpaces("RedGreenYellowBlue")).toBe("Red Green Yellow Blue")
  });


})



