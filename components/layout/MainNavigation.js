import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const isActive = (router, path) =>
  router.pathname === path ? classes.active : "";

function MainNavigation() {
  const router = useRouter();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link className={isActive(router, "/")} href="/">
              All Meetups
            </Link>
          </li>
          <li>
            <Link
              className={isActive(router, "/new-meetup")}
              href="/new-meetup"
            >
              Add New Meetup
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
