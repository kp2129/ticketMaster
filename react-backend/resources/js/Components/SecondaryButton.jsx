export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
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
