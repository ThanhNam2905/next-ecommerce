import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { message } from 'antd';
import { getError } from '../../utils/getError';
import { useRouter } from 'next/router';

export default function LoginPage() {

    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if(session?.user) {  // logged in user 
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register, 
        formState: { errors }
    } = useForm();

    // Handler event when User Login Form
    const handlerSubmitFormLogin = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });
            if(result.error) {
                message.error(result.error);
            }
        } catch (error) {
            message.error(getError(error));
        }
    }


    return (
        <form 
            action="login"
            className='login-form mx-auto max-w-screen-sm my-10  bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-pink-500/50 overflow-hidden py-14 px-16 rounded-md'
            onSubmit={handleSubmit(handlerSubmitFormLogin)}>
            <h1 className='uppercase pb-5 text-3xl text-center'>Đăng nhập</h1>
            <div className='mb-7 text-xl space-y-2'>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" id="email" autoFocus
                    className={`w-full ${!errors.email ? ' !ring-green-300' : ' !ring-red-300'}`} 
                    {...register('email', {
                        required: 'Bạn chưa điền email của bạn.',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                            message: 'Vui lòng điền đúng định dạng email'
                        }
                    })}/>
                        {
                            errors.email && (
                                <div className='text-red-500 text-base'>
                                    { errors.email.message }
                                </div>
                            )
                        }
            </div>
            <div className='mb-7 text-xl space-y-2'>
                <label htmlFor="email">Mật khẩu:</label>
                <input 
                    type="password" id="password" 
                    className={`w-full ${!errors.password ? ' !ring-green-300' : ' !ring-red-300'}`} 
                    {...register('password', {
                        required: 'Bạn chưa điền mật khẩu của bạn.',
                        pattern: {
                            value:  /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,16}$/,
                            message: 'Mật khẩu của bạn phải chứa ít nhất 1 ký tự in hoa, 1 ký tự thường và 1 số. Và độ dài mật khẩu từ 6 đến 16 ký tự'
                        }
                    })}/>
                        {
                            errors.password && (
                                <div className='text-red-500 text-base'>
                                    { errors.password.message }
                                </div>
                            )
                        }
            </div>
            <div className='mb-7 text-xl space-y-2'>
                <input type="submit" value="Đăng Nhập" className='btn btn--primary py-2.5 px-6 focus:ring-0 border-0'/>
            </div>
            <div className='mb-7 text-xl space-y-2'>
                <span>Bạn chưa có tài khoản, Vui lòng đăng ký &nbsp;</span>
                <Link href={'/register'}>
                    <a className='hover:underline underline-offset-4 !text-red-500'>tại đây</a>
                </Link>
            </div>
        </form>
    )
}
