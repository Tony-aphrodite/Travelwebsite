import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/525512345678"
      className="fixed bottom-8 right-8 w-[60px] h-[60px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] z-40 transition-transform duration-500 hover:scale-110 animate-pulse-ring"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2} />
    </a>
  );
}
