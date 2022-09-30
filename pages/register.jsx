import React from 'react'
import DefaultLayout from '../components/layouts/index/default-layout'
import RegisterPage from '../components/register/register-page'

export default function LoginScreen() {
    return (
        <DefaultLayout title='Trang Đăng Ký Tài Khoản'>
            <RegisterPage></RegisterPage>
        </DefaultLayout>
    )
}
