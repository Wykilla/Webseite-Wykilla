export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 text-center text-sm text-white/50">
      <p className="mb-2">© {currentYear} WYKILLA. All rights reserved.</p>
      <p className="mb-4">Made with ♥ and AI</p>
      <div className="flex gap-4 justify-center">
        <a href="/privacy" className="hover:text-cyan transition-colors">
          Privacy Policy
        </a>
        <span>•</span>
        <a href="/terms" className="hover:text-cyan transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  )
}
