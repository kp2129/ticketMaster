export default function PrimaryButton({ className = '', disabled, children, ...props }) {
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
