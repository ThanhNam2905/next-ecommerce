import { message } from 'antd';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { getError } from '../../utils/getError';

export default function UserProfilePage() {

    const { data: session } = useSession();

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors }
    } = useForm();
    
    useEffect(() => {
        const fetchUserData = async() => {
            if(session) {
                const { data } = await axios.get(`/api/user/${session._id}`);
                setValue('numberPhone', data.numberPhone);
                setValue('name', data.name);
                setValue('email', data.email);
            }
        };
        fetchUserData();
    }, [session, setValue]);

    const submitHanlderUpdateUserProfile = async({ name, email, password, numberPhone }) => {
        
        try {
            await axios.put('/api/auth/update-profile', {
                name,
                email,
                password,
                numberPhone
            });

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });
            message.success({
                content: 'Tài khoản của bạn đã được cập nhật thành công',
                className: 'customize__antd--message-success'
            });

            if(result.error) {
                return message.error({
                    content: result.error ,
                    className: 'customize__antd--message-error'
                })
            }
        } catch (error) {
            message.error({
                content: getError(error) ,
                className: 'customize__antd--message-error'
            })
        }
    }

    return (
        <div className='my-16'>
            <div className='grid grid-cols-12 gap-7'>
                <div className='col-span-4 bg-red-50'>

                </div>
                <form action=""
                className='col-span-8 max-w-screen-md bg-gray-50 rounded-md py-8 px-10'
                onSubmit={handleSubmit(submitHanlderUpdateUserProfile)}>
                    <h2 className='text-[26px] font-nunito font-semibold !mb-6'>Thông tin tài khoản</h2>
                    <div className='mb-5 flex flex-col'>
                        <label htmlFor="name" className='!mb-2.5 inline-block text-base'>Họ tên:</label>
                        <input 
                            type="text" 
                            id='name'
                            className={`w-full font-semibold ${!errors.name ? ' !ring-green-300' : ' !ring-red-300'}`} 
                            autoFocus
                            {...register('name', {
                                required: 'Vui lòng điền họ tên của bạn muốn update'
                            })}/>
                            {
                                errors.name && (
                                    <div className='text-red-500 text-base'>
                                        { errors.name.message }
                                    </div>
                                )
                            }
                    </div>
                    <div className='mb-5 flex flex-col'>
                        <label htmlFor="numberPhone" className='!mb-2.5 inline-block text-base'>Số điện thoại:</label>
                        <input 
                            type="number" 
                            id='numberPhone'
                            className={`w-full font-semibold ${!errors.numberPhone ? ' !ring-green-300' : ' !ring-red-300'}`} 
                            autoFocus
                            {...register('numberPhone', {
                                required: 'Vui lòng điền số điện thoại của bạn muốn update',
                                maxLength: {
                                    value: 10,
                                    message: 'Số điện thoại của bạn không được quá 10 ký tự.'
                                },
                                minLength: {
                                    value: 9,
                                    message: 'Số điện thoại của bạn ít nhất 9 ký tự.'
                                }
                            })}/>
                            {
                                errors.numberPhone && (
                                    <div className='text-red-500 text-base'>
                                        { errors.numberPhone.message }
                                    </div>
                                )
                            }
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="email" className='!mb-2.5 inline-block text-base'>Email:</label>
                        <input 
                            type="email" 
                            id='email'
                            disabled
                            className='w-full font-semibold bg-gray-300/70 focus:ring-0 focus:cursor-not-allowed disabled:opacity-75 cursor-not-allowed'
                            {...register('email')}/>
            
                    </div>
                    
                    <div className='mb-5'>
                        <label htmlFor="password">Mật khẩu:</label>
                        <input 
                            type="password" 
                            id='password'
                            className={`w-full ${!errors.password ? ' !ring-green-300' : ' !ring-red-300'}`} 
                            autoFocus
                            {...register('password', {
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
                    <div className='mb-7 space-y-2'>
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                        <input 
                            type="password" id="confirmPassword" 
                            className={`w-full ${!errors.confirmPassword ? ' !ring-green-300' : ' !ring-red-300'}`} 
                            {...register('confirmPassword', {
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
                        <button className='btn btn__primary--index py-2.5 px-6 focus:ring-0 border-0'>Cập nhật</button>
                    </div>
            </form>
            </div>
            
        </div>
    )
}
