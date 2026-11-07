import { site } from '@/content/site';

export const metadata = { title: 'About' };

export default function About() {
  return (
    <main className="page">
      <h1>About</h1>
      <p className="prose" style={{ marginTop: 24 }}>
        Fifth-year software engineering student at EPITECH Paris with experience
        in software development, Rust, open-source projects, and
        proof-of-concept decentralized applications. Professional experience in
        France, complemented by an academic exchange year in South Korea.
        Seeking a backend or general software engineering opportunity.
      </p>
      <div className="links">
        <a href={`mailto:${site.email}`}>Email</a>
        <a href={'https://www.linkedin.com/in/lou-onezime/'}>LinkedIn</a>
        <a href={'https://github.com/lou1zime'}>GitHub</a>
      </div>
    </main>
  );
}
