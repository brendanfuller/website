export interface Props {
  depth: number;
  title: string;
  slug: string;
  active: boolean;
}

const TableOfContentsLink = ({ depth, slug, title, active }: Props) => {
  return (
    <div
      style={{ marginLeft: (depth - 1) * 5 }}
      className="text-gray-900 dark:text-gray-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon pl-0 pr-0 m-0"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M10 18l6 -6l-6 -6v12"></path>
      </svg>
      <a
        class="toc-link"
        href={`#${slug}`}
        className="hover:underline"
        style={{ fontWeight: active ? "bold" : null }}
      >
        <span class="toc-text ">{title}</span>
      </a>
    </div>
  );
};

export default TableOfContentsLink;
