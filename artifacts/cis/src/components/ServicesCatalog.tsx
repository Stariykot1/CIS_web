import { useState } from "react";

const SERVICES = [
  {
    title: "ИТ-аудит",
    items: [
      "Аудит ИТ-бюджета (план-факт, соответствие стратегии, дорожной карте, плану)",
      "Аудит финансово-хозяйственной деятельности ИТ-функции",
      "Аудит эффективности автоматизации/оцифровки бизнес-процессов",
      "Анализ эффективности проектов",
      "Аудит руководящих документов по ИТ/цифровизации",
      "Аудит ИТ-персонала",
      "Аудит ИТ-инфраструктуры",
      "Аудит ИБ — защищённости инф. систем, приложений, инфраструктуры, документации",
      "Экспертиза ИТ-проектов",
      "Аудит системы организации ИТ-функции",
      "Аудит инвестиций в ИТ/цифровизацию",
      "Аудит отдельных информационных систем/приложений",
      "Аудит ИТ-активов",
      "Лицензионный аудит (SAM)",
      "Аудит функционирования отдельных ИТ-функций",
      "Аудит внутренней автоматизации и учёта в ИТ-функции",
    ],
  },
  {
    title: "Создание и разработка руководящих материалов по ИТ/цифровизации",
    items: [
      "Разработка ИТ-стратегии (стратегии цифровизации)",
      "Разработка оргструктуры ИТ-функции",
      "Разработка дорожной карты",
      "Разработка регламентов/положений/концепций/процедур",
      "Разработка ИТ-политик",
      "Разработка положений о подразделениях",
      "Разработка должностных инструкций",
      "Разработка целевых инструкций и руководств",
      "Разработка форм журналов, реестров, форм документов",
      "Разработка каталога ИТ-услуг",
      "Разработка SLA",
      "Разработка KPI для ИТ-функции",
    ],
  },
  {
    title: "Внедрение информационных систем и бизнес-приложений",
    items: [
      "Приложения на платформе 1С",
      "Приложения на платформе Microsoft",
      "Приложения на платформе SAP",
      "ERP-системы",
      "WMS-системы",
      "CRM-системы",
      "SCM-системы",
      "BPM-системы",
      "HelpDesk, ServiceDesk системы",
      "Системы бюджетирования и финансового планирования",
      "Системы документооборота (СЭД)",
      "Системы обучения персонала",
      "Системы подбора и учёта персонала",
      "Системы бизнес-аналитики (BI)",
    ],
  },
  {
    title: "Коучинг, мастер-классы, обучение",
    items: [
      "Мастер-классы для владельцев бизнеса по управлению и развитию ИТ",
      "Мастер-классы для C-уровня по взаимодействию с ИТ-функцией",
      "Мастер-классы для директоров / руководителей по ИТ/цифровизации",
      "Краткосрочные курсы по управлению ИТ для руководителей ИТ middle-уровня",
      "Курс по ИТ-менеджменту",
      "Стратегические сессии",
      "Тематическое обучение/наставничество по отдельным направлениям (управление проектами, внедрение систем, управление инфраструктурой, управление поддержкой и т.д.)",
    ],
  },
  {
    title: "Проектирование ИТ-инфраструктуры",
    items: [
      "Обследование",
      "Архитектурное проектирование",
      "Физическое проектирование",
      "Проектирование подсистем резервирования и аварийного восстановления (BCP/DRP)",
      "Внедрение, передача в эксплуатацию",
      "Сопровождение",
    ],
  },
  {
    title: "Аутсорсинг",
    items: [
      "Общая организация использования ИТ-аутсорсинга в ИТ-функции",
      "Аутсорсинг технической поддержки",
      "Аутсорсинг печати",
      "Аутсорсинг разработки информационных систем и приложений",
      "Аутсорсинг информационной безопасности",
      "Аутсорсинг управления проектами",
    ],
  },
  {
    title: "Проектирование систем информационной безопасности",
    items: [
      "Анализ текущего состояния (аудит ИБ)",
      "Анализ защищённости инфраструктуры",
      "Анализ защищённости информационных систем",
      "Разработка стратегий/концепций ИБ",
      "Разработка планов развития ИБ",
      "Разработка внутренних руководящих документов по ИБ",
      "Разработка дорожной карты/бюджета по ИБ",
      "Проектирование систем ИБ согласно стратегии ИБ",
      "Подготовка к прохождению аудитов по ИБ",
    ],
  },
  {
    title: "Управление проектами",
    items: [
      "Оценка текущих проектов",
      "Разработка планов, дорожных карт, бюджетов проектов",
      "Управление проектами",
      "Разработка пакетов руководящих документов по ведению ИТ-проектов",
      "Контроль/мониторинг ведения текущих проектов",
    ],
  },
  {
    title: "Управление персоналом ИТ",
    items: [
      "Анализ управления ИТ-функцией",
      "Разработка оргструктуры, штатного расписания ИТ-функции",
      "Анализ эффективности работы ИТ-персонала",
      "Подбор ИТ-персонала",
      "Разработка метрик, KPI работы ИТ-персонала",
      "Разработка мотивационных схем для ИТ-персонала",
      "Разработка должностных инструкций",
      "Анализ ФОТ",
    ],
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative bg-card border border-card-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-md flex flex-col items-start"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Header */}
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4 focus:outline-none"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-3 min-w-0">
          <span
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-primary-foreground mt-0.5"
            style={{ backgroundColor: "#309779" }}
          >
            {index + 1}
          </span>
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
            {service.title}
          </h3>
        </div>
        <span
          className="shrink-0 ml-2 mt-1 flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border transition-colors duration-200"
          style={{
            color: "#309779",
            borderColor: "rgba(48,151,121,0.3)",
            backgroundColor: "rgba(48,151,121,0.06)",
          }}
        >
          {service.items.length}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Expandable list */}
      <div
        className="w-full overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? "320px" : "0px",
          opacity: expanded ? 1 : 0,
        }}
      >
        <ul className="services-scroll px-6 pb-6 space-y-2 border-t border-border pt-4 overflow-y-auto"
          style={{ maxHeight: "320px" }}
        >
          {service.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground/80 leading-relaxed">
              <span className="shrink-0 mt-0.5 font-medium" style={{ color: "#309779" }}>
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ServicesCatalog() {
  return (
    <section className="py-32 bg-card/30">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Каталог услуг
          </h2>
          <p className="text-muted-foreground text-lg">
            Наведите на категорию, чтобы увидеть полный перечень услуг.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
