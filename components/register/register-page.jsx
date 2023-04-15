import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { message } from 'antd';
import { getError } from '../../utils/getError';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function RegisterPage() {

    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if(session?.user) {  // register in user 
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register, 
        getValues,
        formState: { errors }
    } = useForm();

    // Handler event when User Register Form
    const handlerSubmitFormRegister = async ({ name, numberPhone, email, password }) => {
        try {
            await axios.post('/api/auth/signup', {
                name, numberPhone, email, password
            });

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });
            if(result.error) {
                message.error({
                    content: result.error,
                    className: 'customize__antd--message-error'
                });
            }
        } catch (error) {
            message.error({
                content: getError(error),
                className: 'customize__antd--message-error'
            });
        }
    }


    return (
        <form 
            action="register"
            className='register-form mx-auto max-w-screen-sm my-10 bg-gradient-to-tr from-blue-400/40 via-purple-400/40 to-pink-400/40 overflow-hidden py-14 px-16 rounded-md'
            onSubmit={handleSubmit(handlerSubmitFormRegister)}>
            <h1 className='uppercase pb-5 text-2xl text-center'>Đăng Ký</h1>
            <div className='mb-7 text-lg space-y-2'>
                <label htmlFor="name">Họ Tên:</label>
                <input 
                    type="text" id="name" autoFocus
                    className={`w-full ${!errors.name ? ' !ring-green-300' : ' !ring-red-300'}`} 
                    {...register('name', {
                        required: 'Bạn chưa điền họ tên của bạn.',
                    })}/>
                        {   errors.name && (
                                <div className='text-red-500 text-base'>
                                    { errors.name.message }
                                </div>
                            )
                        }
            </div>
            <div className='mb-7 text-lg space-y-2'>
                <label htmlFor="numberPhone">Số điện thoại:</label>
                <input 
                    type="number" id="numberPhone" autoFocus
                    className={`w-full ${!errors.numberPhone ? ' !ring-green-300' : ' !ring-red-300'}`} 
                    {...register('numberPhone', {
                        required: 'Bạn chưa điền số điện thoại của bạn.',
                        maxLength: {
                            value: 10,
                            message: 'Số điện thoại của bạn không được quá 10 ký tự.'
                        },
                        minLength: {
                            value: 9,
                            message: 'Số điện thoại của bạn ít nhất 9 ký tự.'
                        }
                    })}/>
                        {   errors.numberPhone && (
                                <div className='text-red-500 text-base'>
                                    { errors.numberPhone.message }
                                </div>
                            )
                        }
            </div>
            <div className='mb-7 text-lg space-y-2'>
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
                        {   errors.email && (
                                <div className='text-red-500 text-base'>
                                    { errors.email.message }
                                </div>
                            )
                        }
            </div>
            <div className='mb-7 text-lg space-y-2'>
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
                        {   errors.password && (
                                <div className='text-red-500 text-base'>
                                    { errors.password.message }
                                </div>
                            )
                        }
            </div>
            <div className='mb-7 text-lg space-y-2'>
                <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                <input 
                    type="password" id="confirmPassword" 
                    className={`w-full ${!errors.confirmPassword ? ' !ring-green-300' : ' !ring-red-300'}`} 
                    {...register('confirmPassword', {
                        required: 'Bạn chưa điền xác nhận mật khẩu của bạn.',
                        pattern: {
                            value:  /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,16}$/,
                            message: 'Xác nhận mật khẩu của bạn phải chứa ít nhất 1 ký tự in hoa, 1 ký tự thường và 1 số. Và độ dài mật khẩu từ 6 đến 16 ký tự'
                        },
                        validate: (value) => value === getValues('password'),
                    })}/>
                        {   errors.confirmPassword && (
                                <div className='text-red-500 text-base'>
                                    { errors.confirmPassword.message }
                                </div>
                            )
                        }
                        {   errors.confirmPassword && 
                                errors.confirmPassword.type === 'validate' && (
                                    <div className='text-red-500 text-base'>Mật khẩu của bạn không trùng khớp</div>
                                )
                        }
            </div>
            <div className='mb-7'>
                <input type="submit" value="Đăng Ký" className='btn btn__primary--index py-2.5 px-6 focus:ring-0 border-0'/>
            </div>
            <div className='mb-7 text-lg'>
                <span>Bạn đã có tài khoản, Vui lòng đăng nhập &nbsp;</span>
                <Link href={`login?redirect=${redirect || '/'}`}>
                    <a className='hover:underline underline-offset-4 !text-red-500'>tại đây</a>
                </Link>
            </div>
        </form>
    )
}
