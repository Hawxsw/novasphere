export const Logo = () => {
    return (
        <svg
            width="240"
            height="40"
            viewBox="0 0 240 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
        >
            <g>
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" className="text-green-500" />

                <path
                    d="M20 10C24.866 10 28 13.134 28 17"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="text-green-500"
                />

                <text
                    x="48"
                    y="27"
                    fontSize="24"
                    fontWeight="600"
                    fill="currentColor"
                    letterSpacing="0.025em"
                >
                    NovaSphere
                </text>
            </g>
        </svg>
    )
} 