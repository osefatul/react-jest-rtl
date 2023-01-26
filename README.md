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
