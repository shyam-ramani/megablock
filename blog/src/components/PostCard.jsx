import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ name, control, label }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={value}
            init={{
              height: 300,
              menubar: false,
              plugins: "link image code lists",
              toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
