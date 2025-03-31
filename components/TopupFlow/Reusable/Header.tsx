"use client"

interface HeaderProps {
    showCancel?: boolean
    onCancel?: () => void
    className?: string
}

export default function Header({ showCancel = true, onCancel, className = "mb-5" }: HeaderProps) {
    return (
        <div className={`flex justify-between items-center ${className}`}>
            <div className="flex items-center">
                <div className="mr-2 rounded-full bg-black" style={{ width: "23px", height: "23px" }}></div>
                <span className="text-3xl font-medium">Telgea</span>
            </div>

            {showCancel && onCancel && (
                <button type="button" onClick={onCancel} className="text-[#B5B5B2] flex items-center text-sm">
                    Cancel
                    <svg
                        aria-hidden="true"
                        className="ml-1 opacity-25"
                        width="13"
                        height="13"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 1L14 14M1 14L14 1" stroke="black" strokeWidth="2" />
                    </svg>
                </button>
            )}
        </div>
    )
}
