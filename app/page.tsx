import SocialLinks from './components/SocialLinks';
import LiveClock from './components/LiveClock';
import content from './data/content.json';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-[580px] mx-auto">
          {/* Greeting */}
          <p className="text-muted text-[16px] leading-[1.7] mb-6">
            {content.greeting}
          </p>

          {/* Bio */}
          <div className="space-y-6">
            <p className="text-[16px] leading-[1.7]">
              <span className="font-medium">{content.name}</span> {content.bio}{' '}
              {content.companies.map((company, index) => (
                <span key={company.name}>
                  <a 
                    href={company.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link-underline font-medium"
                  >
                    {company.name}
                  </a>
                  {index < content.companies.length - 1 ? ' and ' : '.'}
                </span>
              ))}
            </p>

            <p className="text-[16px] leading-[1.7]">
              {content.interests}
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-10">
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <SocialLinks />
          <div className="text-[16px] text-muted">
            It is <LiveClock /> for Zinedine
          </div>
        </div>
      </footer>
    </main>
  );
}
