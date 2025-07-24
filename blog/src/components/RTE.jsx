import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ name, control, label, defaultValue = "" }) {
  if (!control) {
    console.error("RTE: control prop is null. Make sure you're passing it from useForm.");
    return null;
  }

  return (
    <div className="w-full mb-4">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            value={value}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
