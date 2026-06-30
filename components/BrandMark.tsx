export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`.trim()} aria-label="Lapo Odunjo">
      L<span className="brand-mark__dot" aria-hidden="true" />O
    </span>
  )
}
