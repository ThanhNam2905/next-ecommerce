import React from 'react'
import DefaultLayout from '../components/layouts/index/Default-layout'
import LoginPage from '../components/login/login-page'

export default function LoginScreen() {
    return (
        <DefaultLayout title='Trang Đăng Nhập'>
            <LoginPage></LoginPage>
        </DefaultLayout>
    )
}
