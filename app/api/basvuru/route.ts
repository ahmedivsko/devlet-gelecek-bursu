import { Resend } from "resend";

async function fileToBase64(file: File) {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes).toString("base64");
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return Response.json(
        { success: false, error: "RESEND_API_KEY tanimli degil" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const formData = await req.formData();

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("Telefon") || "");
    const university = String(formData.get("Üniversite") || "");
    const department = String(formData.get("Bölüm") || "");
    const yksRank = String(formData.get("YKS Sıralaması") || "");
    const gpa = String(formData.get("Not Ortalaması") || "");
    const motivation = String(formData.get("Motivasyon") || "");

    const cv = formData.get("CV") as File | null;
    const transcript = formData.get("Transkript") as File | null;
    const yksDoc = formData.get("YKS Belgesi") as File | null;

    const attachments: { filename: string; content: string }[] = [];

    if (cv && cv.size > 0) {
      attachments.push({
        filename: cv.name,
        content: await fileToBase64(cv),
      });
    }

    if (transcript && transcript.size > 0) {
      attachments.push({
        filename: transcript.name,
        content: await fileToBase64(transcript),
      });
    }

    if (yksDoc && yksDoc.size > 0) {
      attachments.push({
        filename: yksDoc.name,
        content: await fileToBase64(yksDoc),
      });
    }

    await resend.emails.send({
      from: "Burs Basvuru <onboarding@resend.dev>",
      to: "ahmethankaradag21@gmail.com",
      subject: "Yeni Burs Basvurusu",
      html: `
        <h2>Yeni Başvuru</h2>
        <p><b>Ad Soyad:</b> ${name}</p>
        <p><b>E-posta:</b> ${email}</p>
        <p><b>Telefon:</b> ${phone}</p>
        <p><b>Üniversite:</b> ${university}</p>
        <p><b>Bölüm:</b> ${department}</p>
        <p><b>YKS Sıralaması:</b> ${yksRank}</p>
        <p><b>Not Ortalaması:</b> ${gpa}</p>
        <p><b>Motivasyon:</b><br/>${motivation}</p>
      `,
      attachments,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Basvuru gonderim hatasi:", error);
    return Response.json(
      { success: false, error: "Mail gonderilemedi" },
      { status: 500 }
    );
  }
}