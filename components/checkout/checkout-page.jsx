import { message } from 'antd';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../store/Store';
import CheckoutWizard from '../orders/components/checkout-wizard'
import Cookies from 'js-cookie';

export default function CheckoutPage() {

    const router = useRouter();
    const [selectedPaymentMethod, setSelectedPaymentMethod ] = useState('');
    const { state, dispatch } = useContext(StoreContext);
    const { cart } = state;
    const { paymentMethod } = cart;

    useEffect(() => {
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod]);
    
    // Handler when user click button continue.
    const handleSubmitFormChechout = (event) => {
        event.preventDefault();
        if(!selectedPaymentMethod) {
            return message.error({
                content: 'Vui lòng chọn phương thức thanh toán của bạn',
                className: 'customize__antd--message'
            })
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod});
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod
            })
        );
        router.push('/place-order')
    }

    return (
        <div className='my-12'>
            <CheckoutWizard activeStepOrder={2}/>
            <div className='grid grid-cols-12 gap-x-7 mt-2'>
            <form 
                action="" className='col-span-7'>
                    <h1 className='text-2xl !my-4'>Phương thức thanh toán</h1>
                    {
                        ['Paypal', 'Thanh toán khi nhận hàng'].map((payment, index) => (
                            <div key={index} className='mb-5'>
                                <input 
                                    type="radio" 
                                    name='paymentMethod'
                                    className='outline-none !p-2 focus:ring-0'
                                    id={payment}
                                    checked={selectedPaymentMethod === payment}
                                    onChange={() => setSelectedPaymentMethod(payment)}/>
                                <label className='p-2' htmlFor={payment}>
                                    {payment}
                                </label>
                            </div>
                        ))
                    }
                    <div className='mb-5 flex items-center gap-x-5'>
                        <button 
                            className='btn btn--default'
                            type="button"
                            onClick={() => router.push('/order')}>
                            Trở lại
                        </button>
                        {/* <button className='btn btn--primary'>
                            Tiếp tục
                        </button> */}
                        <input type="submit" className='btn btn--primary' value="Tiếp tục" onClick={handleSubmitFormChechout}/>
                    </div>
            </form>
            </div>
        </div>
    )
}
