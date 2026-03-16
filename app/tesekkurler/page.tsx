import Link from "next/link"

export default function TesekkurlerPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/15 bg-white/5 p-10 text-center shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-white/45">
          Devlet Gelecek Burs Programı
        </p>

        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-wide">
          Başvurunuz Alındı
        </h1>

        <p className="mt-4 text-white/70 leading-7">
          İlginiz için teşekkür ederiz. Başvurunuz başarıyla tarafımıza ulaştı.
          Değerlendirme süreci tamamlandığında sizinle iletişime geçilecektir.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:bg-neutral-200"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}