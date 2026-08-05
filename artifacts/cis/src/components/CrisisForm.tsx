import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  company: z.string().min(2, "Введите название компании"),
  contact: z.string().min(5, "Введите телефон или email"),
  situation: z.string().min(10, "Кратко опишите ситуацию"),
  threats: z.string().min(5, "Укажите, что под угрозой"),
  goal: z.string({ required_error: "Выберите цель" }),
  urgency: z.string({ required_error: "Выберите срочность" }),
});

type FormValues = z.infer<typeof formSchema>;

export function CrisisForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      contact: "",
      situation: "",
      threats: "",
      goal: "",
      urgency: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Ошибка отправки");
      }
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Ошибка отправки. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-card-border rounded-xl p-8 text-center sm:p-12 wave-relief">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-serif text-2xl mb-4 text-foreground">Ситуация передана</h3>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          ЦИС свяжется с вами для первичной оценки и определения ближайших действий.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-card-border rounded-xl p-6 sm:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван Иванов" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Компания</FormLabel>
                  <FormControl>
                    <Input placeholder="Название или ИНН" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Телефон или email</FormLabel>
                  <FormControl>
                    <Input placeholder="+7 (...) или email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Что произошло?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Кратко опишите текущую ситуацию" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="threats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Что под угрозой?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Активы, контракты, контроль, репутация..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цель обращения</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите цель" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="снизить убытки">Снизить убытки</SelectItem>
                      <SelectItem value="вернуть контроль">Вернуть контроль</SelectItem>
                      <SelectItem value="выйти в прибыль">Выйти в прибыль</SelectItem>
                      <SelectItem value="подготовить к продаже">Подготовить к продаже</SelectItem>
                      <SelectItem value="защитить актив">Защитить актив</SelectItem>
                      <SelectItem value="урегулировать конфликт">Урегулировать конфликт</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Срочность</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Оцените срочность" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="сегодня">Сегодня</SelectItem>
                      <SelectItem value="24 часа">24 часа</SelectItem>
                      <SelectItem value="неделя">Неделя</SelectItem>
                      <SelectItem value="плановая диагностика">Плановая диагностика</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}
          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Передать ситуацию в ЦИС"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
