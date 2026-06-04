'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { useT } from '@/lib/i18n/LocaleProvider';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function AureliaAI() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the latest message.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  // Hide the teaser after 12s so it doesn't sit forever.
  useEffect(() => {
    const id = setTimeout(() => setShowTeaser(false), 12000);
    return () => clearTimeout(id);
  }, []);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text: string) => {
    const userText = text.trim();
    if (!userText || sending) return;
    setError('');
    setInput('');
    const next: Msg[] = [...messages, { role: 'user', content: userText }];
    setMessages(next);
    setSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.ai.errorGeneric);
      } else if (data.reply) {
        setMessages([...next, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setError(t.ai.errorNetwork);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* TEASER bubble shown next to the floating button on first paint. */}
      {!open && showTeaser && (
        <div className="fixed bottom-24 right-6 sm:right-8 z-40 max-w-[260px] bg-ivory-50 rounded-2xl shadow-soft-xl border border-ivory-200 p-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <button
            onClick={() => setShowTeaser(false)}
            aria-label={t.ai.close}
            className="absolute top-2 right-2 w-6 h-6 rounded-full text-charcoal-500 hover:bg-ivory-100 flex items-center justify-center"
          >
            <X size={12} />
          </button>
          <div className="flex items-start gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-plum-700 text-white flex items-center justify-center shrink-0 shadow-soft">
              <Sparkles size={14} />
            </div>
            <div>
              <div className="font-display text-sm text-plum-700 leading-tight">{t.ai.greetingTitle}</div>
              <div className="text-xs text-charcoal-500 mt-1 leading-snug">{t.ai.greetingPrompt}</div>
            </div>
          </div>
        </div>
      )}

      {/* CHAT PANEL */}
      {open && (
        <div className="fixed bottom-24 right-6 sm:right-8 z-40 w-[min(380px,calc(100vw-3rem))] h-[min(560px,calc(100vh-9rem))] bg-ivory-50 rounded-3xl shadow-soft-xl border border-ivory-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* header */}
          <div className="bg-gradient-to-br from-plum-700 to-rose-700 text-ivory-50 px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-ivory-50/15 backdrop-blur-md border border-ivory-50/25 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-base leading-none">{t.ai.greetingTitle}</div>
              <div className="text-[11px] text-ivory-100/80 mt-1">{t.ai.subline}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t.ai.close}
              className="w-8 h-8 rounded-full hover:bg-ivory-50/15 flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-ivory-100">
            {messages.length === 0 && (
              <div className="text-center pt-6 pb-4 text-xs text-charcoal-500">
                <p className="mb-3 max-w-[260px] mx-auto">{t.ai.welcomeIntro}</p>
                <div className="flex flex-col gap-2 max-w-[280px] mx-auto">
                  {t.ai.starters.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs bg-ivory-50 hover:bg-ivory-200 border border-ivory-200 rounded-2xl px-3 py-2 text-plum-700 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-plum-700 text-ivory-50 rounded-br-md'
                      : 'bg-ivory-50 text-charcoal-700 border border-ivory-200 rounded-bl-md'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-ivory-50 border border-ivory-200 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-charcoal-500 flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  {t.ai.thinking}
                </div>
              </div>
            )}
            {error && (
              <div className="text-[11px] text-rose-700 bg-rose-100 rounded-xl px-3 py-2 leading-snug">
                {error}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-ivory-200 p-3 flex gap-2 shrink-0 bg-ivory-50"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.ai.inputPlaceholder}
              className="flex-1 bg-ivory-100 border border-ivory-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-plum-500"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-plum-700 to-rose-700 text-ivory-50 flex items-center justify-center shrink-0 disabled:opacity-40 transition-all hover:scale-105"
              aria-label={t.ai.send}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setShowTeaser(false);
        }}
        aria-label={t.ai.openLabel}
        className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-plum-700 via-rose-500 to-gold-500 text-ivory-50 flex items-center justify-center shadow-[0_12px_30px_rgba(11,21,53,0.45)] z-50 transition-transform duration-500 hover:scale-110"
      >
        {open ? <X size={26} /> : <Sparkles size={26} />}
      </button>
    </>
  );
}
