import React from 'react';
import DashboardLayout from '../../../components/layouts/admin/dashboard-layout';
import CreateProductCategoryAdminPage from '../../../components/admin/product-categories/create-product-category/create-product-category-admin-page';

function CreateProductCategoryAdminScreen() {
    return (
        <DashboardLayout title='Create Product Category Admin Page'>
            <CreateProductCategoryAdminPage/>
        </DashboardLayout>
    );
}

export default CreateProductCategoryAdminScreen;
