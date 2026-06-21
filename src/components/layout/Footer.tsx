"use client";

import Image from "next/image";
import { Instagram, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

const footerLinks = {
  modelos: [
    { label: "YESU Jet", href: "/produtos/yesu-jet" },
    { label: "YESU Beach", href: "/produtos/yesu-beach" },
    { label: "YESU Ziyou", href: "/produtos/yesu-ziyou" },
  ],
  empresa: [
    { label: "Sobre Nós", href: "/#sobre" },
    { label: "Nossa Tecnologia", href: "/#problema" },
    { label: "Calculadora", href: "/#calculadora" },
    { label: "FAQ", href: "/#faq" },
  ],
  suporte: [
    { label: "WhatsApp", href: generateWhatsAppUrl() },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Garantia", href: "/#faq" },
    { label: "Entrega", href: "/#faq" },
  ],
};

export function Footer() {
  const router = useRouter();

  const handleFooterClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("/#")) return;

    e.preventDefault();

    const sectionId = href.replace("/#", "");

    // Caso esteja na página inicial
    if (window.location.pathname === "/") {
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }

      return;
    }

    // Caso esteja em uma página interna
    router.push(`/#${sectionId}`);
  };

  return (
    <footer className="relative bg-obsidian border-t border-white/5 overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-50" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-electric/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-wide pt-20 pb-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 pb-16 border-b border-white/5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">

              <div
                className="relative w-12 h-12"
                style={{ filter: "invert(1) brightness(2)" }}
              >
                <Image
                  src="/images/logo-transparent.png"
                  alt="YESU Brasil"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div>
                <div className="text-white font-bold text-xl tracking-wider">
                  YESU Brasil
                </div>

                <div className="text-steel text-xs tracking-[0.3em] uppercase">
                  Mobilidade Elétrica
                </div>
              </div>

            </div>

            <p className="text-steel text-sm leading-relaxed max-w-sm mb-8">
              Transformando a mobilidade urbana brasileira com veículos
              elétricos premium. Economize até 90% em combustível. Zero
              emissões. 100% elétrico.
            </p>


            <div className="flex items-center gap-4">

              <a
                href="https://instagram.com/yesubrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-steel hover:text-white hover:border-electric hover:bg-electric/10 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>


              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-steel hover:text-white hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
              >
                <MessageCircle size={18} />
              </a>

            </div>

          </div>


          {/* Modelos */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Modelos
            </h4>

            <ul className="space-y-3">

              {footerLinks.modelos.map((link) => (

                <li key={link.href}>

                  <a
                    href={link.href}
                    className="text-steel text-sm hover:text-electric transition-colors duration-300"
                  >
                    {link.label}
                  </a>

                </li>

              ))}

            </ul>
          </div>



          {/* Empresa */}
          <div>

            <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Empresa
            </h4>

            <ul className="space-y-3">

              {footerLinks.empresa.map((link) => (

                <li key={link.href}>

                  <a
                    href={link.href}
                    onClick={(e) => handleFooterClick(e, link.href)}
                    className="text-steel text-sm hover:text-electric transition-colors duration-300"
                  >
                    {link.label}
                  </a>

                </li>

              ))}

            </ul>

          </div>



          {/* Contato */}
          <div>

            <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Contato
            </h4>


            <ul className="space-y-4">

              <li className="flex items-start gap-3 text-steel text-sm">
                <Phone
                  size={14}
                  className="mt-0.5 text-electric shrink-0"
                />

                <span>
                  (00) 00000-0000
                </span>

              </li>


              <li className="flex items-start gap-3 text-steel text-sm">

                <Mail
                  size={14}
                  className="mt-0.5 text-electric shrink-0"
                />

                <span>
                  contato@yesubrasil.com.br
                </span>

              </li>


              <li className="flex items-start gap-3 text-steel text-sm">

                <MapPin
                  size={14}
                  className="mt-0.5 text-electric shrink-0"
                />

                <span>
                  Brasil
                </span>

              </li>


            </ul>

          </div>


        </div>



        {/* Bottom */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">

          <p className="text-steel text-xs">
            © {new Date().getFullYear()} YESU Brasil. Todos os direitos reservados.
          </p>


          <p className="text-steel text-xs">
            Mobilidade Elétrica Premium · Made in Brazil
          </p>

        </div>


      </div>

    </footer>
  );
}
