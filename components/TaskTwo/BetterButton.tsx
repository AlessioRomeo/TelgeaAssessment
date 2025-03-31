import React from 'react';

// Define proper TypeScript interface for component props
interface ButtonProps {
    /**
     * Function to execute when button is clicked
     */
    onClick: () => void;

    /**
     * Text to display inside the button
     * @default "Click me"
     */
    text?: string;

    /**
     * Optional className for additional styling
     */
    className?: string;
}

/**
 * A reusable button component with consistent styling
 *
 * Improvements made:
 * - Added TypeScript types for better type safety
 * - Used descriptive prop names (onClick instead of click)
 * - Implemented Tailwind classes instead of inline styles for consistency
 * - Added proper JSDoc comments for better documentation
 * - Used proper formatting and indentation for readability
 * - Added className prop to allow for customization
 */
export default function Button({
                                   onClick,
                                   text = "Click me", // Default value using parameter destructuring
                                   className = ""
                               }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 
            transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:ring-opacity-50 ${className}`}
            type="button" // Explicitly set button type for accessibility
        >
            {text}
        </button>
    );
}
