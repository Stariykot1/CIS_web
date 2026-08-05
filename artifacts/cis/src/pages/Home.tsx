import { useState } from "react";
import { CrisisCard } from "@/components/CrisisCard";
import { CrisisForm } from "@/components/CrisisForm";
import { ShareModal } from "@/components/ShareModal";
import { ServicesCatalog } from "@/components/ServicesCatalog";
import { generateVCard } from "@/lib/vcard";
import { Button } from "@/components/ui/button";

const SITUATIONS = [
  "Бизнес работает в убыток",
  "Потерян операционный контроль",
  "Нет прозрачности платежей",
  "Требуется перезапуск бизнеса",
  "Нужна подготовка к продаже",
  "Конфликт между собственниками или менеджментом",
  "Бренд, права или digital-активы под угрозой",
  "Нужна стратегия выхода из кризиса"
];

const DIRECTIONS = [
  {
    title: "Антикризисное управление",
    description: "Комплексное антикризисное управление бизнесом и активами с целью восстановления их рыночной стоимости, управляемости и экономической устойчивости.",
    list: [
      "диагностика кризисной ситуации",
      "разработка стратегии выхода из кризиса",
      "перезапуск бизнес-модели",
      "снижение убытков и вывод бизнеса в прибыль",
      "реструктуризация процессов и обязательств",
      "подготовка актива к продаже или привлечению инвестора"
    ]
  },
  {
    title: "Операционный контроль",
    description: "Восстановление системы управления бизнесом через операционную эффективность, финансовую дисциплину, регламенты, платежный календарь, KPI и контроль исполнения.",
    list: [
      "платежный календарь",
      "контроль денежных потоков",
      "управленческая отчетность",
      "локальные акты и регламенты",
      "KPI и зоны ответственности",
      "оптимизация расходов",
      "налоговая и финансовая оптимизация законными инструментами"
    ]
  },
  {
    title: "Интеллектуальная собственность",
    description: "Защита и управление интеллектуальными активами бизнеса: брендами, товарными знаками, технологиями, контентом, digital-активами, данными и репутацией.",
    list: [
      "аудит портфеля интеллектуальной собственности",
      "защита товарных знаков и брендов",
      "споры о правах, доменах и digital-активах",
      "защита от копирования и недобросовестной конкуренции",
      "лицензирование и договоры",
      "IP due diligence",
      "AI, данные и цифровые риски"
    ]
  }
];

const PROCESS_STEPS = [
  {
    title: "Диагностика",
    desc: "Определяем реальное состояние бизнеса: финансовые потоки, операционные сбои, управленческие конфликты, правовые риски и источники убытков."
  },
  {
    title: "Стабилизация",
    desc: "Фиксируем контроль над платежами, обязательствами, решениями, документами и ключевыми активами."
  },
  {
    title: "Стратегия",
    desc: "Формируем сценарий выхода из кризиса: снижение убытков, восстановление управляемости, реструктуризация, перезапуск или подготовка к продаже."
  },
  {
    title: "Реализация",
    desc: "Внедряем решения: платежный календарь, KPI, локальные акты, регламенты, переговорную позицию, IP-защиту и операционную дисциплину."
  },
  {
    title: "Контроль",
    desc: "Сопровождаем бизнес до восстановления управляемости и понятного сценария дальнейшего развития."
  }
];

