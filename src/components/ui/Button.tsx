import React from "react";

interface ButtonProps {
    text: string;
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    startIcon?: React.ReactNode;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    const { text, variant, size, startIcon, onClick } = props;
    
    return (
        <button 
            className={`rounded flex gap-3 justify-center items-center font-bold text-lg transition-colors ${variant=="primary"?"bg-purple-600 text-white hover:bg-purple-700":"bg-purple-200 text-purple-600 hover:bg-purple-100"} ${size!="sm"?size=="md"?"px-4 py-2 sm:px-6 sm:py-3":"px-10 py-5":"px-3 py-1"}`} 
            onClick={onClick}
        >
            {startIcon && <span className="icon">{startIcon}</span>}
            {text}
        </button>
    );
}

export default Button;
