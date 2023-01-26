# JEST & RTL

Run Test
```typescript
npm test
```
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
**`screen.getByText`** - Find element by text
**`/learn react/i`** - regex; i: case sensitive
**`expect().toBeInTheDocument`** - Assertion, causes test to succeed or fail

### Assertions
Assertions are almost central part of test examination, they start with `expect` method, which is a global Jest.
- Ex: **`expect(linkElement).toBeInTheDocument`**

**expect argument** - `linkElement`
**matcher** - it is a type of assertion, which comes from Jest-DOM, eg: `toBeInTheDocument`

#### More assertions examples
 - `expect(element.textContent).toBe("hello")`
 - `expect(elementsArray).toHaveLength(7)`


 ### Jest-Dom
 - comes with create-react-app
 - src/setupTest.js imports it before each test, makes matchers available.
 - DOM-based matchers: the above assertion examples are more general, they can be applied to any node code, but DOM-based matchers are applied to dom documents such as:
    - `toBeVisible()`
    - `toBeChecked()`