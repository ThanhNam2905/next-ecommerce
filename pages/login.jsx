import React from 'react'
import DefaultLayout from '../components/layouts/index/default-layout'
import LoginPage from '../components/login/login-page'

export default function LoginScreen() {
    return (
        <DefaultLayout title='Trang Đăng Nhập Tài Khoản'>
            <LoginPage></LoginPage>
        </DefaultLayout>
    )
}
