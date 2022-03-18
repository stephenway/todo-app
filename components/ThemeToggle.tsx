import Moon from "../icons/icon-moon.svg";
import Sun from "../icons/icon-sun.svg";
import ThemeContext from "../containers/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps): JSX.Element => (
  <ThemeContext.Consumer>
    {({ dark, toggle }) => {
      const ThemeIcon = !dark ? Moon : Sun;
      return <ThemeIcon onClick={toggle} className={className || ""} />;
    }}
  </ThemeContext.Consumer>
);

export default ThemeToggle;
