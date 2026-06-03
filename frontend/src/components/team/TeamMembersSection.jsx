import { teamData } from '../../data/teamData'
import { Mail } from 'lucide-react'

const LinkedinIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GithubIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-8.3A5.5 5.5 0 0 0 18.5 3a5.4 5.4 0 0 0-1.5-1.5C14.7 1.5 12 1.5 9 1.5c-3 0-5.7 0-7.5 1.5A5.4 5.4 0 0 0 .5 3 5.5 5.5 0 0 0 0 6.5c0 6.8 3 8 6 8.3A4.8 4.8 0 0 0 5 18v4" />
    <path d="M9 18c-4.5 1.5-5-2.5-7-3" />
  </svg>
)

function TeamMembersSection() {
  const leader = teamData.find(member => member.id === 'naufal')
  const members = teamData.filter(member => member.id !== 'naufal')

  return (
    <section id="team" className="pt-20 pb-10 md:pt-32 md:pb-16 bg-slate-50">
      <div className="w-full px-4 md:px-16 lg:px-24">

        {/* Project Leader Card */}
        {leader && (
          <div className="mb-8">
            <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500">

              <div className="w-full md:w-[320px] aspect-[3/4] rounded-[24px] overflow-hidden shrink-0 bg-slate-100 relative">
                <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://placehold.co/600x800/e2e8f0/64748b?text=Foto' }} />
                <div className="absolute bottom-0 left-0 right-0 bg-[#006D5B] text-white text-center py-4 font-bold uppercase tracking-widest text-sm">
                  PROJECT LEADER
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center py-4 md:pr-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#006D5B] mb-2">{leader.name}</h3>
                <p className="text-[#34d399] font-semibold text-sm mb-4">{leader.role}</p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-medium px-3 py-1 rounded-md">
                    {leader.studentId}
                  </span>
                  {leader.isActive && (
                    <span className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      Aktif
                    </span>
                  )}
                </div>

                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  "{leader.description}"
                </p>

                <div className="flex flex-col mt-auto pt-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {leader.skills.map(skill => (
                      <span key={skill} className="bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-medium px-3 py-1.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 text-slate-300">
                    <button className="hover:text-[#006D5B] transition-colors"><LinkedinIcon size={18} /></button>
                    <button className="hover:text-[#006D5B] transition-colors"><GithubIcon size={18} /></button>
                    <button className="hover:text-[#006D5B] transition-colors"><Mail size={18} /></button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Grid Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {members.map(member => (
            <div key={member.id} className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300">

              <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-100 mb-6 relative">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://placehold.co/400x500/e2e8f0/64748b?text=Foto' }} />
              </div>

              <div className="flex-1 flex flex-col">
                <h4 className="text-[19px] font-bold text-[#006D5B] mb-1">{member.name}</h4>
                <p className="text-[#34d399] font-semibold text-xs mb-4">{member.role}</p>

                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-medium px-2 py-1 rounded-md">
                    {member.studentId}
                  </span>
                  {member.isActive && (
                    <span className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      Aktif
                    </span>
                  )}
                </div>

                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 flex-1">
                  "{member.description}"
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {member.skills.map(skill => (
                    <span key={skill} className="bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-medium px-2 py-1.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 text-slate-300 mt-auto pt-4 border-t border-slate-50">
                  <button className="hover:text-[#006D5B] transition-colors"><LinkedinIcon size={16} /></button>
                  <button className="hover:text-[#006D5B] transition-colors"><GithubIcon size={16} /></button>
                  <button className="hover:text-[#006D5B] transition-colors"><Mail size={16} /></button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TeamMembersSection
