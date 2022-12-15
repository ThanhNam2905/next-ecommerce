import React from 'react'
import EditProductAdminPage from '../../../../components/admin/products/edit-product/edit-product-admin-page';
import DashboardLayout from '../../../../components/layouts/admin/dashboard-layout';

function EditProductAdminScreen() {
    return (
        <DashboardLayout title='Edit Product Admin Page'>
            <EditProductAdminPage/>
        </DashboardLayout>
    )
}

EditProductAdminScreen.auth = { adminOnly: true };

export default EditProductAdminScreen;