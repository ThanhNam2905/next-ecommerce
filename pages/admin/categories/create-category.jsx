import React from 'react';
import DashboardLayout from '../../../components/layouts/admin/dashboard-layout';
import CreateCategoryAdminPage from '../../../components/admin/categories/create-category/create-category-admin-page';

function CreateCategoryAdminScreen() {
    return (
        <DashboardLayout title='Create Category Admin Page'>
            <CreateCategoryAdminPage/>
        </DashboardLayout>
    );
}

CreateCategoryAdminScreen.auth = { adminOnly: true };

export default CreateCategoryAdminScreen;