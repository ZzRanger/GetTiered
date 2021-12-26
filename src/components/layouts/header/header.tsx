import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  return (
    <div> 
      <div className="text-4xl pl-2 pt-2 bg-indigo-500 text-white">
        <Link href="/"> GetTiered </Link>
      </div>
      <hr className="h-1 bg-white" />
    </div>
  );
};

export default Header;
