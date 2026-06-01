'use client';
import { useRef, useState } from 'react';
import { Upload, Loader2, X, Link as LinkIcon, ImageIcon } from 'lucide-react';

export function ImageUploadField({
  value,
  onChange,
  required,
  folder = 'uploads',
}: {
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  async function handleUpload(file: File) {
    setError('');
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo subir la imagen');
      onChange(data.url);
    } catch (e: any) {
      setError(e.message || 'Error al subir');
    } finally {
      setUploading(false);
    }
  }

  function onPick() {
    inputRef.current?.click();
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    dragRef.current?.classList.remove('border-plum-500', 'bg-plum-50');
    const f = e.dataTransfer.files?.[0];
    if (f) handleUpload(f);
  }

  return (
    <div className="space-y-2">
      <div className="grid sm:grid-cols-[160px_1fr] gap-3 items-start">
        <div
          ref={dragRef}
          onClick={!value && !uploading ? onPick : undefined}
          onDragOver={(e) => {
            e.preventDefault();
            dragRef.current?.classList.add('border-plum-500', 'bg-plum-50');
          }}
          onDragLeave={() => dragRef.current?.classList.remove('border-plum-500', 'bg-plum-50')}
          onDrop={onDrop}
          className={`relative aspect-square rounded-2xl bg-ivory-100 border-2 border-dashed border-ivory-300 overflow-hidden flex items-center justify-center transition-colors ${
            !value && !uploading ? 'cursor-pointer hover:border-plum-500 hover:bg-plum-50' : ''
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-charcoal-500">
              <Loader2 size={24} className="animate-spin text-plum-700" />
              <span className="text-[10px] uppercase tracking-widest">Subiendo...</span>
            </div>
          ) : value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange(''); }}
                title="Quitar imagen"
                aria-label="Quitar imagen"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-plum-900/70 text-white hover:bg-rose-700 flex items-center justify-center backdrop-blur-sm"
              >
                <X size={13} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-charcoal-500 px-3 text-center">
              <ImageIcon size={22} />
              <span className="text-[10px] uppercase tracking-widest">Arrastra o haz clic</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
              if (e.target) e.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={onPick}
            disabled={uploading}
            className="btn btn-primary btn-sm w-full"
          >
            <Upload size={14} />
            {value ? 'Reemplazar foto' : 'Subir desde mi computadora'}
          </button>
          <p className="text-[11px] text-charcoal-500">
            JPG, PNG, WebP o GIF · máx. 4 MB. Se almacena en Vercel Blob.
          </p>
          <button
            type="button"
            onClick={() => setShowUrl(!showUrl)}
            className="text-xs text-plum-700 hover:underline inline-flex items-center gap-1"
          >
            <LinkIcon size={11} /> {showUrl ? 'Ocultar' : 'O pegar URL'}
          </button>
          {showUrl && (
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..."
              className="field-input mt-1"
              required={required && !value}
            />
          )}
        </div>
      </div>

      {error && <p className="text-xs text-rose-700">{error}</p>}
      {/* Keep an invisible required field so the form submission honors required=true */}
      {required && (
        <input
          type="text"
          value={value}
          onChange={() => {}}
          required
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />
      )}
    </div>
  );
}
