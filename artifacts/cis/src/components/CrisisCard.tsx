import { useState } from "react";
import { generateVCard } from "@/lib/vcard";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/ShareModal";

export function CrisisCard() {
  const [shareOpen, setShareOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <div 
        className={`flip-card w-full max-w-[440px] aspect-[1.586/1] mx-auto cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flip-card-inner shadow-xl rounded-xl">
          {/* Front Face */}
          <div className="flip-card-front bg-card rounded-xl border border-card-border overflow-hidden wave-relief p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-serif text-2xl font-medium tracking-wide text-foreground">
                ЦИС <span className="text-accent opacity-60">/</span> CIS
              </span>
              <span className="text-[10px] tracking-[0.2em] font-medium text-primary uppercase bg-primary/5 px-2 py-1 rounded">
                Crisis Exit Card
              </span>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest mb-2">
                Контроль
              </p>
              <h3 className="font-serif text-2xl leading-tight text-foreground">
                Карта выхода бизнеса из кризиса
              </h3>
            </div>
          </div>

          {/* Back Face */}
          <div className="flip-card-back bg-primary text-primary-foreground rounded-xl border border-primary-foreground/10 p-8 flex flex-col justify-between wave-relief">
             <div className="flex justify-between items-start opacity-50">
              <span className="font-serif text-xl">
                ЦИС / CIS
              </span>
            </div>

            <div className="space-y-4 font-sans">
              <a 
                href="tel:+79895740487" 
                className="block text-xl tracking-wide hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                +7 989 574 04 87
              </a>
              <a 
                href="mailto:info@ao-cis.ru" 
                className="block text-primary-foreground/70 hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                info@ao-cis.ru
              </a>
              <a 
                href="https://ao-cis.ru" 
                className="block text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
                target="_blank" 
                rel="noreferrer"
              >
                ao-cis.ru
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-primary-foreground/10" onClick={(e) => e.stopPropagation()}>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-8 text-xs"
                asChild
              >
                <a href="tel:+79895740487">Позвонить</a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-8 text-xs"
                onClick={generateVCard}
              >
                Сохранить
              </Button>
              <Button 
                variant="accent" 
                size="sm" 
                className="h-8 text-xs ml-auto"
                onClick={() => setShareOpen(true)}
              >
                Передать
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <ShareModal open={shareOpen} onOpenChange={setShareOpen} />
    </>
  );
}
