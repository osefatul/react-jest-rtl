# JEST & RTL

## Introductions

### What does RTL do?
- Creates virtual DOM for testing and utilities for interacting with DOM.
- Allows testing without a browser.

### Render method
- Create virtual DOM for argument JSX
- Access Virtual DOM via `screen` global

**Example:**
```typescript
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

<p>**`screen.getByText`** - Find element by text</p>
<p>**`/learn react/i`** - regex; i: case sensitive</p>
<p>**`expect().toBeInTheDocument`** - Assertion, causes test to succeed or fail</p>


### Assertions
Assertions are almost central part of test examination, they start with `expect` method, which is a global Jest.
- Ex: **`expect(linkElement).toBeInTheDocument`**

<p>
**expect argument** - `linkElement`
</p>

<p>
**matcher** - it is a type of assertion, which comes from Jest-DOM, eg: `toBeInTheDocument`
</p>

#### More assertions examples
 - `expect(element.textContent).toBe("hello")`
 - `expect(elementsArray).toHaveLength(7)`


 ### Jest-Dom
 - comes with create-react-app
 - src/setupTest.js imports it before each test, makes matchers available.
 - DOM-based matchers: the above assertion examples are more general, they can be applied to any node code, but DOM-based matchers are applied to dom documents such as:
    - `toBeVisible()`
    - `toBeChecked()`


### RTL vs Jest
- RTL helps with rendering components into virtual DOM, searching virtual DOM, interacting with virtual DOM.
- However, it needs a test runner, to find tests, run them and make assertions, and that's where **JEST** comes in.
- Jest, is recommended by testing library and comes with create-react-app.
- `npm test` run jest in to watch mode.


### How Jest works
- global `test` method has two arguments.
    - string description
    - test function
- Test fails if error is thrown when running function
    - assertion throws errors when expectation fails.
- No Error -> test should pass.
    - Empty test passes.
    - ```javascript
        test('renders learn react link', () => {
        });
        ```

### TDD (Test-Driven Development)
- writes test before writing code.
    - then write code according to 'spec' set by tests.
- "Red-Green" testing.
    - Test fails before code is written.

#### Why TDD
- Makes a huge difference in how it feels to write tests, because it is a integrated to the coding process, not a "chore" to do at the end.
- more efficient.


### Types of Tests
- **Unit Tests**: Test one unit of code in isolation.
- **Integration Tests**: How multiple units work together.
- **Functional Tests**: Tests a particular function ore more generally a behavior of software: Enter data in form and click submit.
- **Acceptance/End-to-End (E2E) Tests**: Use actual browser and server(cypress, Selenium) 

### Functional Testing vs Unit Testing.
#### Unit Testing: 
Isolate: mock dependencies, test internals.
- Adv: Very easy to pinpoint.
- DisAdv: Further from how users interact with software.
- DisAdv: More likely to break with refactoring.

#### Functional Testing:
Include all units, test behavior.
- Adv: Close to how users interact with software.
- Adv: Robust tests.
- DisAdv: More difficult to debug failing tests.


### TDD vs BDD(Behavior-Driven Development)
- Testing library encourages testing behavior over implementation.
- So, should we be calling this BDD instead of TDD? actually no,
- BDD is very explicitly defined:
    - Involves collaboration between lots of roles:
        - developers, QA, business partners, etc.
    - Defines process for different groups to interact.
- So as only developers we will be going with TDD.


### Accessibility & Finding Elements
- Testing library recommends finding elements by accessibility handles:
    - https://testing-library.com/docs/queries/about/#priority

- Create-react-app's example test uses `getByText`
    - ```typescript
        //App.js
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        //App.test.js
        test('renders learn react link', () => {
        render(<App />);
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
        });
        ```
    - `getByText` is ok for non-interactive elements such as div, span, paragraphs.
    - Better to use `getByRole` instead.   
    - ```typescript
        //App.js
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        //App.test.js
        test('renders learn react link', () => {
        render(<App />);
        const linkElement = screen.getByRole('link', {name: /learn react/i});
        expect(linkElement).toBeInTheDocument();
        });
        ```
    - In the above example: `link` is used for `<a></a>`
- Role docs: https://www.w3.org/TR/wai-aria/#role_definitions


<hr />

## Simple Apps to Test Functionalities

#### Example:
Test if a role is button and text of it is "Change to blue". expect the background color to be "red".

```javascript
//App.js
function App() {
  return (
    <div className="App">
      <button
      style={{backgroundColor: "red"}}
      onClick={()=> setBg(!bg) }
      >
        Change to blue"
      </button>
    </div>
  );
}



//App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('Button has correct initial color', () => {
  render(<App/>);
  const colorButton = screen.getByRole("button", {name:"Change to blue"});
  expect(colorButton).toHaveStyle({backgroundColor:"red"})
});

```

#### Example:
- First Test: 
    - Test if a role is button and text of it is "Change to blue". expect the background color to be "red".
    - when the button is clicked then test if a role is button and text of it is "Change to red". expect the background color to be "blue".

```javascript

//App.js
function App() {
  const [bg, setBg] = useState(false)
  return (
    <div className="App">
      <button
      style={!bg?{backgroundColor: "red"}: {backgroundColor:"blue"}}
      onClick={()=> setBg(!bg) }
      >
        {!bg?"Change to blue": "Change to red"}
      </button>


      <input type="checkbox"/>
    </div>
  );
}



//App.test.js
test('Button has correct initial color', () => {
  render(<App/>);
  const colorButton = screen.getByRole("button", {name:"Change to blue"});
  expect(colorButton).toHaveStyle({backgroundColor:"red"})

  //click button to change background color to blue
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({backgroundColor:"blue"})
  expect(colorButton.textContent).toBe("Change to red")

  //click button to change background color to red
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({backgroundColor:"red"})
  expect(colorButton.textContent).toBe("Change to blue")
});



