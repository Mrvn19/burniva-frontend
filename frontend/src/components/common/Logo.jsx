import { Link } from 'react-router-dom'
import logoCol from '../../assets/icons/Logo.svg'
import logoW from '../../assets/icons/Logo-W.svg'
import { ROUTES } from '../../utils/constants'

function Logo({
  className = '',
  showText = true,
  variant = 'color',
  clickable = true
}) {
  const imgSrc = variant === 'white' ? logoW : logoCol;

  const content = (
    <div
      className={`flex items-center gap-2 ${
        clickable
          ? 'cursor-pointer text-primary-500 hover:text-primary-700 transition-colors'
          : 'cursor-default'
      } ${className}`}
    >
      <img
        src={imgSrc}
        alt="BURNIVA"
        className="w-8 h-8 object-contain shrink-0"
      />
      {showText && (
        <span className="text-base font-bold text-inherit">
          BURNIVA
        </span>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link to={ROUTES.HOME}>
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;