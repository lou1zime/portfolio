type Props = {
  message?: string;
};

export default function HiddenPage({ message = '' }: Props) {
  return (
    <main className="loading hiddenPage">
      <picture className="hiddenPageImage">
        <source
          media="(prefers-color-scheme: dark)"
          srcSet="/cats/CAT2_B.png"
        />
        <img src="/cats/CAT2_W.png" alt="" />
      </picture>
      <p className="hiddenPageMessage">{message}</p>
    </main>
  );
}
