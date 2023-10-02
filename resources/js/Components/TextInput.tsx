import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  InputHTMLAttributes,
} from "react";

export default forwardRef(function TextInput(
  {
    type = "text",
    className = "",
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={
        "rounded-md h-7 border-solid border bg-transparent border-black dark:border-white dark:text-white dark:placeholder:text-gray-300 hover:border-amber-500 hover:dark:border-violet-600 focus:border-amber-500 focus:dark:border-violet-600 focus:ring-0 " +
        className
      }
      ref={localRef}
    />
  );
});
