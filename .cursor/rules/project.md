# Project context

This project is based on a custom template relying on the following stack:

- React 19 (with react-compiler)
- Vite 7
- TypeScript 5.9
- Tailwind CSS 4
- Testing: Vitest + React Testing Library
- Linting: ESLint with:
  - Prettier configured as a plugin
  - Better Tailwind CSS integration
  - Testing Library integration
  - Import plugin

## Guidelines

- ALWAYS ASK FOR CONFIRMATION before installing a new dependency.
- TypeScript and Eslint is properly configured. Take advantage of it.
  - `npm run lint`: runs eslint
  - `npm run lint:fix`: auto fixes eslint errors
- vitest, a test runner, is properly configured with react-testing-library. Take advantage of it. Write tests for your code.
  - `npm run test`: runs tests
- Use tailwind 4 for styling unless you are told otherwise.
- Format on save is enabled.
- Git hooks are enabled.
- Commit messages MUST follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
  - **Required format**: `<type>(<scope>): <description>`
  - **Optional body**: A blank line followed by a detailed description (can be multiple paragraphs)
  - **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
  - **Scope** (optional but recommended): component, feature, or area affected (e.g., `contact-form`, `ui`, `storage`)
  - **Description**: imperative mood, lowercase, no period at the end
  - **Body** (optional): More detailed explanation, can use full sentences, multiple paragraphs
  - **Examples of CORRECT commits**:
    - `feat(contact-form): add phone number validation`
    - `fix(ui): center icon in floating button`
    - `docs: update README with setup instructions`
    - `refactor(contact-list): simplify rendering logic`
    - With body:
      ```
      feat(contact-form): add phone number validation
      
      Implement validation to ensure phone numbers match the expected format.
      Added regex pattern matching and real-time validation feedback.
      ```
  - **Examples of INCORRECT commits** (DO NOT USE):
    - `Add phone number validation` (missing type)
    - `feat: Added phone number validation` (past tense, capitalized)
    - `feat(contact-form): Add phone number validation.` (capitalized, period at end)
    - `update contact form` (no type, no scope, not imperative)
