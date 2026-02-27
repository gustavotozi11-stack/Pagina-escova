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
  Heart,
  MessageCircle,
  Shield,
  RotateCcw,
  BadgeCheck,
  ThumbsUp
} from "lucide-react";

import { useCreateOrder } from "@/hooks/use-orders";
import { api } from "@shared/routes";

// Import local assets as requested
import tempSettingsImg from "@assets/516XEadYT4L._AC_UF1000,1000_QL80__1772140489818.jpg";
import transformationImg from "@assets/26623241335c620c1de_1772140489819.webp";
import productWhiteBgImg from "@assets/Escova_(Fundo_branco)_(1)_1772144130062.png";

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

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-[#1A1A1A] text-lg py-2 group"
      >
        <span className="group-hover:text-[#C2185B] transition-colors">{question}</span>
        <div className={`w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 bg-[#C2185B] border-[#C2185B] text-white' : ''}`}>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </button>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: "auto" }}
          className="text-[#666] mt-3 leading-relaxed text-base"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

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

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A] overflow-x-hidden">
      {/* 1. STICKY TOP BAR */}
      <div className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white py-3 text-center text-[11px] md:text-xs font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 px-4 shadow-sm sticky top-0 z-[100]">
        <Clock className="w-3.5 h-3.5" />
        <span>Oferta por tempo limitado: 48% de desconto</span>
      </div>

      {/* 2. NEW HERO SECTION (Inspired by Image Structure) */}
      <section className="pt-12 pb-12 px-4 max-w-xl mx-auto text-center space-y-6">
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="text-3xl md:text-4xl font-black leading-tight text-[#1A1A1A] px-2"
        >
          Tenha o Liso Perfeito em <span className="text-[#C2185B]">15 Minutos</span> e Recupere o Brilho dos seus Cabelos
        </motion.h1>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="space-y-2"
        >
          <p className="text-xl font-black text-[#C2185B] uppercase tracking-wide">
            RISCO ZERO: <span className="text-[#1A1A1A]">Só pague quando o produto chegar na sua mão</span>
          </p>
        </motion.div>

        {/* Video Placeholder Style (Representing the video/image in the reference) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-black aspect-video group"
        >
          <img 
            src={transformationImg} 
            alt="Resultado Lumi Liss" 
            className="w-full h-full object-cover opacity-80" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-[#C2185B] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-current ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
             <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]">Pague na Entrega</span>
          </div>
          <div className="absolute top-4 right-4 bg-[#E91E63] text-white font-black text-sm px-4 py-1.5 rounded-xl shadow-lg">
            -48% OFF
          </div>
        </motion.div>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="flex items-center justify-center gap-2 pt-2"
        >
          <Heart className="w-5 h-5 text-[#C2185B] fill-current" />
          <span className="font-black text-[#1A1A1A] text-lg">+3.000 Mulheres Satisfeitas</span>
        </motion.div>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-1.5 text-yellow-400">
             {[...Array(5)].map((_, j) => <Star key={j} className="w-6 h-6 fill-current" />)}
             <span className="text-[#1A1A1A] font-black ml-1">(4.9/5.0)</span>
          </div>

          <button 
            onClick={scrollToForm}
            className="w-full py-6 rounded-full bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white font-black text-xl shadow-[0_20px_40px_-10px_rgba(194,24,91,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(194,24,91,0.5)] hover:-translate-y-1 transition-all uppercase tracking-widest"
          >
            Quero Aproveitar a Oferta
          </button>
          
          <p className="text-[#C2185B] font-black uppercase tracking-[0.2em] text-sm animate-pulse">Últimas unidades</p>
        </motion.div>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100"
        >
          <div className="flex items-center justify-center gap-2 text-[#1A1A1A] font-bold text-sm">
            <Truck className="w-4 h-4" />
            <span>Frete Grátis</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#1A1A1A] font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Pagamento na Entrega</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#1A1A1A] font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>Receba em até 24 horas</span>
          </div>
        </motion.div>
      </section>

      {/* 3. BENEFITS SECTION */}
      <section className="py-24 px-4 bg-[#FDF2F8]">
        <div className="max-w-xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-[2.25rem] font-black leading-tight tracking-tight px-4">
              Por que milhares de mulheres escolhem nossa <span className="text-[#C2185B]">Lumi Liss?</span>
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { icon: Sparkles, title: "Liso Profissional", desc: "Tenha resultado de salão em casa gastando 4x menos tempo." },
              { icon: ShieldCheck, title: "Total Segurança", desc: "Pague somente quando o produto chegar na sua casa." },
              { icon: Clock, title: "Fácil de Usar", desc: "Sistema intuitivo para alisar da raiz às pontas sem esforço." },
              { icon: Heart, title: "Conforto Absoluto", desc: "Design ergonômico que protege suas mãos e couro cabeludo." },
              { icon: BadgeCheck, title: "Alta Qualidade", desc: "Placas de cerâmica premium que não queimam os fios." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center gap-6 group hover:border-[#C2185B]/20 transition-all"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#E91E63] to-[#C2185B] text-white rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-2xl tracking-tight">{item.title}</h3>
                  <p className="text-[#666] leading-relaxed text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STRATEGIC TRUST SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#DCFCE7] border-2 border-[#25D366]/20 p-12 rounded-[3.5rem] text-center space-y-8 shadow-[0_40px_80px_-20px_rgba(37,211,102,0.15)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full -mr-16 -mt-16" />
             <div className="w-24 h-24 bg-[#25D366] text-white rounded-full flex items-center justify-center mx-auto shadow-2xl relative z-10">
                <Truck className="w-12 h-12" />
             </div>
             <div className="space-y-4 relative z-10">
               <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tighter">Frete Grátis + <br/>Pagamento na Entrega!</h3>
               <p className="text-[#4A4A4A] font-bold text-lg leading-relaxed">
                 Faça seu pedido agora e pague somente quando o entregador bater no seu portão. Risco ZERO total!
               </p>
             </div>
             <button onClick={scrollToForm} className="bg-white text-[#15803d] font-black py-4 px-8 rounded-2xl shadow-md border border-[#25D366]/20 uppercase tracking-widest text-sm hover:bg-[#25D366] hover:text-white transition-all">
               Fazer Pedido Seguro
             </button>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 px-4 bg-[#F8F8F8]">
        <div className="max-w-xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tight">O que elas dizem...</h2>
            <p className="text-[#666] font-bold">Depoimentos reais de nossas clientes</p>
          </div>
          
          <div className="space-y-8">
            {[
              { name: "Juliana Costa", age: "32 anos", city: "São Paulo, SP", text: "Eu estava cansada de gastar horas no salão. A Lumi Liss salvou minha rotina! É muito prática e o liso fica perfeito.", result: "Resultado impecável na 1ª passada" },
              { name: "Carla Mendes", age: "45 anos", city: "Curitiba, PR", text: "Tive receio de comprar, mas o pagamento na entrega me deu confiança. O entregador foi super educado e o produto é nota 10.", result: "Segurança total na compra" },
              { name: "Ana Paula Silva", age: "28 anos", city: "Belo Horizonte, MG", text: "Meu cabelo é bem volumoso e a escova alisou tudo em minutos. O brilho que dá é incrível, parece que usei óleo reparador.", result: "Cabelo com brilho espelhado" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-6 relative"
              >
                <div className="absolute top-10 right-10 opacity-[0.05]">
                   <ThumbsUp className="w-16 h-16 text-[#C2185B]" />
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#E91E63] to-[#C2185B] text-white flex items-center justify-center font-black text-2xl shadow-inner">
                    {review.name[0]}
                  </div>
                  <div className="text-left space-y-1">
                    <h4 className="font-black text-xl tracking-tight">{review.name}</h4>
                    <span className="text-xs font-black text-[#999] uppercase tracking-widest">{review.age} • {review.city}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 text-yellow-400">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-[#4A4A4A] text-lg leading-relaxed italic">"{review.text}"</p>
                <div className="bg-[#C2185B]/5 px-5 py-4 rounded-[1.5rem] border-l-[6px] border-[#C2185B] flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#C2185B]" />
                  <span className="text-sm font-black uppercase tracking-wide text-[#C2185B]">Resultado: {review.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA & OFFER */}
      <section id="pedido" className="py-24 px-4 bg-gradient-to-b from-[#E91E63] to-[#C2185B] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-8">
            <div className="bg-white/20 inline-flex items-center gap-3 px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.2em] backdrop-blur-md">
               <RotateCcw className="w-4 h-4 animate-spin-slow" />
               Oferta Expirando
            </div>
            <h2 className="text-[2.5rem] font-black leading-[1.1] tracking-tighter">Não Perca Esta Oportunidade Única!</h2>
            <p className="text-white/90 font-bold text-xl leading-relaxed">Garanta seu desconto de 48% antes que o estoque acabe. <br/><span className="text-white">Pague apenas no ato da entrega!</span></p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] text-[#1A1A1A] border-4 border-[#C2185B]/10"
          >
            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-black tracking-tight uppercase">1 Lumi Liss</h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-[#999] line-through text-xl font-bold">R$ 249,90</span>
                  <span className="bg-[#C2185B] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">48% OFF</span>
                </div>
                <div className="text-6xl font-black text-[#1A1A1A] tracking-tighter">R$ 129,90</div>
              </div>

              <div className="flex justify-center">
                <div className="bg-[#DCFCE7]/60 border border-[#25D366]/20 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[#15803d] font-black text-sm uppercase tracking-wide">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Pagamento na Entrega</span>
                </div>
              </div>

              <ul className="text-left space-y-5 pt-4 max-w-[240px] mx-auto">
                <li className="flex items-center gap-4 font-black text-[15px] text-[#333]">
                  <div className="w-6 h-6 rounded-full bg-[#C2185B] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span>Frete Grátis</span>
                </li>
                <li className="flex items-center gap-4 font-black text-[15px] text-[#333]">
                  <div className="w-6 h-6 rounded-full bg-[#C2185B] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span>Pagamento na Entrega</span>
                </li>
                <li className="flex items-center gap-4 font-black text-[15px] text-[#333]">
                  <div className="w-6 h-6 rounded-full bg-[#C2185B] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span>Receba em até 24 horas</span>
                </li>
              </ul>

              <a 
                href="https://wa.me/5500000000000"
                className="w-full py-6 rounded-full bg-[#25D366] text-white font-black text-xl shadow-[0_15px_30px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(37,211,102,0.5)] hover:-translate-y-1 transition-all uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Garantir Minha Oferta
              </a>
              
              <div className="flex flex-col items-center gap-3 pt-2">
                 <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <span className="text-sm font-black text-[#C2185B] uppercase tracking-[0.2em] animate-pulse text-center">Últimas unidades em estoque</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Dúvidas Frequentes</h2>
            <div className="h-1.5 w-12 bg-[#C2185B] mx-auto rounded-full" />
          </div>
          <div className="space-y-2">
            <FAQItem question="Qual o material da escova?" answer="A Lumi Liss possui cerdas com revestimento cerâmico de alta qualidade que protegem os fios do calor direto, garantindo alisamento sem danos." />
            <FAQItem question="Como funciona o pagamento na entrega?" answer="É simples: você preenche o pedido agora e não paga nada. Nós enviamos o produto e você paga diretamente ao entregador quando ele chegar na sua casa (via Pix, Cartão ou Dinheiro)." />
            <FAQItem question="A escova serve para qualquer tipo de cabelo?" answer="Sim! Com 5 níveis de temperatura e 25 placas de cerâmica, ela alisa desde cabelos finos e ondulados até os mais crespos e resistentes." />
            <FAQItem question="Qual o prazo de entrega?" answer="Nosso prazo médio é de 3 a 7 dias úteis. Após o pedido, enviamos o código de rastreio para o seu WhatsApp." />
          </div>
        </div>
      </section>

      {/* 8. WHATSAPP SUPPORT SECTION */}
      <section className="py-24 px-4 bg-[#F8F8F8] border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center space-y-10">
           <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A]">Ainda tem alguma dúvida?</h2>
           <p className="text-[#666] font-bold text-lg leading-relaxed">Nossa equipe de especialistas está pronta para te ajudar agora mesmo pelo WhatsApp.</p>
           <a 
             href="https://wa.me/5500000000000" 
             className="inline-flex items-center gap-4 bg-[#25D366] text-white font-black py-6 px-10 rounded-full text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-wider"
           >
             <MessageCircle className="w-8 h-8" />
             Falar com Atendente
           </a>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-16 px-4 bg-[#1A1A1A] text-white text-center space-y-10">
         <div className="flex items-center justify-center gap-3 font-black text-2xl tracking-tighter">
            <Heart className="w-8 h-8 text-[#C2185B] fill-current" />
            <span className="uppercase tracking-[0.1em]">Lumi Liss BRASIL</span>
         </div>
         <div className="space-y-6">
           <p className="text-white/40 text-[11px] font-bold leading-relaxed max-w-xs mx-auto uppercase tracking-widest">
             Transformando vidas através da confiança e bem-estar.
           </p>
           <nav className="flex justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-white/60">
              <a href="#" className="hover:text-[#C2185B]">Política de Privacidade</a>
              <a href="#" className="hover:text-[#C2185B]">Termos de Uso</a>
           </nav>
         </div>
         <div className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] pt-8">
            © {new Date().getFullYear()} Lumi Liss Brasil
         </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/5500000000000" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 w-20 h-20 bg-[#25D366] text-white rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100] group"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:hidden" />
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
