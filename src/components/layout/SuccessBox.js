export default function SuccessBox({ children }) {
  return (
    <div className="text-center bg-green-400 p-4 rounded-lg font-semibold  text-gray-100 ">
      {" "}
      {children}
    </div>
  );
}
