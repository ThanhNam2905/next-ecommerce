import React from 'react'
import AdminCategoriesPage from '../../../components/admin/categories/admin-categories-page';
import DashboardLayout from '../../../components/layouts/admin/dashboard-layout'

function AdminCategoryScreen() {
    return (
        <DashboardLayout title='Admin Categories Page'>
            <AdminCategoriesPage/>
        </DashboardLayout>
    )
}

AdminCategoryScreen.auth = { adminOnly: true };
export default AdminCategoryScreen;