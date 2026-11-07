import ProjectList from '@/components/ProjectList';

export const metadata = { title: 'Work' };

export default function Projects() {
  return (
    <main className="section">
      <h2>All work</h2>
      <ProjectList />
    </main>
  );
}
