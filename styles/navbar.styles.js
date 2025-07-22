import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const fadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 240px;
  width: calc(100% - 240px);
  height: 60px;
  background-color: #1f2937;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 999;
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
`

export const CompanyName = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  margin-top: 3px;
`

export const RightSection = styled.div`
  position: relative;
`

export const IconWrapper = styled.div`
  cursor: pointer;
  color: #d1d5db;
  font-size: 1.25rem;
  margin-top: 3px;
  transition: background 0.2s;

  &:hover {
    color: #fff;
  }
`

export const DropdownMenu = styled.div`
  position: absolute;
  right: -2px;
  top: 35px;
  background-color: #1f2937;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 180px;
  animation: ${fadeDown} 0.2s ease-out;
`

export const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #d1d5db;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #374151;
    color: #fff;
  }
`