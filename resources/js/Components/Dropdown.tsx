import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import { Menu, Transition } from "@headlessui/react";

const Dropdown = ({ name, children }: PropsWithChildren<{ name: string }>) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="text-sm p-2 text-white font-semibold active:outline-none active:bg-gray-300 hover:bg-neon-pink">
        {name}
      </Menu.Button>

      <Transition
        enter-active-class="transition transform duration-100 ease-out"
        enter-from-class="opacity-0 scale-90"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition transform duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <Menu.Items className="z-50 origin-top-right mt-2 focus:outline-none absolute right-0 bg-white overflow-hidden rounded-md shadow-lg border w-48">
          <Menu.Item v-slot="{ active }" v-for="item in items">
            <Link
              href="item.link"
              method="get"
              className="block px-4 py-2 text-sm text-gray-700"
            ></Link>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
