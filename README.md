
View the demo from the following link:

https://github.com/user-attachments/assets/069e0cbe-95fb-40ba-bd0d-358ce5142909



# Task 1: Building a Component

## Component Choice: Top-Up for Users

I chose to implement the "Top-Up for Users" component because it offered a complete user flow with multiple screens and interactions—from selecting top-up options to confirming the request. This approach allowed me to demonstrate various skills such as form handling, state management, and dynamic component reuse. While the Whitelist Domains component was interesting, it felt too simple to showcase the breadth of my capabilities.

## Technical Implementation and Reusable Components

In this project, I focused on building reusable components to keep the code maintainable and scalable. For example, I created a dynamic Action Buttons component that can be fed different properties (like label, variant, and onClick) to serve multiple purposes across the flow. I also built components like the Header and TopupOption to ensure consistency and reusability. Accessibility was a key priority—I added proper ARIA attributes and semantic HTML elements to enhance SEO and overall user accessibility.

The overall flow is managed using a context-based state management system. Even though I used hardcoded data for demonstration purposes, storing user selections in context simulates a realistic multi-step process. This design choice mimics the behavior of a production system where data flows smoothly between different screens, even if in a real-world scenario, the navigation might be handled via page rerouting and API calls.

## Trade-offs and Future Considerations

This implementation balances demonstrating a comprehensive user flow with practical, reusable code. However, there are trade-offs. I opted for context-based state management over traditional page routing to maintain a seamless flow, and used Tailwind CSS for rapid development despite its limitations in scalability compared to CSS modules or styled-components. In a production environment, I would enhance this by integrating robust form libraries like React Hook Form, improving API integrations, and conducting more extensive accessibility testing to ensure a polished, scalable solution.


---

# Task 2: Refactored Button Component

In the `BetterButton.tsx` file, I refactored the original messy button component to improve clarity and maintainability. I updated naming conventions, added inline comments to explain my changes, and ensured the formatting follows best practices for readability.

---

# Task 3: Written Response

Having worked at both startups and big companies I fully understand how important communication is. When facing design inconsistencies, I’d first set up a quick discussion with the designer to understand their vision and clarify any ambiguities. I’d suggest establishing a unified design system with defined spacing, typography, and responsive breakpoints to ensure consistency across the application. In parallel, I’d propose creating a few annotated prototypes to test how these adjustments work on both desktop and mobile views. This collaborative approach not only addresses immediate issues but also lays the foundation for a more maintainable and scalable design process.
