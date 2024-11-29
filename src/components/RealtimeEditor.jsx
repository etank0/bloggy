import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { useTheme } from "../context/ThemeContext";
import tinymceConfig from "../configs/tinymce";

export default function RealtimeEditor({
  name,
  control,
  label,
  defaultValue = "",
}) {
  const { theme } = useTheme();
  const charLimit = 8000;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => { }, [theme]);

  return (
    <div className="flex flex-col w-full flex-1">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        rules={{
          maxLength: {
            value: charLimit,
            message: `Content cannot exceed ${charLimit} characters.`,
          },
        }}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={tinymceConfig.tinymceKey}
            key={theme}
            initialValue={defaultValue}
            init={{
              min_height: 500,
              height: 500,
              resize: true,
              menubar: true,
              plugins: [
                "autoresize",
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "codesample",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              skin: theme === "dark" ? "oxide-dark" : "oxide",
              content_css: theme === "dark" ? "dark" : "default",
              setup: (editor) => {
                editor.on("keydown", (e) => {
                  const contentHtml = editor.getContent();
                  const contentLength = contentHtml.length;

                  if (contentLength >= charLimit && e.key !== "Backspace" && e.key !== "Delete") {
                    e.preventDefault();
                    setErrorMessage(`Content exceeds the ${charLimit} character limit.`);
                  } else {
                    setErrorMessage("");
                  }
                });
              },
            }}
            onEditorChange={onChange}
          />
        )}
      />

      {errorMessage && (
        <div className="text-red-400 text-sm mt-1">
          {errorMessage}
        </div>
      )}

    </div>
  );
}

