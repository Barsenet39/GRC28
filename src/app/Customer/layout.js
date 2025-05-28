// src/app/Customer/layout.js

import HeaderClient from './header/HeaderClient';
import ClientLayout from './ClientLayout';
// Optional: import './customer.css' if needed

export default function CustomerLayout({ children }) {
  return (
    <>
      <HeaderClient />
      <ClientLayout>{children}</ClientLayout>
    </>
  );
}
