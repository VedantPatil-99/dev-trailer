import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import CTASection from "@/components/CTASection";
import FloatingNav from "@/components/FloatingNav";

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-black font-sans">
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Hero Section */}
      <Hero />

      {/* Features Bento Grid */}
      <BentoGrid />

      {/* Call to Action */}
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/80 px-4 py-12 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold text-white">DevTrailer</h3>
              <p className="mt-2 text-sm text-white/60">
                AI-powered video trailers for developers.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>
                  <a href="#features" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#cta" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-white transition">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/50">
              &copy; 2026 DevTrailer. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/60 hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                GitHub
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
