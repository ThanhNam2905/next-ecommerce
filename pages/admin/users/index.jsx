import React from 'react'
import AdminUsersPage from '../../../components/admin/users/admin-users-page';
import DashboardLayout from '../../../components/layouts/admin/dashboard-layout';

function AdminUserScreen() {
    return (
        <DashboardLayout title='Admin Order Page'>
            <AdminUsersPage/>
        </DashboardLayout>
    )
}

AdminUserScreen.auth = { adminOnly: true };

export default AdminUserScreen;
