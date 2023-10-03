import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import Authenticated from "./Layouts/AuthenticatedLayout";
import { NotifyProvider } from "./context/NotifyContext";

const appName = "Flow";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: async (name: string) => {
    const page: any = (await resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx")
    )) as any;
    if (
      name.startsWith("Board/") ||
      name.startsWith("Profile/") ||
      name === "Dashboard"
    )
      page.default.layout = (page: any) => <Authenticated children={page} />;

    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <NotifyProvider>
        <App {...props} />
      </NotifyProvider>
    );
  },
  progress: {
    color: "#ffffff",
  },
});
