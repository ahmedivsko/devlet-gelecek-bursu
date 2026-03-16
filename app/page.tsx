"use client"

import { useState } from "react"

export default function Home() {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <style jsx global>{`
        nextjs-portal {
          display: none !important;
        }
      `}</style>

      <div
        className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/turk_by_semrukburkut_dd4nq3h-pre.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 flex min-h-screen items-end justify-center px-4 pb-24 pt-12 md:pb-32">
          {success && !open && (
            <div className="absolute top-10 rounded-2xl border border-green-400/30 bg-green-500/20 px-6 py-3 text-sm font-medium text-green-200 shadow-[0_12px_30px_rgba(34,197,94,0.18)] backdrop-blur-md">
              ✓ Başvurunuz başarıyla gönderildi
            </div>
          )}

          {!open ? (
            <button
              onClick={() => {
                setSuccess(false)
                setOpen(true)
              }}
              className="group relative overflow-hidden rounded-[26px] border border-white/35 bg-black/45 px-8 py-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] hover:border-white/70 hover:bg-white hover:text-black md:px-10 md:py-5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="relative block text-center text-[10px] uppercase tracking-[0.5em] text-white/70 transition group-hover:text-black/60">
                Seçkin Burs Programı
              </span>
              <span className="relative mt-1 block text-center font-serif text-2xl font-semibold tracking-[0.04em] md:text-3xl">
                Başvuru Yap
              </span>
            </button>
          ) : (
            <div className="w-full max-w-xl rounded-[30px] border border-white/20 bg-black/25 p-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              <div className="rounded-[29px] bg-[#111111]/90 px-5 py-6 text-white md:px-7 md:py-7">
                <div className="mb-6 text-center">
                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/45">
                    Gençlik Gelecek Burs Programı
                  </p>
                  <h1 className="mt-2 font-serif text-2xl font-semibold tracking-[0.05em] text-white md:text-3xl">
                    Burs Başvurusu
                  </h1>
                  <p className="mt-2 text-sm text-white/70">
                    Başvurular akademik başarı ve bölüm uygunluğuna göre değerlendirilir.
                  </p>
                </div>

                <form
                  action="/api/basvuru"
                  method="POST"
                  encType="multipart/form-data"
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setLoading(true)
                    const form = e.currentTarget
                    const data = new FormData(form)

                    try {
                      const response = await fetch(form.action, {
                        method: "POST",
                        body: data,
                        headers: {
                          Accept: "application/json",
                        },
                      })

                      if (!response.ok) {
                        throw new Error("Gönderim başarısız")
                      }

                      form.reset()
                      setOpen(false)
                      setSuccess(true)
                    } catch (error) {
                      alert("Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.")
                    } finally {
                      setLoading(false)
                    }
                  }}
                >
                  <input type="hidden" name="_subject" value="Yeni burs başvurusu" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />

                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      required
                      name="Ad Soyad"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/10"
                      placeholder="Ad Soyad"
                    />

                    <input
                      required
                      type="email"
                      name="E-posta"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/10"
                      placeholder="E-posta"
                    />

                    <input
                      required
                      type="tel"
                      name="Telefon"
                      inputMode="numeric"
                      pattern="[0-9]{11}"
                      maxLength={11}
                      title="Telefon numarası 11 haneli olmalıdır"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/10"
                      placeholder="Telefon (11 hane)"
                      onInput={(e) => {
                        const target = e.currentTarget
                        target.value = target.value.replace(/[^0-9]/g, "").slice(0, 11)
                      }}
                    />

                    <input
                      required
                      name="Üniversite"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/10"
                      placeholder="Üniversite"
                    />

                    <input
                      required
                      name="Bölüm"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/10"
                      placeholder="Bölüm"
                    />

                    <input
                      required
                      name="YKS Sıralaması"
                      inputMode="numeric"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/10"
                      placeholder="YKS Sıralaması"
                      onInput={(e) => {
                        const target = e.currentTarget
                        target.value = target.value.replace(/[^0-9]/g, "")
                      }}
                    />

                    <input
                      required
                      name="Not Ortalaması"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/10 md:col-span-2"
                      placeholder="Not Ortalaması (4.00 üzerinden)"
                    />
                  </div>

                  <textarea
                    required
                    name="Motivasyon"
                    className="h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/10"
                    placeholder="Kendinizi ve programa neden uygun olduğunuzu kısaca anlatın"
                  />

                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="rounded-2xl border border-dashed border-white/25 bg-white/5 px-4 py-3 text-xs text-white/70">
                      CV Yükle
                      <input
                        required
                        type="file"
                        name="CV"
                        accept=".pdf,.doc,.docx"
                        className="mt-2 block w-full text-xs"
                      />
                    </label>

                    <label className="rounded-2xl border border-dashed border-white/25 bg-white/5 px-4 py-3 text-xs text-white/70">
                      Transkript
                      <input
                        required
                        type="file"
                        name="Transkript"
                        accept=".pdf,.jpg,.png"
                        className="mt-2 block w-full text-xs"
                      />
                    </label>

                    <label className="rounded-2xl border border-dashed border-white/25 bg-white/5 px-4 py-3 text-xs text-white/70">
                      YKS Belgesi
                      <input
                        required
                        type="file"
                        name="YKS Belgesi"
                        accept=".pdf,.jpg,.png"
                        className="mt-2 block w-full text-xs"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-3 pt-1 md:flex-row">
                    <button
                      disabled={loading}
                      className="flex-1 rounded-2xl bg-white px-6 py-3 font-medium tracking-wide text-black transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-2xl border border-white/15 bg-transparent px-6 py-3 font-medium tracking-wide text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white hover:text-black"
                    >
                      Geri Dön
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
