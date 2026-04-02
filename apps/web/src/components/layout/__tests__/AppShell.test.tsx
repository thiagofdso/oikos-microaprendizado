import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";

import { AppShell } from "@/components/layout/AppShell";

function getShellTree(
  props: Parameters<typeof AppShell>[0],
): ReactElement & {
  props: {
    className?: string;
    children: ReactElement;
  };
} {
  return AppShell(props) as ReturnType<typeof getShellTree>;
}

describe("AppShell", () => {
  it("uses a custom header slot when provided", () => {
    const headerSlot = <header data-testid="custom-header">Custom header</header>;
    const shell = getShellTree({
      activeRole: "aluno",
      breadcrumbs: [],
      headerSlot,
      children: <div>Content</div>,
    });

    const contentColumn = shell.props.children.props.children[1];
    expect(contentColumn.props.children[0]).toBe(headerSlot);
  });

  it("keeps the default glass main wrapper and merges custom main classes", () => {
    const shell = getShellTree({
      activeRole: "aluno",
      breadcrumbs: [],
      mainClassName: "max-w-4xl p-2 bg-red-500",
      children: <div>Content</div>,
    });

    const main = shell.props.children.props.children[1].props.children[1];

    expect(main.props.className).toContain("glass-panel");
    expect(main.props.className).toContain("border-white/20");
    expect(main.props.className).toContain("max-w-4xl");
    expect(main.props.className).toContain("p-2");
    expect(main.props.className).toContain("bg-red-500");
    expect(main.props.className).not.toContain("bg-white/15");
    expect(main.props.className).not.toContain("p-4");
  });

  it("skips the glass wrapper styles when wrapContent is false", () => {
    const shell = getShellTree({
      activeRole: "aluno",
      breadcrumbs: [],
      wrapContent: false,
      mainClassName: "max-w-4xl",
      children: <div>Content</div>,
    });

    const main = shell.props.children.props.children[1].props.children[1];

    expect(main.props.className).not.toContain("glass-panel");
    expect(main.props.className).not.toContain("bg-white/15");
    expect(main.props.className).toContain("max-w-4xl");
  });

  it("allows a null header slot to hide the default header", () => {
    const shell = getShellTree({
      activeRole: "aluno",
      breadcrumbs: [],
      headerSlot: null,
      children: <div>Content</div>,
    });

    const contentColumn = shell.props.children.props.children[1];
    expect(contentColumn.props.children[0]).toBeNull();
  });
});