test("initial conditions", () => {
  render(<App/>);

  const colorButton = screen.getByRole("button", {name:"Change to blue"});
  expect(colorButton).toBeEnabled();

  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked()
})
```


#### Example: Checkbox-Functionality
When checkbox is checked, button should be disabled.

```javascript

//App.js
function App() {
  const [disabled, setDisabled] = useState(false)

  return (
    <div className="App">
      <button disabled={disabled}>
        {disabled? "Disable" : "Enable"}
      </button>
      <input 
      type="checkbox" 
      onChange={(e) => setDisabled(e.target.checked)}/>
    </div>
  );
}


//App.test.js
test('CheckBox functionality is working', () => {
  render(<App/>);
  const button = screen.getByRole("button", {name:"Enable"});
  const checkBox = screen.getByRole("checkbox");

  fireEvent.click(checkBox)

  expect(checkBox).toBeChecked();
  expect(button).toBeDisabled()
});

```

#### Example: Find Checkbox with label
Use the above example but add another checkbox with no name.

```javascript

//App.js
function App() {
  const [disabled, setDisabled] = useState(false)

  return (
    <div className="App">
      <button disabled={disabled}>
        {disabled? "Disable" : "Enable"}
      </button>

      <input 
      type="checkbox"/>

      <input 
      type="checkbox"
      id ="enable-button-checkbox"
      onChange={(e) => setDisabled(e.target.checked)}/>

      <label htmlFor='enable-button-checkbox'>Disable Button</label>
    </div>
  );
}


//App.test.js
test('Label CheckBox functionality is working', () => {
  render(<App/>);
  const button = screen.getByRole("button", {name:"Enable"});
  const checkBox = screen.getByRole("checkbox", {name:"Disable Button"});

  fireEvent.click(checkBox)

  expect(checkBox).toBeChecked();
  expect(button).toBeDisabled()
});

```

#### Example: Red Button Turns Gray When Disabled and Vice Versa

```javascript
//app.js
function App() {
  const [disabled, setDisabled] = useState(false)

  return (
    <div className="App">
      <button 
      disabled={disabled}
      style={disabled? {backgroundColor:"gray", color:"black"}: {backgroundColor:'red'}}
      >
        {disabled? "Disable" : "Enable"}
      </button>

      <input 
      type="checkbox"
      id ="enable-button-checkbox"
      onChange={(e) => setDisabled(e.target.checked)}/>

      <label htmlFor='enable-button-checkbox'>Disable Button</label>
      
      <input 
      type="checkbox"/>
    </div>
  );
}



//App.test.js
test('Red button turns gray as it is disabled and vice versa', () => {
  render(<App/>);
  const button = screen.getByRole("button", {name:"Enable"});
  const checkBox = screen.getByRole("checkbox", {name: "Disable Button"});

  expect(button).toHaveStyle('backgroundColor: red');
  fireEvent.click(checkBox)
  expect(checkBox).toBeChecked();
  expect(button).toBeDisabled()
  expect(button).toHaveStyle('backgroundColor: gray');

  fireEvent.click(checkBox)
  expect(button).toBeEnabled();
  expect(button).toHaveStyle('backgroundColor: red');
});

```


#### Example Unit Test Function:

```javascript

//App.js
export function replaceCamelWithSpaces(colorName) {
  //MidnightBlue -> Midnight Blue
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}


//App.test.js

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
```


#### Example: Update Test for New Color Names
In the beginning of the app, button color is MediumVioletRed, when clicked it changes to MidnightBlue. And when checkbox is checked it changes to gray and disables.

```javascript
//App.js
function App() {
  const [disabled, setDisabled] = useState(false)
  const [btnColor, setBtnColor] = useState("MediumVioletRed")

  const newBtnColor = btnColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed"

  return (
    <div className="App">
      <button 
      disabled={disabled}
      style={{backgroundColor: disabled ?"gray" : btnColor, color:"black"}}
      onClick={() => setBtnColor(newBtnColor)}
      >
        {disabled? "Disable" : "Enable"}
      </button>

      <input 
      type="checkbox"
      id ="enable-button-checkbox"
      onChange={(e) => setDisabled(e.target.checked)}/>

      <label htmlFor='enable-button-checkbox'>
        Disable Button
      </label>
    </div>
  );
}



//App.test.js
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

```

<hr/>

## ESLint for Testing Library and Jest-DOM
- `npm i eslint-plugin-testing-library eslint-plugin-jest-dom`
- In package.json file, delete `eslintConfig` object.
- Create another file named `.eslintrc.json`.
- add below code in the above eslint file.

```javascript
{
    "plugins": [
        "testing-library",
        "jest-dom"
    ],
    "extends": [
        "react-app",
        "react-app/jest",
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended"
    ]
}
```

- Configure ESLint in VSCode:
    - create folder/file `.vscode/settings.json`
    - Add
    ```javascript
    {
        "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
        }
    }
    ```
- Install eslint extension.


<hr />

## Sundaes on Demand
#### Summary Form components.
Create a `SummaryForm.jsx` and `SummaryForm.test.jsx` file for testing that components. The task is to check a box which enables the button. Once code is written then run `npm test`

```javascript

function SummaryForm() {
    const [checked, setChecked] = useState(false)
    
    return (
    <div>
        <input
        type="checkbox"
        id="termConditions"
        onChange={(e)=> setChecked(e.target.checked)}
        />
        <label htmlFor="termConditions">terms and conditions</label>

        <button
        disabled = {!checked}
        >
            Confirm Order
        </button>
    </div>
    )
}



//SummaryFrom.test.jsx
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

```

