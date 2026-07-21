interface PullQuoteProps {
  quote: string;
  attribution: string;
}

export default function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <section className="pull-quote">
      <hr className="pull-quote__hr" />
      <blockquote className="pull-quote__text">
        <p className="pull-quote__quote">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="pull-quote__attribution">
          &mdash; {attribution}
        </p>
      </blockquote>
      <hr className="pull-quote__hr" />
    </section>
  );
}
