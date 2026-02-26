import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Star, 
  ChevronRight,
  Scissors
} from "lucide-react";

import { useCreateOrder } from "@/hooks/use-orders";
import { api } from "@shared/routes";

// Import local assets as requested
import tempSettingsImg from "@assets/516XEadYT4L._AC_UF1000,1000_QL80__1772140489818.jpg";
import transformationImg from "@assets/26623241335c620c1de_1772140489819.webp";
import productWhiteBgImg from "@assets/Escova_(Fundo_branco)_1772140489825.jpg";

// Extend schema for form validation with better PT-BR messages
const formSchema = api.orders.create.input.extend({
  name: z.string().min(3, "Nome completo é obrigatório"),
  phone: z.string().min(10, "WhatsApp válido é obrigatório"),
  address: z.string().min(5, "Endereço é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Use a sigla do Estado (ex: SP)"),
  zipCode: z.string().min(8, "CEP inválido"),
  quantity: z.coerce.number().min(1).max(5),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const createOrder = useCreateOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormValues) => {
    createOrder.mutate(data, {
      onSuccess: () => {
        setIsOrderComplete(true);
        form.reset();
        // Scroll to top of form section to show success message clearly
        document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" });
      },
    });
  };

  const scrollToForm = () => {
    document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Floating Sticky Trust Badge */}
      <div className="fixed top-0 w-full z-50 bg-primary text-primary-foreground py-2 text-center text-sm font-medium tracking-wide shadow-md flex items-center justify-center gap-2">
        <Truck className="w-4 h-4" />
        <span>PAGAMENTO SOMENTE NA ENTREGA • RISCO ZERO</span>
      </div>

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          className="flex-1 text-center md:text-left space-y-6"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-primary font-semibold text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Resultado de salão em casa</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance">
            Diga Adeus ao Frizz e às Horas Perdidas no Salão.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
            A <strong className="text-primary font-display">Lumi Liss</strong> seca, alisa e modela em apenas 15 minutos. 
            Sem danificar os fios e com total segurança.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button onClick={scrollToForm} className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
              Quero Minha Lumi Liss
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              Pague apenas ao receber
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl transform -translate-y-10"></div>
          <img 
            src={productWhiteBgImg} 
            alt="Lumi Liss Escova Alisadora" 
            className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl mix-blend-multiply"
          />
        </motion.div>
      </section>

      {/* PAIN SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-primary mb-12"
          >
            Ainda sofre com as antigas chapinhas?
          </motion.h2>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Horas Perdidas", desc: "Acordar mais cedo e gastar até 1 hora separando mechas." },
              { icon: CheckCircle2, title: "Cabelo Queimado", desc: "Placas que não distribuem o calor e fritam as pontas." },
              { icon: CheckCircle2, title: "Frizz Constante", desc: "Qualquer umidade faz o cabelo voltar a armar na hora." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-background p-8 rounded-2xl border border-border text-center"
              >
                <div className="w-16 h-16 mx-auto bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION / FEATURES */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              A Tecnologia por Trás da Perfeição
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Desenvolvida para proteger enquanto transforma. A Lumi Liss é a evolução do alisamento capilar.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img 
                src={tempSettingsImg} 
                alt="5 níveis de temperatura" 
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="space-y-8"
            >
              {[
                { title: "25 Mini Placas de Cerâmica", desc: "Alisam uma mecha inteira de uma só vez, como se fossem 25 pranchas trabalhando juntas." },
                { title: "5 Níveis de Temperatura", desc: "Ajuste ideal para todo tipo de cabelo, de 130ºC (cabelos finos) até 210ºC (cabelos grossos)." },
                { title: "Tecnologia Íons Antifrizz", desc: "Sela as cutículas instantaneamente, garantindo brilho e maciez duradouros." },
                { title: "Sistema Anti-Queimaduras", desc: "Design inteligente que permite encostar na raiz sem queimar o couro cabeludo." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex gap-4">
                  <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-1">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="order-2 lg:order-1"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-primary mb-6">
                Transformação Impecável em Minutos
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
                Esqueça o efeito "esticado artificial" das pranchas tradicionais. A Lumi Liss proporciona um liso natural, com movimento e volume controlado.
              </motion.p>
              <motion.button variants={fadeInUp} onClick={scrollToForm} className="px-8 py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2">
                Quero esse resultado
                <Sparkles className="w-5 h-5" />
              </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent rounded-3xl transform rotate-3"></div>
              <img 
                src={transformationImg} 
                alt="Antes e depois de usar a escova" 
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            O que dizem as mulheres que já usam
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Camila R.", age: 32, text: "Eu demorava 1h30 pra fazer chapinha. Hoje em 15 minutos tô pronta pro trabalho. O brilho que fica é surreal!" },
              { name: "Juliana M.", age: 28, text: "O melhor é não pagar antes! Fiquei com medo de comprar na internet, mas eles entregaram certinho e paguei pro motoboy." },
              { name: "Amanda T.", age: 45, text: "Meu cabelo é crespo e eu achava que não ia alisar. Meninas, alisa muito e não quebra as pontas como a prancha fazia." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-border"
              >
                <div className="flex gap-1 text-gold mb-4 text-yellow-400">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="italic text-muted-foreground mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-bold font-display">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{review.name}</h4>
                    <span className="text-xs text-muted-foreground">Compradora Verificada</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE OFFER & ORDER FORM */}
      <section id="pedido" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Offer Copy */}
            <div className="text-white space-y-8">
              <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-secondary-foreground bg-secondary font-bold text-sm tracking-wide">
                ÚLTIMAS UNIDADES EM ESTOQUE
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Transforme seus cabelos hoje.
              </h2>
              
              <div className="bg-white/5 border border-white/20 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-white/60 line-through text-xl mb-1">De R$ 249,90 por</div>
                <div className="text-5xl font-bold text-white mb-4">
                  R$ 129,90
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    Frete Expresso
                  </li>
                  <li className="flex items-center gap-3 text-lg font-bold text-secondary">
                    <ShieldCheck className="w-6 h-6" />
                    PAGUE APENAS NA ENTREGA
                  </li>
                </ul>
              </div>

              <p className="text-white/80 text-lg">
                Preencha o formulário ao lado para reservar sua Lumi Liss. Nós enviamos para seu endereço e você só paga quando o produto estiver nas suas mãos.
              </p>
            </div>

            {/* Form Box */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl"
            >
              {isOrderComplete ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">Pedido Confirmado!</h3>
                  <p className="text-lg text-muted-foreground">
                    Sua Lumi Liss foi reservada com sucesso. Em breve, nossa equipe entrará em contato pelo WhatsApp para confirmar os detalhes da entrega.
                  </p>
                  <p className="font-bold text-primary mt-8">
                    Lembre-se: Você só paga no ato da entrega!
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-2">Reserve a Sua Agora</h3>
                    <p className="text-muted-foreground text-sm">Pague R$ 129,90 somente ao receber em casa.</p>
                  </div>

                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Nome Completo</label>
                      <input 
                        {...form.register("name")}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Maria Silva"
                      />
                      {form.formState.errors.name && <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">WhatsApp (com DDD)</label>
                      <input 
                        {...form.register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="(11) 99999-9999"
                      />
                      {form.formState.errors.phone && <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">CEP</label>
                        <input 
                          {...form.register("zipCode")}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="00000-000"
                        />
                        {form.formState.errors.zipCode && <p className="text-red-500 text-sm mt-1">{form.formState.errors.zipCode.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Estado</label>
                        <input 
                          {...form.register("state")}
                          maxLength={2}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                          placeholder="SP"
                        />
                        {form.formState.errors.state && <p className="text-red-500 text-sm mt-1">{form.formState.errors.state.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Cidade</label>
                      <input 
                        {...form.register("city")}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="São Paulo"
                      />
                      {form.formState.errors.city && <p className="text-red-500 text-sm mt-1">{form.formState.errors.city.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Endereço Completo (Rua, Número, Bairro)</label>
                      <input 
                        {...form.register("address")}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Rua das Flores, 123 - Centro"
                      />
                      {form.formState.errors.address && <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>}
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={createOrder.isPending}
                        className="w-full py-4 rounded-xl font-bold text-lg bg-green-600 text-white shadow-lg hover:bg-green-700 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {createOrder.isPending ? "Processando..." : "Concluir Reserva (Pagar na Entrega)"}
                      </button>
                      <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Seus dados estão 100% seguros
                      </p>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Dúvidas Frequentes</h2>
          <div className="space-y-6">
            {[
              { q: "Como funciona o pagamento na entrega?", a: "Você não paga nada agora. Após preencher o formulário, enviamos o produto. Quando o entregador chegar na sua casa com a encomenda, você efetua o pagamento diretamente a ele via PIX, Cartão ou Dinheiro." },
              { q: "Funciona em cabelo crespo?", a: "Sim! A Lumi Liss foi desenvolvida para alisar desde cabelos finos e ondulados até os mais crespos, graças aos seus 5 níveis de temperatura." },
              { q: "Qual o prazo de entrega?", a: "O prazo médio é de 3 a 7 dias úteis dependendo da sua região." },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-primary text-lg mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary py-8 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-display text-white font-bold mb-4">Lumi Liss</h2>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Lumi Liss Brasil. Todos os direitos reservados.<br/>
            Este site não é afiliado ao Facebook ou qualquer entidade do Facebook.
          </p>
        </div>
      </footer>
    </div>
  );
}
