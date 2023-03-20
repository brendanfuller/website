import type { MarkdownHeading } from "astro";
import useHeadingObserver from "../../hooks/useHeadingObserver";
import TableOfContentsLink from "./TableOfContentsLink";

interface SidebarProps {
  headings: MarkdownHeading[];
}

const Sidebar = ({ headings }: SidebarProps) => {
  const active = useHeadingObserver();
  return (
    <aside class="toc-sidebar hidden lg:block">
      {headings.map((heading) => {
        return (
          <TableOfContentsLink
            depth={heading.depth}
            title={heading.text}
            slug={heading.slug}
            active={heading.slug == active}
          />
        );
      })}
    </aside>
  );
};

export default Sidebar;
