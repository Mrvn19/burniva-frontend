import logo from '../../assets/icons/Logo.svg'
import { classNames } from '../../utils/helpers'

function LoadingSpinner({ size = 'md', className = '', message = null }) {
  const sizeMap = {
    sm: { container: 'w-6 h-6', inner: 'w-4 h-4', img: 'w-3 h-3', border: 'border-2' },
    md: { container: 'w-12 h-12', inner: 'w-8 h-8', img: 'w-6 h-6', border: 'border-3' },
    lg: { container: 'w-16 h-16', inner: 'w-12 h-12', img: 'w-8 h-8', border: 'border-4' },
    xl: { container: 'w-24 h-24', inner: 'w-16 h-16', img: 'w-12 h-12', border: 'border-4' }
  }

  const s = sizeMap[size]

  return (
    <div className={classNames('flex flex-col items-center justify-center gap-2', className)}>
      <div className={classNames('relative flex items-center justify-center', s.container)}>
        <div className={classNames('absolute inset-0 rounded-full border-primary-100 border-t-primary-600 animate-spin', s.border)} />
        
        <div className={classNames('rounded-xl bg-white flex items-center justify-center shadow-sm animate-[pulseLogo_1.8s_ease-in-out_infinite]', s.inner)}>
          <img
            src={logo}
            alt="Loading"
            className={classNames('object-contain', s.img)}
          />
        </div>
      </div>
      
      {message && (
        <p className="text-sm font-semibold text-primary-700 animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner