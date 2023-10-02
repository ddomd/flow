import { useEffect, useState } from "react";

export default function AnimatedBg() {
  const [colors, setColors] = useState(["#FCB165", "#65B0FC"]);

  useEffect(() => {
    const bodyClassList = document.body.classList;

    const handleBodyClassChange = () => {
      if (bodyClassList.contains("dark")) {
        setColors(["#FFA101", "#7F00FF", ]);
      } else {
        setColors(["#FCB165", "#65B0FC"]);
      }
    };

    // Listen for changes to the body class list
    const bodyClassObserver = new MutationObserver(handleBodyClassChange);
    bodyClassObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Initial check and setup
    handleBodyClassChange();

    return () => {
      // Cleanup the observer when the component unmounts
      bodyClassObserver.disconnect();
    };
  }, []);

  return (
    <svg
      preserveAspectRatio="xMidYMid slice"
      viewBox="10 10 80 80"
      className="fixed h-screen w-screen top-0 left-0 z-0 brightness-90"
    >
      <defs>
        <style>
          {
            "\n      @keyframes rotate {\n\t\t\t\t\t 0% {\n                    transform: rotate(0deg);\n                }\n                100% {\n                    transform: rotate(360deg);\n                }\n            }\n            .out-top {\n                animation: rotate 20s linear infinite;\n                transform-origin: 13px 25px;\n            }\n            .in-top {\n                animation: rotate 10s linear infinite;\n                transform-origin: 13px 25px;\n            }\n            .out-bottom {\n                animation: rotate 25s linear infinite;\n                transform-origin: 84px 93px;\n            }\n            .in-bottom {\n                animation: rotate 15s linear infinite;\n                transform-origin: 84px 93px;\n            }\n    "
          }
        </style>
      </defs>
      <path
        fill={colors[0]}
        className="out-top"
        d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
      />
      <path
        fill={colors[1]}
        className="in-top"
        d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
      />
      <path
        fill={colors[0]}
        className="out-bottom"
        d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
      />
      <path
        fill={colors[1]}
        className="in-bottom"
        d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
      />
    </svg>
  );
}
