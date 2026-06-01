import React, { useState, useEffect } from 'react';
import { Pencil, X, Save } from 'lucide-react';
import ProfileView from '../components/profile/ProfileView';
import ProfileEdit from '../components/profile/ProfileEdit';
import useAuthStore from '../store/auth/useAuthStore';
import authService from '../services/auth/authService';
import Avatar from '../components/ui/Avatar';

function Profile() {
  const authUser = useAuthStore((state) => state.user);

  const initialUser = {
    nama: authUser?.name || '',
    email: authUser?.email || '',
    jenisKelamin: authUser?.gender || '',
    umur: authUser?.age || '',
    universitas: authUser?.university || '',
    prodi: authUser?.major || '',
    semester: authUser?.semester || '',
    photoUrl: authUser?.profile_image || null,
  };

  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState(initialUser);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [personalErrorMsg, setPersonalErrorMsg] = useState('');
  const [securityErrorMsg, setSecurityErrorMsg] = useState('');

  useEffect(() => {
    const fetchFreshProfile = async () => {
      try {
        const freshUser = await authService.getProfile();
        const newUser = {
          nama: freshUser.name || '',
          email: freshUser.email || '',
          jenisKelamin: freshUser.gender || '',
          umur: freshUser.age || '',
          universitas: freshUser.university || '',
          prodi: freshUser.major || '',
          semester: freshUser.semester || '',
          photoUrl: freshUser.profile_image || null,
        };
        setUser(newUser);
        setForm(newUser);
      } catch (err) {
        console.error("Gagal mengambil data profil terbaru:", err);
      }
    };
    fetchFreshProfile();
  }, []);

  // --- STATE KHUSUS FOTO PROFIL ---
  const [previewImage, setPreviewImage] = useState(null); // URL Base64 untuk preview
  const [imageFile, setImageFile] = useState(null);       // Objek File asli untuk dikirim ke backend

  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  const handleUserChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  // Tangani ketika gambar dipilih di ProfileEdit
  const handleImageSelected = (previewUrl, file) => {
    setPreviewImage(previewUrl);
    setImageFile(file);
  };

  // Tangani ketika gambar dihapus
  const handleImageRemove = () => {
    setPreviewImage('');
    setImageFile(null);
  };

  const handleSave = async () => {
    setPersonalErrorMsg('');
    setSecurityErrorMsg('');

    // Validasi kosong data pribadi
    if (!form.nama) { setPersonalErrorMsg("Nama wajib diisi."); return; }
    if (!form.email) { setPersonalErrorMsg("Email wajib diisi."); return; }
    if (!form.universitas) { setPersonalErrorMsg("Universitas wajib diisi."); return; }
    if (!form.prodi) { setPersonalErrorMsg("Program Studi wajib diisi."); return; }
    if (form.semester === '' || form.semester === null) { setPersonalErrorMsg("Semester wajib diisi."); return; }

    // Validasi Regex Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setPersonalErrorMsg("Format email tidak valid.");
      return;
    }

    // Validasi Umur & Semester tidak boleh negatif
    if (form.umur < 0 || form.semester < 0) {
      setPersonalErrorMsg("Umur dan Semester tidak boleh bernilai negatif.");
      return;
    }

    try {
      if (passwords.new || passwords.old) {
        if (!passwords.old) {
          setSecurityErrorMsg("Silakan masukkan kata sandi lama untuk mengubah kata sandi.");
          return;
        }
        if (passwords.new.length < 6) {
          setSecurityErrorMsg("Kata sandi baru harus memiliki minimal 6 karakter.");
          return;
        }
        if (passwords.new !== passwords.confirm) {
          setSecurityErrorMsg("Konfirmasi kata sandi baru tidak sama.");
          return;
        }
      }

      setLoading(true);

      const updatedData = {
        name: form.nama,
        email: form.email,
        gender: form.jenisKelamin,
        age: form.umur,
        university: form.universitas,
        major: form.prodi,
        semester: form.semester,
        profile_image: previewImage === '' ? null : (previewImage || user.photoUrl),
        old_password: passwords.old,
        new_password: passwords.new
      };

      const res =
        await authService
          .updateProfile(
            updatedData
          );

      const updatedUser = res;

      const newUser = {
        nama:
          updatedUser.name,

        email:
          updatedUser.email,

        jenisKelamin:
          updatedUser.gender,

        umur:
          updatedUser.age,

        universitas:
          updatedUser.university,

        prodi:
          updatedUser.major,

        semester:
          updatedUser.semester,

        photoUrl:
          updatedUser.profile_image
      };

      setUser(newUser);
      setForm(newUser);

      setIsEdit(false);

      setPreviewImage(null);
      setImageFile(null);
      setPasswords({ old: '', new: '', confirm: '' });

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Gagal update profile";
      // Asumsikan jika pesan error terkait kata sandi, tampilkan di keamanan
      if (msg.toLowerCase().includes("sandi") || msg.toLowerCase().includes("password")) {
        setSecurityErrorMsg(msg);
      } else {
        setPersonalErrorMsg(msg);
      }
    } finally {

      setLoading(false);

    }

  };

  const handleCancel = () => {
    setForm(user);
    setPreviewImage(null); // Hapus preview jika batal
    setImageFile(null);
    setPasswords({ old: '', new: '', confirm: '' });
    setPersonalErrorMsg('');
    setSecurityErrorMsg('');
    setIsEdit(false);
  };

  const initial = form?.nama?.charAt(0).toUpperCase() || 'U';
  // Tampilkan preview foto baru secara live di top bar saat edit
  const displayImage = isEdit 
    ? (previewImage === '' ? null : (previewImage || user.photoUrl)) 
    : user.photoUrl;

  return (
    <div className="p-3 pb-24 md:p-10 md:px-12 min-h-screen bg-[#F8FAFC] flex flex-col gap-5 md:gap-8">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">

        {/* KARTU ATAS: Top Bar Tunggal yang Selaras Ukurannya dengan ProfileEdit */}
        <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 shadow-sm flex items-center justify-between gap-2 p-4 md:p-8 transition-all">
          <div className="flex items-center gap-3 md:gap-6">

            {/* Area Avatar - Ukuran disamakan & proporsional */}
            <Avatar 
              src={displayImage} 
              name={isEdit ? form.nama : user.nama} 
              className="w-12 h-12 md:w-20 md:h-20 text-lg md:text-3xl rounded-xl md:rounded-2xl border-[0.67px] border-blue-100" 
            />

            {/* Nama Pengguna */}
            <h2 className="text-slate-800 md:text-neutral-950 font-bold md:font-semibold text-base md:text-xl leading-snug transition-all">
              {isEdit ? (form.nama || 'Nama Pengguna') : user.nama}
            </h2>
          </div>

          {/* Tombol Aksi - Semua ukuran mobile & desktop sudah responsif dan sama presisi */}
          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-primary-500 hover:bg-primary-700 text-white flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-[10px] text-xs md:text-base font-medium transition-all shadow-sm"
            >
              <Pencil size={14} className="md:w-4 md:h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-[10px] border border-gray-200 text-gray-600 md:text-neutral-950 text-xs md:text-base font-medium hover:bg-gray-50 transition-colors shadow-sm md:shadow-none"
              >
                <X size={14} className="md:w-4 md:h-4" />
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-primary-500 hover:bg-primary-700 text-white flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-[10px] text-xs md:text-base font-medium transition-all shadow-sm disabled:opacity-50"
              >
                <Save size={14} className="md:w-4 md:h-4" /> {loading ? '...' : ' '}
              </button>
            </div>
          )}
        </div>

        {/* Konten Dinamis (View atau Edit) */}
        {!isEdit ? (
          <ProfileView user={user} />
        ) : (
          <ProfileEdit
            form={form}
            onUserChange={handleUserChange}
            passwords={passwords}
            onPasswordChange={handlePasswordChange}
            currentPhotoUrl={user.photoUrl}
            previewImage={previewImage}
            onImageSelected={handleImageSelected}
            onImageRemove={handleImageRemove}
            personalErrorMsg={personalErrorMsg}
            securityErrorMsg={securityErrorMsg}
          />
        )}

      </div>
    </div>
  );
}

export default Profile;