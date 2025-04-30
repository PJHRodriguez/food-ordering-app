import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({
  link,
  setLink,
  width = 90,
  height = 90,
}) {
  async function handleFileChange(e) {
    e.preventDefault();
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Error uploading image");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Image uploaded!",
        error: "Error uploading image!",
      });
    }
  }

  return (
    <>
      {link && (
        <Image
          src={link}
          alt={"Avatar"}
          width={240}
          height={240}
          className={`rounded-full mx-auto object-cover h-[${height}px] w-[${width}px]`}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      )}

      {!link && (
        <div
          className={`rounded-full mx-auto bg-gray-200 h-[${height}px] w-[${width}px] flex items-center justify-center`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <p className="text-center">No image uploaded</p>
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border rounded-lg border-gray-300 py-2 text-center cursor-pointer">
          Edit{" "}
        </span>
      </label>
    </>
  );
}
