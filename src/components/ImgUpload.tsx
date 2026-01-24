import { useState, type ChangeEvent } from "react";
// TODO
interface UploadResponse {
  data?: {
    url: string;
    delete_url: string;
  };
}

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [deleteUrl, setDeleteUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const upload = async () => {
    if (!file) return alert("Select an image");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        throw new Error("Upload failed");
      }

        const data: UploadResponse = await res.json();
        console.log(data)

      if (!data.data?.url || !data.data?.delete_url)
        throw new Error("Invalid response");

      setImageUrl(data.data.url);
      setDeleteUrl(data.data.delete_url);

    //   // Optionally save to backend DB
    //   await fetch("http://localhost:4000/api/images", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       imageUrl: data.data.url,
    //       deleteUrl: data.data.delete_url,
    //     }),
    //   });
    } catch (err) {
      console.log(err)
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUrl) return;
    try {
      await fetch("http://localhost:4000/api/images/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteUrl }),
      });
      alert("Image deleted");
      setImageUrl("");
      setDeleteUrl("");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={upload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="uploaded" width="100%" />
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
