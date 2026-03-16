import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const formData = await req.formData()

  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("Telefon")
  const university = formData.get("Üniversite")
  const department = formData.get("Bölüm")
  const yks = formData.get("YKS Sıralaması")

  await resend.emails.send({
    from: "Burs Başvuru <onboarding@resend.dev>",
    to: "ahmethankaradag21@gmail.com",
    subject: "Yeni Burs Başvurusu",
    html: `
      <h2>Yeni Başvuru</h2>
      <p><b>Ad:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Telefon:</b> ${phone}</p>
      <p><b>Üniversite:</b> ${university}</p>
      <p><b>Bölüm:</b> ${department}</p>
      <p><b>YKS Sıralaması:</b> ${yks}</p>
    `
  })

  return Response.json({ success: true })
}