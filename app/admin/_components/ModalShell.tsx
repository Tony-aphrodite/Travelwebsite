'use client';
import { X } from 'lucide-react';

export function ModalShell({
  title,
  onClose,
  children,
  size = 'md',
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'md' | 'lg';
}) {
  return (
    <div
      className="fixed inset-0 bg-plum-900/50 backdrop-blur-sm z-[100] flex items-start justify-center overflow-y-auto p-4"
      onClick={onClose}
    >
      <div
        className={`bg-ivory-50 rounded-3xl ${size === 'lg' ? 'max-w-3xl' : 'max-w-2xl'} w-full my-8 shadow-soft-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-ivory-200">
          <h3 className="font-display text-2xl">{title}</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-ivory-100 flex items-center justify-center" aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
