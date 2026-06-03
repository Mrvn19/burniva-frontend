import React, { useRef, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import CustomDropdown from '../ui/CustomDropdown';
import Avatar from '../ui/Avatar';
import ConfirmationModal from '../common/ConfirmationModal';

function ProfileEdit({
  form,
  onUserChange,
  passwords,
  onPasswordChange,
  currentPhotoUrl,
  previewImage,
  onImageSelected,
  onImageRemove,
  personalErrorMsg,
  securityErrorMsg
}) {
  const fileInputRef = useRef(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    variant: 'danger',
    onConfirm: () => { }
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const initial = form?.nama?.charAt(0).toUpperCase() || 'U';
  const displayImage = previewImage === '' ? null : (previewImage || currentPhotoUrl);

  return (
    // REVISI: Langsung merender susunan Grid Utama tanpa Action Bar kembar
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full items-start pb-4">

      {/* --- Kiri: Informasi Pribadi --- */}
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-8 shadow-sm flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-neutral-950 leading-7">Data Diri</h3>
          <p className="text-sm text-gray-500 leading-5">Perbarui informasi personal dan status akademik Anda di sini.</p>
        </div>

        {personalErrorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 -mt-2">
            <p className="text-sm font-medium text-red-600">{personalErrorMsg}</p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <Input label="Nama Lengkap" name="nama" value={form.nama} onChange={onUserChange} placeholder="Nama Lengkap" required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={onUserChange} placeholder="kamu@kampus.ac.id" required />

          {/* Jenis Kelamin */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Jenis Kelamin</label>
            <CustomDropdown
              name="jenisKelamin"
              value={form.jenisKelamin || ''}
              onChange={onUserChange}
              options={[
                { label: 'Pilih Jenis Kelamin', value: '' },
                { label: 'Laki-laki', value: 'Laki-laki' },
                { label: 'Perempuan', value: 'Perempuan' }
              ]}
              placeholder="Pilih Jenis Kelamin"
              className="h-11"
            />
          </div>

          {/* Umur */}
          <Input label="Umur" name="umur" type="number" value={form.umur} onChange={onUserChange} placeholder="Contoh: 21" min={0} />

          {/* Universitas */}
          <Input label="Universitas" name="universitas" value={form.universitas} onChange={onUserChange} placeholder="Nama Universitas" required />

          {/* Program Studi */}
          <Input label="Program Studi" name="prodi" value={form.prodi} onChange={onUserChange} placeholder="Program Studi / Jurusan" required />

          {/* Semester */}
          <Input label="Semester" name="semester" type="number" value={form.semester} onChange={onUserChange} placeholder="Contoh: 6" min={0} required />

          {/* AREA EDIT FOTO */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="text-sm font-medium text-gray-700">Foto Profil</label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="relative w-fit">
              {/* Avatar yang bisa diklik */}
              <div
                onClick={handleAvatarClick}
                className="cursor-pointer group rounded-2xl overflow-hidden shadow-sm"
              >
                <Avatar
                  src={displayImage}
                  name={form.nama}
                  size="lg"
                  className="group-hover:opacity-90 transition-opacity"
                />
              </div>

              {/* Tombol Hapus (Trash) - Hanya muncul jika ada foto */}
              {displayImage && (
                <button
                  type="button"
                  onClick={() => {
                    setConfirmModal({
                      isOpen: true,
                      title: 'Hapus Foto Profil',
                      message: 'Apakah kamu yakin ingin menghapus foto profil ini?',
                      confirmText: 'Ya, Hapus',
                      variant: 'danger',
                      onConfirm: onImageRemove
                    });
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 shadow-md transition-all z-10"
                  title="Hapus Foto"
                >
                  <Trash2 size={14} />
                </button>
              )}

              {/* Tombol Edit (Pensil) */}
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary-600 hover:border-primary-500 shadow-md transition-all z-10"
                title="Ubah Foto"
              >
                <Pencil size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Kanan: Keamanan --- */}
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-8 shadow-sm flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-neutral-950 leading-7">Keamanan</h3>
          <p className="text-sm text-gray-500 leading-5">Ubah kata sandi akun Anda.</p>
        </div>

        {securityErrorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 -mt-2">
            <p className="text-sm font-medium text-red-600">{securityErrorMsg}</p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <Input label="Kata Sandi Lama" name="old" type="password" value={passwords.old} onChange={onPasswordChange} placeholder="••••••••" />
          <Input label="Kata Sandi Baru" name="new" type="password" value={passwords.new} onChange={onPasswordChange} placeholder="••••••••" hint="Minimal 6 karakter" />
          <Input label="Konfirmasi Kata Sandi" name="confirm" type="password" value={passwords.confirm} onChange={onPasswordChange} placeholder="••••••••" />
        </div>
      </div>

      <ConfirmationModal
        {...confirmModal}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

export default ProfileEdit;