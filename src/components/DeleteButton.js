import { useState } from "react";

export default function DeleteButton({ label, onDelete, icon }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center  ">
        <div className=" bg-white px-16 py-8 rounded-2xl">
          <div className="text-center">Are you sure want to delete? </div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="bg-primary !text-white"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      className={
        icon &&
        "bg-red-500 !px-2 !py-1 rounded-md !text-white hover:bg-red-700 transition-all "
      }
      onClick={() => setShowConfirm(true)}
    >
      {label}
    </button>
  );
}
