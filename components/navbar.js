import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  NavbarContainer,
  LeftSection,
  RightSection,
  CompanyName,
  IconWrapper,
  DropdownMenu,
  DropdownItem
} from '@/styles/navbar.styles';
import { faUser, faSignOutAlt, faCog, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const goToProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      router.push(`/profile/${user.id}`);
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  return (
    <NavbarContainer>
      <LeftSection>
        <FontAwesomeIcon icon={faBuilding} />
        <span style={{ marginRight: '-3px', color: '#fff' }}>|</span>
        <CompanyName>Techno Solutions</CompanyName>
      </LeftSection>

      <RightSection ref={dropdownRef}>
        <IconWrapper onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={faUser} />
        </IconWrapper>

        {menuOpen && (
          <DropdownMenu>
            <DropdownItem onClick={goToProfile}>
              <FontAwesomeIcon icon={faCog} /> Configurar Perfil
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        )}
      </RightSection>
    </NavbarContainer>
  );
}