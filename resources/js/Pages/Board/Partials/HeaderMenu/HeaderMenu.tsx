import Container from "@/Components/Container";
import { PropsWithChildren } from "react";

export default function HeaderMenu({ children }: PropsWithChildren) {
  return (
    <Container className={"h-12 w-full py-2 px-3 text-lg flex justify-between items-center"}>
      {children}
    </Container>
  );
}
