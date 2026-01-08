import SocialLinks from './components/SocialLinks';
import LiveClock from './components/LiveClock';
import Gallery from './components/Gallery';
import content from './data/content.json';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-10 md:pt-20 pb-20 px-6">
        <div className="max-w-[580px] ml-0 mr-auto md:mx-auto w-[320px] md:w-fit">
          {/* Greeting */}
          <p className="text-muted text-[14px] md:text-[16px] leading-[1.7] mb-6">
            {content.greeting}
          </p>

          {/* Bio */}
          <div className="space-y-6 w-fit">
            <p className="text-[14px] md:text-[16px] leading-[1.7] w-full md:w-[470px]">
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

            <p className="text-[14px] md:text-[16px] leading-[1.7] md:w-[470px]">
              {content.interests}
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* Gallery & Footer Section */}
      <section className="pb-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <Gallery />
          
          <div className="mt-[65px] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <SocialLinks />
            <div className="hidden md:block text-[14px] md:text-[16px] text-accent">
              It is <LiveClock /> for Zinedine
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
