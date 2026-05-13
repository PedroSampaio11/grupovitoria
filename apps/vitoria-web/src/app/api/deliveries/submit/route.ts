import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

function formatDatePT(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const months = [
    "JAN","FEV","MAR","ABR","MAI","JUN",
    "JUL","AGO","SET","OUT","NOV","DEZ",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;
    const vehicle = formData.get("vehicle") as string;
    const titleRaw = formData.get("title") as string;

    if (!file || !location || !date || !vehicle) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    await supabase.storage
      .createBucket("delivery-images", { public: true })
      .catch(() => {});

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("delivery-images")
      .upload(fileName, file, { contentType: file.type });

    if (uploadError) {
      return NextResponse.json(
        { error: "Erro ao enviar arquivo" },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("delivery-images").getPublicUrl(fileName);

    const title = titleRaw?.trim() || `Entrega em ${location}`;
    const formattedDate = formatDatePT(date);
    const type = file.type.startsWith("video/") ? "video" : "image";

    const { error: dbError } = await supabase
      .from("delivery_submissions")
      .insert({ title, location, date: formattedDate, vehicle, image_url: publicUrl, type });

    if (dbError) {
      return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
