const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const inlineToHtml = (value: string) => {
  const escaped = escapeHtml(value);

  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)/g, (_, label: string, href: string) => {
      if (href.startsWith("/")) {
        return `<a href="${href}">${label}</a>`;
      }

      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });
};

const startsWithBlockMarker = (line: string) =>
  /^#{1,3}\s+/.test(line) || /^-\s+/.test(line) || /^\d+\.\s+/.test(line) || /^>\s+/.test(line);

export const markdownToHtml = (markdown: string) => {
  const lines = markdown.split("\n");
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      blocks.push(`<h${level}>${inlineToHtml(headingMatch[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(`<li>${inlineToHtml(lines[index].trim().replace(/^-\s+/, ""))}</li>`);
        index += 1;
      }

      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(`<li>${inlineToHtml(lines[index].trim().replace(/^\d+\.\s+/, ""))}</li>`);
        index += 1;
      }

      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (/^>\s+/.test(line)) {
      blocks.push(`<blockquote>${inlineToHtml(line.replace(/^>\s+/, ""))}</blockquote>`);
      index += 1;
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const paragraphLine = lines[index].trim();
      if (!paragraphLine) {
        break;
      }

      if (startsWithBlockMarker(paragraphLine)) {
        break;
      }

      paragraph.push(inlineToHtml(paragraphLine));
      index += 1;
    }

    blocks.push(`<p>${paragraph.join(" ")}</p>`);
  }

  return blocks.join("\n");
};
