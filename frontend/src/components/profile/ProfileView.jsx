import { User, Mail, GraduationCap, Calendar, BookOpen, Heart } from 'lucide-react';

function InfoItem({ icon: Icon, label, value, hideBorder }) {
  return (
    <div className={`flex items-center gap-3 md:gap-4 py-3 md:py-4 ${!hideBorder ? 'border-b-[0.67px] border-gray-100' : ''}`}>
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-[10px] bg-primary-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 md:w-[18px] md:h-[18px] text-primary-500" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs md:text-sm text-gray-500 font-normal">{label}</span>
        <span className="text-sm md:text-base text-gray-900 font-normal leading-6">{value}</span>
      </div>
    </div>
  );
}

function ProfileView({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full items-start pb-4">
      {/* --- Kiri: Data Diri --- */}
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-8 shadow-sm flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-neutral-950 leading-7">Data Diri</h3>
          <p className="text-sm text-gray-500 leading-5">Informasi dasar pengguna sebagai mahasiswa.</p>
        </div>
        <div className="flex flex-col">
          <InfoItem icon={Heart} label="Jenis Kelamin" value={user.jenisKelamin || 'Belum diisi'} />
          <InfoItem icon={Calendar} label="Umur" value={user.umur ? `${user.umur} Tahun` : 'Belum diisi'} />
          <InfoItem icon={GraduationCap} label="Universitas" value={user.universitas || 'Belum diisi'} />
          <InfoItem icon={GraduationCap} label="Program Studi" value={user.prodi || 'Belum diisi'} />
          <InfoItem icon={BookOpen} label="Semester" value={user.semester ? `Semester ${user.semester}` : 'Belum diisi'} hideBorder={true} />
        </div>
      </div>

      {/* --- Kanan: Akun --- */}
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-8 shadow-sm flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-neutral-950 leading-7">Informasi Akun</h3>
          <p className="text-sm text-gray-500 leading-5">Informasi login akun Anda.</p>
        </div>
        <div className="flex flex-col">
          <InfoItem icon={User} label="Nama Lengkap" value={user.nama || '-'} />
          <InfoItem icon={Mail} label="Email" value={user.email || '-'} hideBorder={true} />
        </div>
      </div>
    </div>
  );
}

export default ProfileView;