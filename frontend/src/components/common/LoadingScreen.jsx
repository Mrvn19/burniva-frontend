import logo from '../../assets/icons/Logo.svg'

function LoadingScreen({ text = 'Memuat...' }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin" />

          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm animate-[pulseLogo_1.8s_ease-in-out_infinite]">
            <img
              src={logo}
              alt="BURNIVA"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-semibold text-primary-700">BURNIVA</p>
          <p className="text-xs text-slate-500">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
