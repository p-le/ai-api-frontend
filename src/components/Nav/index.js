import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.css';

const navItemStyle = {
  height: '60px',
  color: '#29B6F6',
  minWidth: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const Nav = () => (
  <header className={styles.nav}>
    <div className={styles.stickyNavbarWrapper}>
      <ul className={styles.primaryLinks}>
        <li>
          <FlatButton 
            label="Home"
            primary={true}
            style={navItemStyle} 
            containerElement={<Link to="/" />}
          />
        </li>
        <li>
          <FlatButton 
            label="History" 
            primary={true} 
            style={navItemStyle} 
            containerElement={<Link to="/history" />}
          />
        </li>
      </ul>
    </div>
  </header>
);

export default Nav;