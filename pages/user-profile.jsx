import React from 'react'
import DefaultLayout from '../components/layouts/index/default-layout'
import UserProfilePage from '../components/user-profile/user-profile-page'

export default function UserProfileScreen() {
    return (
        <DefaultLayout title='Trang Hồ sơ người dùng'>
            <UserProfilePage/>
        </DefaultLayout>
    )
}

UserProfileScreen.auth = true;