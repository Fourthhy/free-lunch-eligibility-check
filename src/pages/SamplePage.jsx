import { TextInput } from "flowbite-react";

export default function SamplePage() {

  return (
    <>
      <input
        type="checkbox"
        value=""
        className="h-5 w-5 rounded border-gray-300 text-blue-600 shadow-sm
               focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
               checked:bg-blue-600 checked:border-transparent
               appearance-none cursor-pointer"
      />
    </>
  );
}