import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
};

export default function Loading({
  src = '/ATTACHED-FAST-LOOP-ORIG.png',
  alt = 'Loading...',
}: Props) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full bg-transparent">
      <div className="relative w-16 h-16">
        {' '}
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          unoptimized // Recommended for animated GIFs in Next.js
          priority
        />
      </div>
    </div>
  );
}
