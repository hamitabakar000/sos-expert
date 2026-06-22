"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { FileText, FileUp, ImageIcon, Trash2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

export function MissionAttachments({ onFilesChange }: { onFilesChange?: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  function updateInput(nextFiles: File[]) {
    if (!inputRef.current || typeof DataTransfer === "undefined") return;

    const transfer = new DataTransfer();
    nextFiles.forEach((file) => transfer.items.add(file));
    inputRef.current.files = transfer.files;
  }

  function addFiles(incomingFiles: File[]) {
    setError("");

    const unsupported = incomingFiles.find((file) => !isAcceptedFile(file));
    if (unsupported) {
      setError(`${unsupported.name} n’est pas accepté. Formats autorisés : PDF, JPG et PNG.`);
      return;
    }

    const oversized = incomingFiles.find((file) => file.size > MAX_FILE_SIZE);
    if (oversized) {
      setError(`${oversized.name} dépasse la taille maximale de 10 Mo.`);
      return;
    }

    const uniqueIncoming = incomingFiles.filter(
      (file) =>
        !files.some(
          (current) =>
            current.name === file.name &&
            current.size === file.size &&
            current.lastModified === file.lastModified
        )
    );

    if (files.length + uniqueIncoming.length > MAX_FILES) {
      setError(`Vous pouvez joindre au maximum ${MAX_FILES} fichiers.`);
      return;
    }

    const nextFiles = [...files, ...uniqueIncoming];
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
    updateInput(nextFiles);
  }

  function handleSelection(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.target.files ?? []));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  }

  function removeFile(index: number) {
    const nextFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
    setError("");
    updateInput(nextFiles);
  }

  return (
    <section className="mt-8">
      <div
        className={cn(
          "rounded-lg border-2 border-dashed p-5 transition",
          dragging ? "border-accent bg-accent-light" : "border-border bg-slate-50"
        )}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setDragging(false);
          }
        }}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          name="attachments"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          multiple
          className="sr-only"
          onChange={handleSelection}
        />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-light text-accent">
              <UploadCloud className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold text-primary">Pièces jointes</p>
              <p className="mt-1 text-sm text-slate-600">
                Glissez vos fichiers ici ou sélectionnez-les depuis votre appareil.
              </p>
              <p className="mt-1 text-xs text-muted">PDF, JPG ou PNG · 10 Mo maximum · 5 fichiers</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={files.length >= MAX_FILES}
            className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FileUp className="h-4 w-4 text-accent" />
            Ajouter un fichier
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-error" role="alert">
          {error}
        </p>
      ) : null}

      {files.length ? (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-primary">
              {files.length} fichier{files.length > 1 ? "s" : ""} prêt{files.length > 1 ? "s" : ""} à être envoyé
            </p>
            <span className="text-xs text-muted">
              {files.length}/{MAX_FILES}
            </span>
          </div>
          {files.map((file, index) => {
            const Icon = file.type.startsWith("image/") ? ImageIcon : FileText;

            return (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-white p-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-primary">{file.name}</p>
                  <p className="mt-1 text-xs text-muted">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="focus-ring rounded-full p-2 text-muted hover:bg-red-50 hover:text-error"
                  aria-label={`Retirer ${file.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

function isAcceptedFile(file: File) {
  const lowerName = file.name.toLowerCase();
  return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
