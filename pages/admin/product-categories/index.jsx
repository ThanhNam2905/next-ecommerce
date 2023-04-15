import React from 'react';
import DashboardLayout from '../../../components/layouts/admin/dashboard-layout';
import AdminProductCategoriesPage from '../../../components/admin/product-categories/admin-product-categories-page';

function AdminProductCategoryScreen() {
    return (
        <DashboardLayout title='Admin Product Category Page'>
            <AdminProductCategoriesPage/>
        </DashboardLayout>
    );
}

AdminProductCategoryScreen.auth = { adminOnly: true };

export default AdminProductCategoryScreen;
