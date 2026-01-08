'use client';

import content from '../data/content.json';

export default function SocialLinks() {
  return (
    <div className="flex gap-6">
      {content.social.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link text-[16px]"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}
