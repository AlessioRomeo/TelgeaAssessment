# Task 1: Building a Component

### Component Choice: Top-Up for Users

I chose the "Top-Up for Users" component because it offers a comprehensive user flow with multiple screens and interactions, and it demonstrates handling of form inputs, validation, and state management. The Whitelisting component felt too simplistic to fully showcase my abilities.

### Technical Notes and Trade-offs

**Implementation Approach:**
- **Framework:** Next.js with App Router for efficient routing and server components.
- **Styling:** Tailwind CSS.
- **State Management:** Context-based state management for the multi-step flow.
- **Mock Data:** Hardcoded data for countries, top-up options, and user information.

**Key Features:**
- Multi-step flow for selecting top-up options.
- Accessibility features following best practices.
- International data selection with a country search.
- Date selection using a calendar interface.
- Loading and error states with retry functionality.
- Phone number input with formatting and validation.
- Confirmation screen with a success message.

**Trade-offs:**
- **Tailwind vs. CSS/SCSS:** While Tailwind accelerates development, pure CSS/SCSS may offer better performance, scalability, and organization in larger codebases.
- **Client Components:** Improved interactivity at the cost of a slightly larger bundle size.
- **Context API vs. Form Libraries:** React Context simplifies state management, but lacks the robustness of specialized form libraries like React Hook Form.
- **Mock Data:** Using hardcoded data speeds up development but would require refactoring for real API integration.

**Future Improvements:**
- Integrate with APIs for country data and top-up options.
- Implement more robust form validation.
- Add animations for smoother transitions.
- Enhance accessibility features.
- Expand test coverage.

---

# Task 2: Refactored Button Component

In the `BetterButton.tsx` file, I refactored the original messy button component to improve clarity and maintainability. I updated naming conventions, added inline comments to explain my changes, and ensured the formatting follows best practices for readability.

---

# Task 3: Written Response

When facing design inconsistencies, I’d first set up a quick discussion with the designer to understand their vision and clarify any ambiguities. I’d suggest establishing a unified design system with defined spacing, typography, and responsive breakpoints to ensure consistency across the application. In parallel, I’d propose creating a few annotated prototypes to test how these adjustments work on both desktop and mobile views. This collaborative approach not only addresses immediate issues but also lays the foundation for a more maintainable and scalable design process.
