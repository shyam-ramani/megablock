import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="inline-block mb-1 pl-1 font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            id={name}
            value={value}
            onEditorChange={onChange}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks",
                "code", "fullscreen", "insertdatetime", "media", "table",
                "wordcount", "help"
              ],
              toolbar:
                "undo redo | formatselect | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
          />
        )}
      />
    </div>
  )
}
