export async function uploadImageToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
  
    formData.append("file", file);
    formData.append("upload_preset", "invictus"); // seu preset unsigned
  
    const cloudName = "da2nn5x5r"; // substitua pelo seu
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) throw new Error("Erro ao fazer upload da imagem");
  
      const data = await res.json();
      return data.secure_url; // URL final da imagem
    } catch (error) {
      console.error("Erro no upload para Cloudinary:", error);
      throw error;
    }
  }
  