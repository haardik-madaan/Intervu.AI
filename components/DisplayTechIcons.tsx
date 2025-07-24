'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { mappings } from '@/constants';

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

const getLogoUrl = (tech: string) => {
  const normalized = normalizeTechName(tech);
  return {
    tech,
    url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
  };
};

const DisplayTechIcons = ({ techStack }: { techStack: string[] }) => {
  const [icons, setIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    let ignore = false;
    async function fetchIcons() {
      const logoURLs = techStack.map(getLogoUrl);
      const results = await Promise.all(
        logoURLs.map(async ({ tech, url }) => {
          try {
            const response = await fetch(url, { method: 'HEAD' });
            return { tech, url: response.ok ? url : '/tech.svg' };
          } catch {
            return { tech, url: '/tech.svg' };
          }
        })
      );
      if (!ignore) setIcons(results);
    }
    fetchIcons();
    return () => { ignore = true; };
  }, [techStack]);

  return (
    <div className='flex flex-row'>
      {icons.slice(0, 3).map(({ tech, url }, index) => (
        <div key={tech} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && '-ml-3')}>
          <span className='tech-tooltip'>{tech}</span>
          <Image src={url} alt={tech} width={100} height={100} className='size-5' />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;