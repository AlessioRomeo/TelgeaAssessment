## Component Choice: Top-Up for Users

The main two reasons I chose to implement the "Top-Up for Users" component:

1. It provides a complete user flow with multiple screens and interactions
2. It demonstrates handling of form inputs, validation, and state management

The Whitelisting component seemed a little too simplistic and I don't think it would've showcased my abilities the same way.


## Technical Notes and Trade-offs

### Implementation Approach

- **Framework**: Used Next.js with App Router for efficient routing (even though it wasn't needed in this case) and server components
- **Styling**: Implemented with Tailwind CSS
- **State Management**: Created a context-based state management system to handle the multi-step flow (even if values are hardcoded this was to make it more realistic and properly show the overall flow)
- **Mock Data**: Used hardcoded data for countries, topup options, and user information


### Key Features Implemented

- Multi-step flow for selecting topup options
- International data selection with country search
- Date selection with calendar interface
- Loading and error states with retry functionality
- Phone number input with formatting and validation
- Confirmation screen with success message


### Technical Trade-offs

1. **Tailwind vs CSS/SCSS**:

1. Trade-off: Had to use Tailwind instead of pure CSS/SCSS. From experience, I believe pure CSS/SCSS is superior for performance, scalability, and organization, especially in larger codebases. CSS keeps everything clean and organized while Tailwind can become messy as projects grow. Additionally, CSS offers much more flexibility for complex styling needs.



2. **Client Components**:

1. Used client components for interactive elements requiring state
2. Trade-off: Slightly larger bundle size but better user experience with client-side interactions



3. **Context API vs. Form Libraries**:

1. Used React Context for state management instead of form libraries like React Hook Form
2. Trade-off: Simpler implementation for this specific use case, but less robust for complex form validation



4. **Mock Data**:

1. Used hardcoded data instead of API calls
2. Trade-off: Faster development but would need refactoring for real API integration





### Future Improvements

- Add proper API integration for country data and topup options
- Implement more robust form validation
- Add animations for smoother transitions between steps
- Improve accessibility features
- Add comprehensive test coverage
