import { type MouseEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { markdownToHtml } from "@/lib/markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent = ({ content, className }: MarkdownContentProps) => {
  const html = useMemo(() => markdownToHtml(content), [content]);
  const navigate = useNavigate();

  const handleInternalLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest("a");

    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute("href");
    const targetBlank = anchor.getAttribute("target") === "_blank";

    if (
      !href ||
      targetBlank ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("#") ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (href.startsWith("/")) {
      event.preventDefault();
      navigate(href);
    }
  };

  return (
    <div
      className={cn(
        "prose-block max-w-none space-y-4 text-base leading-relaxed text-text-secondary [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary [&_blockquote]:rounded-xl [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-accent/10 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h1]:mt-6 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-5 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:m-0 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        className,
      )}
      onClick={handleInternalLinkClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownContent;
