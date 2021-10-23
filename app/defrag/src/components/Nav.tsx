import { Link, useLocation } from "react-router-dom";

interface Props {
  path: string;
  text: string;
}

const NavItem = ({ path, text }: Props) => {
  const { pathname } = useLocation();

  const background = path === pathname ? "text-white bg-blue-900" : "hover:text-gray-700";
  const className = `px-1 ${background}`;

  return (
    <Link to={path}>
      <li className={className}>{text}</li>
    </Link>
  );
};

const Nav = () => {
  return (
    <div className="my-2">
      <div>
        <ul className="tree-view">
          <NavItem path="/create" text="Create" />
          <NavItem path="/mint" text="Mint" />
          <NavItem path="/about" text="About" />
        </ul>
      </div>
    </div>
  );
};

export default Nav;
