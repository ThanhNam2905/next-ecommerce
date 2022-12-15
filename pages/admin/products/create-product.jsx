import React from 'react'
import CreateProductAdminPage from '../../../components/admin/products/create-product/create-product-admin-page';
import DashboardLayout from '../../../components/layouts/admin/dashboard-layout'

function CreateProductAdminScreen() {
    return (
        <DashboardLayout title='Create Product Admin Page'>
            <CreateProductAdminPage/>
        </DashboardLayout>
    )
}

CreateProductAdminScreen.auth = { adminOnly: true };

export default CreateProductAdminScreen;
