import { FC } from 'react'
import {NavbarProps, NavbarLink} from './Navbar.d'
import styles from './Navbar.module.scss'
import decoration from '@/assets/decoration.svg'
import logo from '@/assets/logo.svg'
import { Link } from 'wouter'


const NavItems = (props: {
  links: NavbarLink[]
}) => (
  <div className={styles.navLinks}>
    {props.links.map((link, index) => (
      <Link href={link.url} key={index}>
      <a
        key={index}
        className={styles.navLink}
        href={link.url}
      >
        {link.icon}
      </a>
      </Link>
    ))}
  </div>
)


export const Navbar: FC<NavbarProps> = ({
  children,
  title,
  links,
  avatar
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.nav}>
        <div className={styles.decoration}>
          <img src={logo} />
          <p className={styles.welcomeText}>
           Добрый день !
          </p>
        </div>
        <img className={styles.decorationBottom} src={decoration}/>
        <NavItems links={links} />
        <img className={styles.avatar} src={avatar} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}