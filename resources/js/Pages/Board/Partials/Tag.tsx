import { TagElement } from "@/types/board";

export default function Tag({
  tag,
  size = "sm",
  type,
  disabled = false,
  handleTag,
}: {
  tag: TagElement;
  size?: "sm" | "xs";
  type: "detach" | "attach" | "show";
  disabled?: boolean;
  handleTag?: (tag: TagElement) => void;
}) {
  if (type === "show") {
    return (
      <div
        className={`shrink-0 p-1 rounded-md ${tag.color} capitalize ${
          size === "sm" ? "text-sm" : "text-xs"
        } font-bold border border-black dark:border-white dark:text-white`}
      >
        {tag.name}
      </div>
    );
  }

  return (
    <button
      aria-label={`${type} ${tag.name} tag button`}
      type="button"
      onClick={() => {
        if (handleTag) return handleTag(tag);
      }}
      className={`shrink-0 p-1 rounded-md ${tag.color} capitalize ${
        size === "sm" ? "text-sm" : "text-xs"
      } font-bold border border-black dark:border-white dark:text-white`}
      disabled={disabled}
    >
      {`${type === "detach" ? "\u2013" : type === "attach" ? "\uff0b" : ""} ${
        tag.name
      }`}
    </button>
  );
}
