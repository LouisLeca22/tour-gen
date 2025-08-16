import Link from "next/link"

function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">
            Tour Gen
          </h1>
          <p className="py-6 text-lg leading-loose">
            Une façon simple d’explorer autrement, ou de trouver l’inspiration avant un voyage.
          </p>

          <Link href='/chat' className="btn btn-secondary">
            Commencer
          </Link>
          {/* Ton nom + lien vers le portfolio */}
          <p className="mt-4 text-sm text-gray-500">
            © Créé par{" "}
            <a
              href="https://louis-leca.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              Louis Leca
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default HomePage