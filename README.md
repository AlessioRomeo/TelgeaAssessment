# Demo: Video Preview


https://github.com/user-attachments/assets/91bddddd-3513-460c-ae48-417a57205ab4


---

# Task 1: Building a Component

### Component Choice: Top-Up for Users
I chose to implement the "Top-Up for Users" component because it offered a complete user flow with multiple screens and interactions—from selecting top-up options to confirming the request. This approach allowed me to demonstrate various skills such as form handling, state management, and dynamic component reuse. While the Whitelist Domains component was interesting, it felt too simple to showcase the breadth of my capabilities.

### Introduction
- Demonstrates a multi-step mobile plan top-up flow built with **Next.js**, **TypeScript**, and **Tailwind**.
- Utilizes a “wizard” style flow with **React Context** rather than Next.js routing, prioritizing state-driven steps.
- Focuses on **code clarity**, **performance optimizations**, and **accessible** design patterns.

### Overview
- **Phone Confirmation**: Validates phone number and simulates SMS confirmation.
- **Option Selection**: Lets users pick data or minutes for local or international usage.
- **Date Scheduling**: Provides a calendar interface for picking an activation date.
- **Reusable Components**: Centralized UI patterns (buttons, overlays, forms) for consistency.

### Performance & Scalability
- **Context & Reducers**: Central flow logic to avoid prop drilling and isolate complexity.
- **Memoized Components**: `React.memo` and `useCallback` minimize unnecessary re-renders.
- **Wizard vs Routing**: Maintaining each step as a state, rather than separate routes, reduces overhead and preserves data effortlessly between steps.

### Accessibility
- **Semantic Markup**: Uses proper headings, labels, roles, and ARIA attributes.
- **Key Navigation**: Buttons, forms, and overlays designed for keyboard/screen reader use.
- **Flexible Layout**: No rigid pixel sizes; though not tested for all breakpoints, it adapts well.

### Tradeoffs
- **Tailwind Requirement**: It’s used here as requested, but in large-scale apps, pure CSS or SCSS can often be more performant, more maintainable, and easier to customize.
- **Font Family**: Unfortunately I wasn't able to find a free version of the font 'Selecta' used in the Figma design. For this reason I opted for a classic 'Poppins'. For a production app I would of course make sure to have the proper font family.
- **Mocked Error Flow**: Demonstrates loading/error overlays; real APIs would be more elaborate.
- **Context vs Redux**: Simplified approach for fewer dependencies; Redux might offer more tooling.
- **Wizard Flow over Routing**: Users don’t have to reload pages or lose context between steps, though some might prefer Next.js routing for the step-by-step process.

### Future Improvements
- **More Rigorous Testing**: Introduce unit and integration tests using Jest/React Testing Library.
- **Enhanced Responsiveness**: Thoroughly test and refine breakpoints for all screen sizes.
- **Deeper Accessibility**: Include full keyboard-flow checks, more in depth ARIA validations, and screen reader optimizations.
- **Production-Level API**: Integrate real or mock APIs beyond simple hardcoded data and error overlays, with robust error handling and logging.

---

# Task 2: Refactored Button Component

In the `BetterButton.tsx` file, I refactored the original messy button component to improve clarity and maintainability. I updated naming conventions, added inline comments to explain my changes, and ensured the formatting follows best practices for readability.

---

# Task 3: Written Response

Having worked at both startups and big companies I fully understand how important communication is. When facing design inconsistencies, I’d first set up a quick discussion with the designer to understand their vision and clarify any ambiguities. I’d suggest establishing a unified design system with defined spacing, typography, and responsive breakpoints to ensure consistency across the application. In parallel, I’d propose creating a few annotated prototypes to test how these adjustments work on both desktop and mobile views. This approach not only addresses immediate issues but also lays the foundation for a more maintainable and scalable design process for the future.
