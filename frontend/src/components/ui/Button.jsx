import { classNames } from '../../utils/helpers'

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:bg-slate-300',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-200 active:bg-slate-200 disabled:opacity-50',
  ghost: 'text-slate-600 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-50',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:opacity-50',
  outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 disabled:opacity-50',
}

const sizes = {
  sm: 'h-8  px-3 text-xs  rounded-lg  gap-1.5',
  md: 'h-10 px-4 text-sm  rounded-xl  gap-2',
  lg: 'h-12 px-6 text-sm  rounded-xl  gap-2',
  xl: 'h-14 px-8 text-base rounded-2xl gap-2.5',
  hero: 'h-6 sm:h-8 md:h-12 px-1.5 sm:px-3 md:px-6 text-[8px] sm:text-[10px] md:text-sm rounded-md gap-1 sm:gap-1.5 md:gap-2',
}

import LoadingSpinner from '../common/LoadingSpinner'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        'inline-flex items-center justify-center font-medium',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'disabled:cursor-not-allowed transition-all duration-300',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <div className="scale-75">
            <LoadingSpinner size="sm" />
          </div>
          <span>Tunggu Sebentar...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}

export default Button