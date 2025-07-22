import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  SidebarContainer,
  SidebarLogo,
  SidebarModule,
  SidebarSubItem,
  SidebarItemLabel,
  SidebarCollapseIcon,
  SidebarDivider,
  SidebarSubList
} from '@/styles/sidebar.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faShoppingCart,
  faBoxOpen,
  faChartBar,
  faChevronDown,
  faCoins,
  faWarehouse,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'

const menu = [
  {
    label: 'Finanzas',
    icon: faCoins,
    items: [
      { label: 'Cuentas', path: '/finance/account' },
      { label: 'Transacciones', path: '/finance/transaction' },
      { label: 'Pagos', path: '/finance/payment' }
    ]
  },
  {
    label: 'Recursos Humanos',
    icon: faUsers,
    items: [
      { label: 'Empleados', path: '/rh/employee' },
      { label: 'Asistencia', path: '/rh/attendance' },
      { label: 'Nómina', path: '/rh/payroll' }
    ]
  },
  {
    label: 'Ventas',
    icon: faShoppingCart,
    items: [
      { label: 'Clientes', path: '/sales/client' },
      { label: 'Cotizaciones', path: '/sales/quote' },
      { label: 'Facturas', path: '/sales/invoice' }
    ]
  },
  {
    label: 'Compras',
    icon: faBoxOpen,
    items: [
      { label: 'Proveedores', path: '/purchase/supplier' },
      { label: 'Órdenes de compra', path: '/purchase/purchaseOrder' },
      { label: 'Recepción', path: '/purchase/receiving' }
    ]
  },
  {
    label: 'Inventario',
    icon: faWarehouse,
    items: [
      { label: 'Productos', path: '/inventory/product' },
      { label: 'Almacenes', path: '/inventory/warehouse' },
      { label: 'Categorías', path: '/inventory/category' }
    ]
  },
  {
    label: 'Reportes',
    icon: faChartBar,
    items: [
      { label: 'Reportes', path: '/records/report' }
    ]
  },
  {
    label: 'Administración',
    icon: faUserTie,
    items: [
      { label: 'Usuarios', path: '/administration/user' },
      { label: 'Configuraciones', path: '/administration/settings' }
    ]
  }
]

export default function Sidebar() {
  const router = useRouter()
  const [openModule, setOpenModule] = useState(null)

  const handleToggle = (index) => {
    setOpenModule(openModule === index ? null : index)
  }

  const handleNavigate = (path) => {
    router.push(path)
    setOpenModule(null)
  }

  return (
    <SidebarContainer>
      <SidebarLogo onClick={() => router.push('/dashboard')}>
        Techno Solutions
      </SidebarLogo>

      {menu.map((modulo, index) => (
        <div key={modulo.label}>
          <SidebarModule onClick={() => handleToggle(index)}>
            <FontAwesomeIcon icon={modulo.icon} />
            <SidebarItemLabel>{modulo.label}</SidebarItemLabel>
            <SidebarCollapseIcon isOpen={openModule === index}>
              <FontAwesomeIcon icon={faChevronDown} />
            </SidebarCollapseIcon>
          </SidebarModule>

          <SidebarSubList isOpen={openModule === index}>
            {modulo.items.map((subItem) => (
              <SidebarSubItem
                key={subItem.path}
                onClick={() => handleNavigate(subItem.path)}
                active={router.pathname === subItem.path}
              >
                {subItem.label}
              </SidebarSubItem>
            ))}
          </SidebarSubList>

          <SidebarDivider />
        </div>
      ))}
      
    </SidebarContainer>
  )
}