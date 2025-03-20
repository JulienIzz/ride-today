import { useState } from "react";

import { MenuModal } from "#modules/home/components/Menu/MenuModal";
import { MenuWheel } from "#modules/home/components/Menu/MenuWheel";

export const Menu = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <>
      {isMenuOpened && <MenuModal closeMenu={() => setIsMenuOpened(false)} />}
      <MenuWheel
        isMenuOpened={isMenuOpened}
        onPress={() => setIsMenuOpened(!isMenuOpened)}
      />
    </>
  );
};
