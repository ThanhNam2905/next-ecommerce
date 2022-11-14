import React from 'react'
import AdminProductsPage from '../../../components/admin/products/admin-products-page';
import DashboardLayout from '../../../components/layouts/admin/dashboard-layout';

function AdminProductScreen() {
    return (
        <DashboardLayout title='Admin Products Page'>
            <AdminProductsPage/>
        </DashboardLayout>
    )
}

AdminProductScreen.auth = { adminOnly: true };

export default AdminProductScreen