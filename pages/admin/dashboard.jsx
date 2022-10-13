import React from 'react'
import AdminDashboardPage from '../../components/admin/dashboard-page';
import DashboardLayout from '../../components/layouts/admin/dashboard-layout';

function AdminDashboardScreen() {
    return (
        <DashboardLayout title='Admin Dashboard Home'>
            <AdminDashboardPage/>
        </DashboardLayout>
    )
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;