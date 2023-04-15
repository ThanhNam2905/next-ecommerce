import React from 'react';
import DashboardLayout from '../../../../components/layouts/admin/dashboard-layout';
import EditCategoryAdminPage from '../../../../components/admin/categories/edit-category/edit-category-admin-page';

function EditCategoryAdminScreen() {
    return (
        <DashboardLayout title='Edit Category Admin Page'>
            <EditCategoryAdminPage/>
        </DashboardLayout>
    );
}

EditCategoryAdminScreen.auth = { adminOnly: true };

export default EditCategoryAdminScreen;
