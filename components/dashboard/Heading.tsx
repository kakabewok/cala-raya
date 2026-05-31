export default function Heading({
  title,
  description,
  additionalInfo,
  className,
}: {
  title: string;
  description?: string;
  additionalInfo?: string;
  className?: string;
}) {
  return (
    <div className="mb-6 space-y-1">
      <h2 className={`${className} text-2xl font-semibold tracking-tight text-foreground`}>
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      )}
      {additionalInfo && (
        <p className="text-muted-foreground text-sm">
          {additionalInfo}
        </p>
      )}
    </div>
  );
}
