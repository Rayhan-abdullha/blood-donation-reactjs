import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { apiKey } from "../config/config";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const upload = async () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);



    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      setImageUrl(res.data.data.url);
    } catch (err) {
      console.error(err);
      setError("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 rounded-2xl bg-white shadow-lg border border-slate-200">
      <h3 className="text-lg font-black text-slate-800 mb-4">
        Upload Profile Image
      </h3>

      {/* File Input */}
      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition">
        <span className="text-sm font-semibold text-slate-500">
          Click to select image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs font-bold mt-2">{error}</p>
      )}

      {/* Upload Button */}
      <button
        onClick={upload}
        disabled={loading}
        className="mt-4 w-full py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {/* Preview */}
      {imageUrl && (
        <div className="mt-6">
          <img
            src={imageUrl}
            alt="uploaded"
            className="rounded-xl shadow-md w-full object-cover"
          />
          <p className="text-xs text-slate-500 mt-2 break-all">
            {imageUrl}
          </p>
        </div>
      )}
    </div>
  );
}
