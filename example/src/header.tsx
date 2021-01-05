import * as React from "react";

export const Header = React.memo(() => {
  return (
    <header className="header">
      <span className="title">Icon Library</span>
    </header>
  );
});

Header.displayName = "header";
