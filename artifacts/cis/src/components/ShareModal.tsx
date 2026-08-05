import { useState } from "react";
import { Copy, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateVCard } from "@/lib/vcard";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SHARE_URL = "https://ao-cis.ru"; // Placeholder for future canonical URL
const SHARE_TEXT = `ЦИС / CIS — карта выхода бизнеса из кризиса.
Антикризисное управление · Операционный контроль · Интеллектуальная собственность
+7 989 574 04 87
info@ao-cis.ru
ao-cis.ru`;

export function ShareModal({ open, onOpenChange }: ShareModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error("Failed to copy text");
    }
  };

  const openTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(
        SHARE_TEXT
      )}`,
      "_blank"
    );
  };

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`,
      "_blank"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Передать Crisis Exit Card</DialogTitle>
          <DialogDescription>
            Отправьте карту доверенному лицу или сохраните контакт.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Button
            variant="outline"
            className="w-full justify-start font-normal"
            onClick={handleCopyLink}
          >
            {copiedLink ? (
              <Check className="mr-3 h-4 w-4 text-accent" />
            ) : (
              <Copy className="mr-3 h-4 w-4 text-muted-foreground" />
            )}
            {copiedLink ? "Ссылка скопирована" : "Скопировать ссылку"}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start font-normal"
            onClick={openTelegram}
          >
            <Send className="mr-3 h-4 w-4 text-muted-foreground" />
            Отправить в Telegram
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start font-normal"
            onClick={openWhatsApp}
          >
            <svg
              className="mr-3 h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Отправить в WhatsApp
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start font-normal"
            onClick={generateVCard}
          >
            <svg
              className="mr-3 h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Скачать vCard
          </Button>

          <div className="relative mt-2 border-t pt-4">
            <p className="mb-3 text-sm text-muted-foreground">Текст сообщения:</p>
            <div className="rounded-md bg-muted/50 p-3 text-sm leading-relaxed text-foreground whitespace-pre-wrap font-sans">
              {SHARE_TEXT}
            </div>
            <Button
              variant="secondary"
              className="mt-3 w-full font-normal"
              onClick={handleCopyText}
            >
              {copiedText ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copiedText ? "Текст скопирован" : "Скопировать короткий текст"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
