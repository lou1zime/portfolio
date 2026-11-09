import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
};

export default function Loading({
  src = '/ATTACHED-Y-FAST-LOOP.webp',
  alt = '...',
}: Props) {
  return (
    <main className="loading">
      <Image
        src={src}
        alt={alt}
        // fill
        width={800}
        height={800}
        style={{ objectFit: 'contain' }}
        unoptimized // Recommended for animated GIFs in Next.js
        priority
      />
    </main>
  );
}
