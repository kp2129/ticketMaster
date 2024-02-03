export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                ` ${
                    disabled && ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
