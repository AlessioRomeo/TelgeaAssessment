import React, { useCallback, memo } from "react";


interface ButtonProps {
    /** Function to execute when the button is clicked. */
    onClick: () => void;
    /** Text to display inside the button. Defaults to "Click me". */
    text?: string;
    /** If true, the button is disabled. Defaults to false. */
    disabled?: boolean;
    /** Additional CSS classes for custom styling. */
    className?: string;
}

/**
 * Improvements made:
 * - Added TypeScript types for improved type safety.
 * - Used descriptive prop names with default values.
 * - Optimized event handling with useCallback to avoid unnecessary re-renders.
 * - Managed styling with conditional classes, ensuring the disabled state is clearly indicated.
 * - Wrapped the component with React.memo for further performance optimization.
 */
const BetterButton: React.FC<ButtonProps> = ({
                                                 onClick,
                                                 text = "Click me",
                                                 disabled = false,
                                                 className = "",
                                             }) => {
    const handleClick = useCallback(() => {
        if (!disabled) {
            onClick();
        }
    }, [onClick, disabled]);

    // Construct CSS classes conditionally based on the disabled state.
    const baseClasses = "bg-blue-600 text-white py-2 px-4 rounded transition-colors";
    const hoverClasses = disabled ? "" : "hover:bg-blue-700";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    const buttonClasses = `${baseClasses} ${hoverClasses} ${disabledClasses} ${className}`;

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            aria-disabled={disabled}
            className={buttonClasses}
        >
            {text}
        </button>
    );
};

export default memo(BetterButton);
