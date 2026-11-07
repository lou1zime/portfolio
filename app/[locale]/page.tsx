import CursorDoodle from '@/components/Cursor';
import { site } from '@/content/site';

export default function Home() {
  return (
    <main>
      <section className="intro">
        <h1>{site.name}</h1>
        <h2> {site.tagline}</h2>
      </section>

      <section className="section">
        <CursorDoodle />
      </section>
    </main>
  );
}
