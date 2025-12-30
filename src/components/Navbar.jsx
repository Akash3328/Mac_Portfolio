import React from "react";
import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants";
import useWindowStore from "#store/window";
const Navbar = () => {
  const {openWindow} = useWindowStore();
  return (
    <nav>
      <div>
        <img src='/images/logo.svg' className='icon' />
        <p className='font-bold'>Akash's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name ,type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className='icon-hover' alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd ,D MMM  hh:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
