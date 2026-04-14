import { useState, useEffect } from 'react';
import {
  Monitor,
  Smartphone,
  PenTool,
  ShoppingCart,
  ChevronRight,
  Menu,
  X,
  Mail,
  CheckCircle2,
  ExternalLink,
  Code,
  Phone,
  MessageCircle,
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Site Vitrine');

  const contactInfo = {
    // Mise à jour du numéro WhatsApp en format international.
    whatsapp: '+243845370370',
    call: '0836104745',
    email: 'Alphagiven7@gmail.com',
  };

  const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, '');

  const colors = {
    primary: '#1da1b5',
    secondary: '#f2cb1f',
    dark: '#232220',
    light: '#fbfaf3',
    whatsapp: '#25D366',
  };

  const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="40">Image indisponible</text></svg>';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappOrderLink = (service) => {
    const text = `Bonjour, je souhaite passer une commande pour : ${service}. Merci de me contacter sur WhatsApp pour finaliser.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const whatsappContactLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, je souhaite commander ou contacter le concepteur.')}`;

  const handleOrder = (serviceName) => {
    setSelectedService(serviceName);
    window.open(whatsappOrderLink(serviceName), '_blank');
  };

  return (
    <div className="font-sans text-gray-800 bg-[#fbfaf3] min-h-screen relative">
      <a
        href={whatsappContactLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center animate-bounce hover:animate-none"
        style={{ backgroundColor: colors.whatsapp, color: 'white' }}
        title="Commander ou contacter sur WhatsApp"
      >
        <MessageCircle size={32} />
      </a>

      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('accueil')}>
              <span className="text-2xl font-black tracking-tighter" style={{ color: colors.dark }}>
                ALPHA<span style={{ color: colors.primary }}>DESIGN</span>
              </span>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              {['Accueil', 'Pour Qui', 'Services', 'Portfolio'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-sm font-semibold hover:text-[#1da1b5] transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => window.open(whatsappContactLink, '_blank')}
                className="px-6 py-2 rounded-full text-white font-bold transition-transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                Commander sur WhatsApp
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl flex flex-col py-4 px-6 space-y-4">
            {['Accueil', 'Pour Qui', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-left font-semibold text-lg py-2 border-b border-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section id="accueil" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" style={{ backgroundColor: colors.primary }}>
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 rounded-full border-[20px] opacity-20 pointer-events-none" style={{ borderColor: colors.secondary }}></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full border-[30px] opacity-20 pointer-events-none" style={{ borderColor: colors.secondary }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 text-white">
              <div className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-6" style={{ backgroundColor: colors.dark, color: colors.secondary }}>
                WEB DESIGN & DÉVELOPPEMENT
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                Besoin d'un <br />
                <span style={{ color: colors.secondary }}>Site Web ?</span>
              </h1>
              <p className="text-xl lg:text-2xl font-medium mb-8 opacity-90">
                NOUS CRÉONS VOTRE PRÉSENCE EN LIGNE !
                <br className="hidden lg:block" /> Sites modernes, applications mobiles et identité visuelle sur-mesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.open(whatsappOrderLink(selectedService), '_blank')}
                  className="px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-xl"
                  style={{ backgroundColor: colors.dark, color: 'white' }}
                >
                  Commander un projet <ChevronRight size={20} />
                </button>
                <a
                  href={whatsappContactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-lg border-2 flex items-center justify-center gap-2 transition-all hover:bg-white hover:text-[#1da1b5]"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  <MessageCircle size={20} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform lg:rotate-3 transition-transform hover:rotate-0 duration-500">
                <img
                  src="images/hero.jpg"
                  alt="Espace de travail Web Design"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'images/fallback.jpg'; }}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: colors.primary, color: 'white' }}>
                      <Code size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Conception 100% autonome</p>
                      <p className="text-sm text-gray-600">Sur-mesure et optimisée</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pour-qui" className="py-20" style={{ backgroundColor: colors.light }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" style={{ color: colors.primary }}>POUR QUI ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Des solutions digitales adaptées à chaque profil et chaque ambition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Vous êtes Commerçant', subtitle: '(Vendez en ligne)', desc: 'Élargissez votre clientèle avec une boutique en ligne performante.', image: 'images/commerce.jpg' },
              { title: 'Vous êtes Entrepreneur', subtitle: '(Soyez crédible)', desc: 'Une vitrine professionnelle pour attirer et rassurer vos prospects.', image: 'images/entrepreneur.jpg' },
              { title: 'Vous êtes Freelance', subtitle: '(Faites la différence)', desc: 'Une image de marque forte pour se démarquer sur le marché.', image: 'images/freelance.jpg' },
              { title: 'Vous êtes PME / Startup', subtitle: '(Accélérez votre croissance)', desc: 'Des outils web efficaces pour structurer vos ventes et votre communication.', image: 'images/startup.jpg' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage; }}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">{item.subtitle}</p>
                  <h3 className="text-2xl font-black mt-3" style={{ color: colors.dark }}>{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed mt-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" style={{ color: colors.dark }}>Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Solutions complètes pour votre présence digitale, de la création de site à la stratégie visuelle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Monitor, title: 'Sites Web modernes', desc: 'Des sites rapides, responsives et adaptés à votre image.', color: colors.primary },
              { icon: ShoppingCart, title: 'E-Commerce', desc: 'Boutiques en ligne madias pour vendre facilement vos produits.', color: colors.secondary },
              { icon: Smartphone, title: 'Applications', desc: 'Applications web et mobiles intuitives pour vos utilisateurs.', color: colors.primary },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-3xl border border-gray-200 p-8 bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-6" style={{ backgroundColor: `${service.color}22`, color: service.color }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: colors.dark }}>{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  <button
                    onClick={() => handleOrder(service.title)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1da1b5]"
                  >
                    Je veux ce service <ChevronRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20" style={{ backgroundColor: colors.light }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" style={{ color: colors.primary }}>Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Projets récents, designs soignés et expériences web performantes.</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <a
              href="https://calures.org"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  src="images/calures.jpg"
                  alt="Calures.org - Bibliothèque numérique"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'images/fallback.jpg'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-sm uppercase tracking-[0.24em]">Bibliothèque numérique</span>
                  <h3 className="text-4xl font-black mt-3">Calures.org</h3>
                </div>
              </div>
              <div className="bg-white p-8">
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors.dark }}>Calures.org</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bibliothèque numérique créée par moi-même, offrant un accès fluide aux ressources documentaires et aux contenus éducatifs.
                </p>
                <p className="mt-4 text-sm text-gray-500">Cliquez pour visiter le site et découvrir votre bibliothèque numérique.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20" style={{ backgroundColor: colors.light }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-10 text-center">
            <h2 className="text-4xl font-black mb-4" style={{ color: colors.dark }}>Commande et contact WhatsApp</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Pour commander votre projet ou discuter directement avec le concepteur, utilisez WhatsApp. Ce canal est prioritaire pour les demandes rapides et les devis.
            </p>
            <a
              href={whatsappContactLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-10 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#1ebe5b]"
            >
              Contacter sur WhatsApp <MessageCircle size={24} />
            </a>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="rounded-3xl border border-gray-200 p-6">
                <h3 className="font-black mb-3">WhatsApp direct</h3>
                <p className="text-gray-600">Message instantané et suivi rapide de votre commande.</p>
              </div>
              <div className="rounded-3xl border border-gray-200 p-6">
                <h3 className="font-black mb-3">Service personnalisé</h3>
                <p className="text-gray-600">Nous adaptons le projet à vos besoins dès le premier échange.</p>
              </div>
              <div className="rounded-3xl border border-gray-200 p-6">
                <h3 className="font-black mb-3">Rapide et simple</h3>
                <p className="text-gray-600">Aucun formulaire compliqué, juste un message sur WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <footer className="py-12 text-center text-gray-400 text-sm" style={{ backgroundColor: colors.dark }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <span className="text-xl font-black tracking-tighter text-white">
              ALPHA<span style={{ color: colors.primary }}>DESIGN</span>
            </span>
            <p className="mt-2">Expert en solutions digitales sur-mesure.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col items-start">
              <span className="text-xs uppercase font-bold text-gray-500 mb-1 tracking-widest">Appels</span>
              <a href={`tel:${'0836104745'.replace(/\s/g, '')}`} className="text-white font-bold hover:text-[#1da1b5] transition-colors">0836104745</a>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs uppercase font-bold text-gray-500 mb-1 tracking-widest">WhatsApp</span>
              <a href={whatsappContactLink} target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#25D366] transition-colors">0845370370</a>
            </div>
          </div>
          <p>© {new Date().getFullYear()} AlphaDesign. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
