import React from 'react'
import AdminOrdersPage from '../../../components/admin/orders/admin-orders-page';
import DashboardLayout from '../../../components/layouts/admin/dashboard-layout'

function AdminOrderScreen() {
    return (
        <DashboardLayout title='Admin Order Page'>
            <AdminOrdersPage/>
        </DashboardLayout>
    )
}

AdminOrderScreen.auth = { adminOnly: true};

export default AdminOrderScreen;