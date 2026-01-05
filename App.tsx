import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Instagram, MessageCircle, CheckCircle2, ChevronLeft, Award, Star, Zap, TrendingUp, Loader2, Play } from 'lucide-react';
import { EXPERT, PROOF_IMAGES, TRUST_CARDS, QUIZ_QUESTIONS, TESTIMONIAL_VIDEOS } from './constants';

type AppState = 'welcome' | 'quiz' | 'analyzing' | 'quiz-result' | 'landing';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleNextQuestion = (answer: string) => {
    const updatedAnswers = [...quizAnswers, answer];
    setQuizAnswers(updatedAnswers);
    
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAppState('analyzing');
    }
  };

  // Efeito para simular a análise dos dados
  useEffect(() => {
    if (appState === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAppState('quiz-result'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    } else {
      setAnalysisProgress(0);
    }
  }, [appState]);

  const getWhatsAppLink = (isQuiz = false) => {
    const baseUrl = "https://api.whatsapp.com/send";
    const phone = EXPERT.whatsappPhone;
    let text = "Olá Misael, vi seu site e gostaria de uma consultoria gratuita!";
    
    if (isQuiz) {
      const summary = quizAnswers.map((a, i) => `Q${i + 1}: ${a}`).join('\n');
      text = `Olá Misael, finalizei meu quiz no site! Aqui estão meus detalhes:\n\n${summary}`;
    }
    
    return `${baseUrl}?phone=${phone}&text=${encodeURIComponent(text)}`;
  };

  if (appState === 'welcome') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full glass-card p-10 rounded-[2.5rem] shadow-2xl space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="relative inline-block">
             <div className="absolute -inset-2 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
             <img src={EXPERT.profilePhoto} alt={EXPERT.name} className="relative w-32 h-32 rounded-full object-cover mx-auto border-2 border-amber-500/50 shadow-lg" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-white leading-tight">{EXPERT.name}</h1>
            <p className="gold-text font-semibold tracking-widest uppercase text-xs">Estrategista de Faturamento Premium</p>
            <p className="text-slate-400 leading-relaxed text-sm">
              Pronto para transformar sua clínica em uma máquina de lucro orgânico com um método exclusivo?
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <button 
              onClick={() => setAppState('quiz')}
              className="w-full gold-gradient text-black py-5 px-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all animate-pulse-gold"
            >
              FAZER AVALIAÇÃO GRATUITA
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setAppState('landing')}
              className="w-full bg-transparent text-slate-300 border border-slate-800 py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-900 active:scale-95 transition-all"
            >
              IR DIRETO PARA O SITE
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'quiz') {
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
    
    return (
      <div className="fixed inset-0 z-50 bg-black overflow-hidden">
        {/* Background Hint of Landing */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none grayscale brightness-50">
          <LandingPage previewMode={true} />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-10">
          <div className="max-w-md w-full glass-card p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl relative border-amber-500/20">
            
            {/* Header / Expert Floating Photo Compacto */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-amber-500 shadow-xl shrink-0">
                <img src={EXPERT.profilePhoto} alt={EXPERT.name} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <p className="font-signature text-2xl gold-text truncate leading-none">{EXPERT.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">Avaliação Personalizada</p>
              </div>
            </div>

            {/* Progress Bar Compacta */}
            <div className="w-full h-1 bg-slate-900 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full gold-gradient transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {QUIZ_QUESTIONS[currentQuestion].question}
              </h2>

              <div className="grid gap-2">
                {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNextQuestion(option)}
                    className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-amber-500 hover:bg-amber-500/10 transition-all active:scale-95 text-slate-300 text-sm font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                 <button 
                  onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : setAppState('welcome')}
                  className="flex items-center gap-1 text-slate-500 text-xs font-medium hover:text-amber-500 transition-colors"
                >
                  <ChevronLeft className="w-3 h-3" /> Voltar
                </button>
                <button 
                  onClick={() => setAppState('landing')}
                  className="text-slate-600 text-[10px] hover:text-amber-500 font-medium transition-colors"
                >
                  Pular para o site
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'analyzing') {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full glass-card p-10 rounded-[2.5rem] shadow-2xl space-y-8 animate-in fade-in zoom-in duration-300">
           <div className="relative flex justify-center">
             <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
             <Loader2 className="w-16 h-16 text-amber-500 animate-spin relative z-10" />
           </div>
           
           <div className="space-y-4">
             <h2 className="text-2xl font-bold text-white tracking-tight">Analisando...</h2>
             <p className="text-slate-500 text-sm uppercase tracking-[0.2em]">Cruzando dados do seu perfil</p>
           </div>

           <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 p-0.5">
              <div 
                className="h-full gold-gradient rounded-full transition-all duration-300 ease-linear shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                style={{ width: `${analysisProgress}%` }}
              />
           </div>
           
           <p className="text-amber-500/60 text-[10px] font-black tracking-widest uppercase italic">Gerando estratégia personalizada</p>
        </div>
      </div>
    );
  }

  if (appState === 'quiz-result') {
    return (
      <div className="fixed inset-0 z-[60] bg-black flex flex-col justify-end sm:justify-center overflow-hidden">
        {/* Full Image Background for mobile focus */}
        <div className="absolute inset-0 z-0">
          <img 
            src={EXPERT.profilePhoto} 
            alt={EXPERT.name} 
            className="w-full h-full object-cover opacity-40 scale-105 blur-[2px] sm:blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-xl mx-auto px-8 pb-12 sm:pb-0 space-y-6 sm:space-y-8 animate-in slide-in-from-bottom duration-700">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Perfil Compatível</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Você é a <span className="italic gold-text underline decoration-amber-500/30 underline-offset-8">Cliente ideal.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Com base nas suas respostas, o Método de <strong className="gold-text">{EXPERT.name}</strong> consegue entregar exatamente a Estratégia e segurança que você procura para escalar sua clínica.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <a 
              href={getWhatsAppLink(true)}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full gold-gradient text-black py-5 sm:py-6 px-8 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-4 shadow-2xl active:scale-95 transition-all text-center"
            >
              ENVIAR MINHA AVALIAÇÃO
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/5 text-white py-4 sm:py-5 px-8 rounded-2xl font-bold text-base sm:text-lg backdrop-blur-md border border-white/10 flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-white/10"
            >
              CHAMAR NO WHATSAPP SEM COMPROMISSO
            </a>
            <button 
              onClick={() => setAppState('landing')}
              className="w-full text-slate-500 py-2 text-xs font-medium hover:text-white transition-colors"
            >
              CONTINUAR NO SITE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <LandingPage previewMode={false} getWhatsAppLink={getWhatsAppLink} />;
};

const LandingPage: React.FC<{ previewMode: boolean; getWhatsAppLink?: (isQuiz?: boolean) => string }> = ({ previewMode, getWhatsAppLink }) => {
  const waLink = getWhatsAppLink ? getWhatsAppLink() : EXPERT.whatsapp;

  return (
    <div className={`w-full bg-black text-white ${previewMode ? 'pointer-events-none' : ''}`}>
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden px-6">
        {/* Abstract Gold Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="relative mb-16">
            <div className="absolute -inset-4 bg-amber-500/20 rounded-[3.5rem] blur-2xl -z-10 opacity-60"></div>
            <img 
              src={EXPERT.profilePhoto} 
              alt={EXPERT.name} 
              className="w-full max-w-[340px] aspect-[3/4] object-cover rounded-[3rem] shadow-2xl border-2 border-amber-500/20 hover:border-amber-500/50 transition-all duration-700"
            />
            <div className="absolute -bottom-8 -left-8 glass-card py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-slow border-amber-500/30">
               <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-black">
                  <TrendingUp className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Resultado Real</p>
                 <p className="text-lg font-black text-white">+30x Faturamento</p>
               </div>
            </div>
          </div>

          <div className="text-center space-y-10">
            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-white leading-[1.05]">
              Eu sou <span className="gold-text">{EXPERT.name}</span> e ajudo clínicas a faturarem alto <span className="italic">sem tráfego pago.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Transformamos sua base de dados ociosa em lucro real com estratégias <span className="text-white font-medium">100% orgânicas.</span>
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto gold-gradient text-black py-7 px-14 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all animate-pulse-gold"
              >
                CHAMAR NO WHATSSAP
                <MessageCircle className="w-6 h-6" />
              </a>
              <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Vagas exclusivas por região
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* QUEM SOU EU */}
      <section className="bg-[#050505] py-32 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
             <div className="relative">
                <div className="absolute inset-0 gold-gradient rounded-[3rem] rotate-3 -z-10 opacity-30"></div>
                <img src={EXPERT.profilePhoto} alt="Bastidores" className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" />
             </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl font-serif font-bold text-white leading-tight">Autoridade e Estratégia de Elite</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Esqueça fórmulas mágicas. Meu foco é na <span className="text-white font-semibold">saúde financeira</span> e no crescimento exponencial do seu negócio estético usando o ativo mais valioso que você já possui: seus clientes.
            </p>
            <div className="grid gap-5">
              {[
                "Método 100% focado no orgânico",
                "Reativação inteligente de base de clientes",
                "Presença Digital Premium de baixo custo",
                "Mentoria direta sem intermediários"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl glass-card border-none bg-white/5 group hover:bg-white/10 transition-all">
                  <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-black" />
                  </div>
                  <span className="font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS REAIS (GALLERY) */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-serif font-bold gold-text">Resultados Incontestáveis</h2>
            <p className="text-slate-500 text-lg">Impacto real no faturamento de quem confiou no método.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {PROOF_IMAGES.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl aspect-square bg-slate-900 border border-white/10">
                <img 
                  src={img} 
                  alt={`Resultado ${i+1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                   <Zap className="w-5 h-5 text-amber-500 mr-2" />
                   <span className="text-white text-xs font-black tracking-widest uppercase">Performance Max</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-8 glass-card rounded-3xl text-center max-w-2xl mx-auto">
             <p className="text-amber-500/60 text-sm italic font-medium tracking-wide">"Resultados auditados e documentados. A escala depende da base inicial e infraestrutura da clínica."</p>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS EM VÍDEO */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-serif font-bold gold-text">Histórias de Sucesso</h2>
            <p className="text-slate-500 text-lg">O que nossos parceiros dizem sobre a transformação.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIAL_VIDEOS.map((videoUrl, i) => (
              <div key={i} className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 border border-amber-500/20 aspect-[9/16] shadow-2xl">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={videoUrl} type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
                <div className="absolute top-6 left-6 z-10">
                  <div className="bg-amber-500 text-black p-2 rounded-xl shadow-lg">
                    <Star className="w-5 h-5 fill-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE CONFIAR */}
      <section className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 gold-gradient rounded-full blur-[100px] opacity-10"></div>
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight">Por que Misael Souza?</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_CARDS.map((card, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:border-amber-500/60 transition-all duration-500 group">
                <div className="mb-8 w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
                   <div className="text-black">{card.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm font-light">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA INTERMEDIARIO */}
      <section className="py-24 px-6 bg-black">
         <div className="max-w-4xl mx-auto gold-gradient p-1 rounded-[3rem] shadow-3xl">
           <div className="bg-black rounded-[2.9rem] p-12 text-center space-y-8">
              <h2 className="text-3xl font-serif font-bold italic">"Pare de gastar com o que não funciona e foque no lucro real."</h2>
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 gold-text font-black text-xl hover:scale-105 transition-transform"
              >
                FALAR DIRETAMENTE COMIGO <ArrowRight className="w-6 h-6 text-amber-500" />
              </a>
           </div>
         </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-bold gold-text">A Experiência Signature</h2>
          </div>

          <div className="grid gap-12">
            {[
              { 
                step: "01", 
                title: "Conexão Inicial", 
                desc: "Alinhamos suas metas de faturamento e entendemos o potencial oculto da sua clínica."
              },
              { 
                step: "02", 
                title: "Diagnóstico Premium", 
                desc: "Análise profunda de dados e presença digital sem custo para clientes selecionados."
              },
              { 
                step: "03", 
                title: "Implementação e Escala", 
                desc: "Execução do método orgânico para gerar resultados imediatos e sustentáveis."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="text-6xl font-serif font-bold text-white/5 group-hover:gold-text transition-all duration-700">
                  {item.step}
                </div>
                <div className="pt-4 space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-500/5 to-black -z-10"></div>
        <div className="max-w-4xl mx-auto text-center space-y-12">
           <h2 className="text-5xl sm:text-7xl font-serif font-bold text-white leading-tight">
             O próximo nível da sua clínica começa <span className="gold-text">agora.</span>
           </h2>
           <p className="text-xl sm:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
             Sua clínica possui um ouro escondido. Eu sou a pessoa que vai te ajudar a minerá-lo.
           </p>
           
           <div className="flex flex-col items-center gap-8">
             <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto gold-gradient text-black py-8 px-20 rounded-[3rem] font-black text-2xl flex items-center justify-center gap-4 shadow-3xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all animate-pulse-gold"
            >
              GARANTIR MINHA ANÁLISE
            </a>
            <div className="flex gap-2">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500 shadow-amber-500/20"/>)}
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Atendimento restrito a 2 novos projetos/mês</p>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#030303]">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
           <div className="text-center">
             <p className="font-signature text-6xl gold-text mb-4">{EXPERT.name}</p>
             <p className="text-slate-500 text-xs font-black tracking-[0.4em] uppercase">{EXPERT.profession}</p>
           </div>
           
           <div className="flex items-center gap-6">
             <a href={EXPERT.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-slate-400 hover:text-amber-500 transition-all border-white/5">
                <Instagram className="w-6 h-6" />
             </a>
             <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-slate-400 hover:text-amber-500 transition-all border-white/5">
                <MessageCircle className="w-6 h-6" />
             </a>
           </div>

           <div className="text-center space-y-2 text-slate-600 text-[10px] font-medium tracking-widest uppercase">
              <p>{EXPERT.address} • {new Date().getFullYear()}</p>
              <p>© Elevate Marketing • Estratégias de Alto Padrão</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;