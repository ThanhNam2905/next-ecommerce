import React from 'react';
import DashboardLayout from '../../../../components/layouts/admin/dashboard-layout';
import EditProductCategoryAdminPage from '../../../../components/admin/product-categories/edit-product-category/edit-product-category-admin-page';

function EditProductCategoryAdminScreen() {
    return (
        <DashboardLayout title='Edit Product Category Admin Page'>
            <EditProductCategoryAdminPage/>
        </DashboardLayout>
    );
}

EditProductCategoryAdminScreen.auth = { adminOnly: true };

export default EditProductCategoryAdminScreen;
