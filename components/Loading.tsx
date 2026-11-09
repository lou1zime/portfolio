import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
};

export default function Loading({
  src = '/attached/ATTACHED-Y-FAST-LOOP_COMPRESSED.webp',
  alt = '...',
}: Props) {
  return (
    <main className="loading">
      <Image
        src={src}
        alt={alt}
        // fill
        width={400}
        height={400}
        style={{ objectFit: 'contain' }}
        unoptimized // Recommended for animated GIFs in Next.js
        priority
      />
    </main>
  );
}
