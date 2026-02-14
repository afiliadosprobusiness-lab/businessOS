export interface ParsedMdx {
  frontmatter: Record<string, string>;
  body: string;
}

const stripQuotes = (value: string) => {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
};

export const parseMdxFrontmatter = (raw: string): ParsedMdx => {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("El archivo MDX debe incluir frontmatter valido.");
  }

  const [, frontmatterBlock, body] = match;
  const frontmatterEntries = frontmatterBlock
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  const frontmatter = frontmatterEntries.reduce<Record<string, string>>((acc, line) => {
    const dividerIndex = line.indexOf(":");

    if (dividerIndex < 1) {
      return acc;
    }

    const key = line.slice(0, dividerIndex).trim();
    const value = stripQuotes(line.slice(dividerIndex + 1).trim());

    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {});

  return {
    frontmatter,
    body: body.trim(),
  };
};