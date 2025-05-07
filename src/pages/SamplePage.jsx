import { TextInput } from "flowbite-react";

export default function SamplePage() {

  return (
    <>
        <TextInput
          color="grey"
          placeholder="password"
          type="password"
        />
        <input type="password" className="border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-primary-200 focus:ring-primary-200"/>
    </>
  );
}