export default function Home() {
  const [shareOpen, setShareOpen] = useState(false);
  const [activeSituation, setActiveSituation] = useState<number | null>(null);

  const scrollToForm = () => {
    document.getElementById("intake-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-accent/20">
      
      {/* HEADER / HERO */}
      <header className="relative pt-12 pb-24 md:pt-24 md:pb-32 overflow-hidden border-b border-border">
        {/* Subtle background noise/gradient could go here if needed, but keeping it clean for now */}
        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <div className="max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="mb-12">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-4">
                  ЦИС <span className="text-accent">/</span> CIS
                </h1>
                <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest leading-relaxed">
                  Центр Интеллектуальной Собственности<br className="hidden md:block"/> и Антикризисного Управления
                </p>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-[1.1] mb-6">
                Карта выхода бизнеса из кризиса
              </h2>

              <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed mb-8">
                ЦИС помогает собственникам и бенефициарам проблемных активов вернуть контроль над бизнесом, снизить убытки, восстановить операционную эффективность и защитить активы, создающие стоимость.
              </p>

              <div className="py-4 border-y border-border mb-10">
                <p className="text-sm font-medium text-foreground tracking-wider uppercase">
                  Антикризисное управление <span className="text-accent mx-2">·</span> Операционный контроль <span className="text-accent mx-2">·</span> Интеллектуальная собственность
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a href="tel:+79895740487">Позвонить</a>
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToForm}>
                  Описать ситуацию
                </Button>
                <Button size="lg" variant="ghost" onClick={generateVCard}>
                  Сохранить карту
                </Button>
              </div>
            </div>

            <div className="lg:justify-self-end w-full animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
              <CrisisCard />
            </div>
          </div>
        </div>
      </header>

      {/* SITUATIONS */}
      <section className="py-24 bg-card/50">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Что произошло?</h2>
            <p className="text-muted-foreground text-lg">
              Выберите ситуацию, если бизнесу нужен быстрый сценарий действий.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SITUATIONS.map((sit, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSituation(activeSituation === idx ? null : idx)}
                className={`text-left p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[140px]
                  ${activeSituation === idx 
                    ? 'bg-primary border-primary text-primary-foreground shadow-md' 
                    : 'bg-card border-card-border hover:border-primary/30 hover:shadow-sm text-foreground'
                  }`}
              >
                <span className="font-medium text-lg leading-tight block mb-4">{sit}</span>
                
                <div className={`text-sm overflow-hidden transition-all duration-300 
                  ${activeSituation === idx ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'}`}>
                  <div className="pt-4 border-t border-primary-foreground/20 text-primary-foreground/80">
                    ЦИС оценивает ситуацию, выделяет ключевые риски и формирует ближайший сценарий действий.
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section className="py-32">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-16 text-center">
            Три направления ЦИС
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DIRECTIONS.map((dir, idx) => (
              <div key={idx} className="bg-card border border-card-border rounded-xl p-8 md:p-10 shadow-sm flex flex-col">
                <h3 className="font-serif text-2xl text-primary mb-4">{dir.title}</h3>
                <p className="text-secondary-foreground/80 mb-8 pb-8 border-b border-border text-lg">
                  {dir.description}
                </p>
                <ul className="space-y-4 text-sm md:text-base text-foreground mt-auto">
                  {dir.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent mt-1">—</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES CATALOG */}
      <ServicesCatalog />

      {/* PROCESS */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Radial SVG pattern */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 900 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric circles */}
          {Array.from({ length: 16 }, (_, i) => (
            <circle
              key={`c${i}`}
              cx="450"
              cy="450"
              r={(i + 1) * 45}
              fill="none"
              stroke="white"
              strokeOpacity={0.055 - i * 0.002}
              strokeWidth="1"
            />
          ))}
          {/* Radiating lines every 20° */}
          {Array.from({ length: 18 }, (_, i) => (
            <line
              key={`l${i}`}
              x1="450"
              y1="450"
              x2="450"
              y2="0"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="0.7"
              transform={`rotate(${i * 20} 450 450)`}
            />
          ))}
        </svg>

        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 opacity-90">Как работает ЦИС</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-primary-foreground/20 z-0"></div>
            
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary border border-primary-foreground/20 flex items-center justify-center text-accent font-serif text-2xl mb-6 shadow-sm">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-medium mb-3">{step.title}</h4>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARD CTA SECTION */}
      <section className="py-32 border-b border-border">
        <div className="container max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Карта выхода бизнеса из кризиса</h2>
            <p className="text-lg text-secondary-foreground/80 mb-8 leading-relaxed">
              Crisis Exit Card — быстрый вход в ЦИС для собственников, бенефициаров и управленческих команд, которым нужно срочно оценить кризисную ситуацию и определить ближайшие действия.
            </p>
            <p className="font-serif text-2xl text-primary italic mb-12">
              Сохраните карту. Она нужна не каждый день — но в кризисный день.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                 <a href="tel:+79895740487">Позвонить</a>
              </Button>
              <Button size="lg" variant="outline" onClick={generateVCard}>
                Сохранить контакт
              </Button>
              <Button size="lg" variant="accent" onClick={() => setShareOpen(true)}>
                Передать карту
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="intake-form" className="py-32 bg-card/30 scroll-mt-12">
        <div className="container max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-center">
            Описать кризисную ситуацию
          </h2>
          <CrisisForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground py-16 mt-auto">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-primary-foreground/10 pb-12 mb-8">
            <div className="lg:col-span-2">
              <span className="font-serif text-3xl font-medium tracking-wide block mb-2">
                ЦИС <span className="text-accent opacity-60">/</span> CIS
              </span>
              <p className="text-sm text-primary-foreground/60 max-w-xs uppercase tracking-widest leading-relaxed">
                Центр Интеллектуальной Собственности<br/> и Антикризисного Управления
              </p>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/40 mb-4">Контакты</p>
              <div className="space-y-3">
                <a href="tel:+79895740487" className="block text-lg hover:text-accent transition-colors">
                  +7 989 574 04 87
                </a>
                <a href="mailto:info@ao-cis.ru" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  info@ao-cis.ru
                </a>
                <a href="https://ao-cis.ru" className="block text-primary-foreground/60 hover:text-accent transition-colors">
                  ao-cis.ru
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/40 mb-4">Действия</p>
              <div className="space-y-3 flex flex-col items-start">
                <button onClick={generateVCard} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Сохранить контакт
                </button>
                <button onClick={() => setShareOpen(true)} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Передать контакт
                </button>
                <a href="mailto:info@ao-cis.ru" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Написать
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/40">
            <p>© {new Date().getFullYear()} ЦИС / CIS</p>
            <p className="mt-2 md:mt-0">Карта выхода бизнеса из кризиса</p>
          </div>
        </div>
      </footer>

      <ShareModal open={shareOpen} onOpenChange={setShareOpen} />
    </div>
  );
}
