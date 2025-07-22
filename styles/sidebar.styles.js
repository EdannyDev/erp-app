import styled from '@emotion/styled'

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: #1f2937;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  overflow-y: auto;
  z-index: 1000;
`

export const SidebarLogo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  cursor: pointer;
  color: #fff;
`

export const SidebarModule = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #d1d5db;
  padding: 0.75rem 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #374151;
  }
`

export const SidebarDivider = styled.hr`
  border: none;
  border-top: 1px solid #374151;
  margin: 1rem 0;
`

export const SidebarItemLabel = styled.span`
  flex: 1;
  margin-left: 0.75rem;
`

export const SidebarCollapseIcon = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  margin-left: auto;
  display: flex;
  align-items: center;
`

export const SidebarSubItem = styled.div`
  padding: 0.5rem 2rem;
  font-size: 0.95rem;
  color: ${({ active }) => (active ? '#ffffff' : '#d1d5db')};
  background-color: ${({ active }) => (active ? '#374151' : 'transparent')};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #374151;
    color: #ffffff;
  }
`

export const SidebarSubList = styled.div`
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-5px)')};
  transition: all 0.3s ease;
`