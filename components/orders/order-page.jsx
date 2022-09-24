import React, { useContext, useEffect, useState } from 'react'
import CheckoutWizard from './components/checkout-wizard'
import { location } from '../../utils/location-data'
import { Button, Form, Input, Select, Space, Radio, Badge } from 'antd'
import { PhoneOutlined, UserOutlined, ShoppingOutlined, DollarOutlined } from '@ant-design/icons'
import { StoreContext } from '../../store/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import Image from 'next/image'

export default function OrderPage() {

    const { state, dispatch } = useContext(StoreContext);
    const { cart } = state;
    const { cartItems } = cart;
    const router = useRouter();
    

    const { Option } = Select;
    const { TextArea } = Input;
    const layout = {
        wrapperCol: {
            span: 24,
        },
    };

    const [form] = Form.useForm();
    const handleResetValueField = () => {
        form.resetFields();
    }

    const [city, setCity] = useState("");
    const handlerChangeCity = async (value) => {
        await setCity(value);
    }

    const [district, setDistrict] = useState("");
    const handlerChangeDistrict = async (value) => {
        await setDistrict(value);
    }

    const [ward, setWard] = useState("")
    const handlerChangeWard = async (value) => {
        await setWard(value);
    };

    useEffect(() => {
        form.resetFields(['districts']),
        form.resetFields(['wards'])
    }, [city]);

    useEffect(() => {
        form.resetFields(['ward'])
    }, [district]);

    //  Handler User Submit Order
    const handleSubmitFormOrder = (values) => {
        const addressShip = values.apartmentNumber + ', ' + ward + ', ' + district + ', ' + city;
        const { username, numberPhone, paymentMethod, shippingMethod } = values;

        dispatch({
            type: 'SAVE_INFO_ORDER',
            payload: { 
                shippingAddress: {
                    username, 
                    numberPhone,
                    addressShip,
                },
                paymentMethod,
                shippingMethod
            }
        })
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                infoOrder: {
                    shippingAddress: {
                        username, 
                        numberPhone,
                        addressShip,
                        
                    },
                    paymentMethod,
                    shippingMethod
                }
            })
        )
        router.push('/place-order');
    }

    const listPaymentMethod = [
        {
            name: 'Paypal',
            img: 'https://res.cloudinary.com/nam290596/image/upload/v1663868579/blog-website/paypal-logo-C83095A82C-seeklogo.com_fsf6ae.png'
        },
        {
            name: 'Thanh toán khi nhận hàng',
            img: 'https://cdn-icons-png.flaticon.com/512/1554/1554414.png'
        }
    ]
    const [selectedPaymentMethod, setSelectedPaymentMethod ] = useState('');
    const handleChangePaymentMethod = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const listShippingMethod = [
        {
            title: 'Nội thành',
            priceShipping: 25000, 
            subTitle: '(Ship trong khu vực thành phố)'
        },
        {
            title: 'Ngoại thành / tỉnh',
            priceShipping: 45000, 
            subTitle: '(Ship các khu vực tỉnh ngoài thành phố)'
        }
    ]
    const [selectedShippingMethod, setSelectedShippingMethod ] = useState('');
    const handleChangeShippingMethod = async (e) => {
        await setSelectedShippingMethod(e.target.value);
    };

    const renderShippingPrice = () => {
        if(selectedShippingMethod === 'Nội thành') {
            return (
                <span>{new Intl.NumberFormat().format(25000)} </span>
            )
        }
        else if(selectedShippingMethod === 'Ngoại thành / tỉnh') {
            return (
                <span>{new Intl.NumberFormat().format(45000)} </span>
            )
        }
        return (
            <div> --- </div>
        )
    }

    const renderTotalPrice = () => {
        if(selectedShippingMethod === 'Nội thành') {
            return (
                <span>{new Intl.NumberFormat().format(cartItems.reduce((a, c) => (a + c.quantity * c.price) , +25000))} </span>
            )
        }
        else if(selectedShippingMethod === 'Ngoại thành / tỉnh') {
            return (
                <span>{new Intl.NumberFormat().format(cartItems.reduce((a, c) => (a + c.quantity * c.price) , +45000))} </span>
            )
        }
        return (
            <div> --- </div>
        )
    }
    

    return (
        <div className='my-12'>
            <CheckoutWizard activeStepOrder={1}/>
            {/* Form Order  */}
            
            <div className='grid grid-cols-12 gap-x-7'>
                <div className="col-span-7 px-6 py-3 rounded">
                    <h3 className='col-span-12 px-6 text-[18px] !my-4 py-2 bg-blue-100/40 inline-block rounded-md'>Thông tin giao hàng</h3>
                    <h5 className='text-slate-600/70 font-semibold !mb-3 text-[13px]'>(Vui lòng điền đầy đủ chính xác các thông tin địa chỉ giao hàng của bạn phía dưới)</h5>
                    <Form
                        {...layout} form={form}
                        name="form-order"
                        layout='vertical'
                        onFinish={handleSubmitFormOrder}>
                        <Form.Item
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền họ và tên của bạn.'
                                }
                            ]}>
                            <Input
                                className='input-customize__css'
                                style={{ padding: '0.8rem 1.6rem', borderRadius: '0.5rem' }}
                                prefix={<UserOutlined className='text-gray-600 pr-3 text-xl' />}
                                allowClear
                                placeholder="Họ và tên" />
                        </Form.Item>

                        <Space direction='vertical' size={'large'} />

                        <Form.Item
                            name='numberPhone'
                            className='hover:border-red-500'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền số điện thoại của bạn.'
                                }
                            ]}>
                            <Input
                                type={'number'}
                                className='input-customize__css placeholder:text-green-500'
                                style={{ padding: '0.8rem 1.6rem', borderRadius: '0.5rem' }}
                                prefix={<PhoneOutlined className='text-gray-600 pr-3 text-xl' />}
                                allowClear
                                placeholder="Số điện thoại" />
                        </Form.Item>

                        <Space direction='vertical' size={'large'} />

                        <Form.Item
                            name='apartmentNumber'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền đầy đủ thông tin.'
                                }
                            ]}>
                            <TextArea
                                rows={4}
                                maxLength={300}
                                className='textarea-customize__css'
                                allowClear
                                placeholder="Địa chỉ cụ thể số nhà, tên đường, ..." />
                        </Form.Item>

                        <Space direction='vertical' size={'large'} />

                        <div className='flex items-center justify-between'>
                            <Form.Item
                                name="city"
                                style={{ width: "32%" }}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn tỉnh thành phố nơi bạn sinh sống',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn Tỉnh / Thành Phố"
                                    className='select-antd__customize'
                                    style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}

                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={handlerChangeCity}>
                                    {location.length > 0 &&
                                        location.map((item, index) => (
                                            <Option value={item.name} key={index}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Space direction='vertical' size={'large'} />
                            <Form.Item
                                name="districts"
                                style={{ width: "32%" }}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn quận / huyện nơi bạn sinh sống',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn Quận / Huyện"
                                    className='select-antd__customize'
                                    style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}

                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={handlerChangeDistrict}>
                                    {location.length > 0 &&
                                        location.map(item => (
                                            item.name === city &&
                                            item.huyen.map(huyen => (
                                                <Option key={huyen.id} value={huyen.name}>{huyen.name}</Option>
                                            ))
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Space direction='vertical' size={'large'} />
                            <Form.Item
                                name="wards"
                                style={{ width: '32%' }}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn phường / xã nơi bạn sinh sống'
                                    }
                                ]}>
                                <Select
                                    placeholder="Chọn Phường / Xã"
                                    className='select-antd__customize'
                                    style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}

                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={handlerChangeWard}>
                                    {location.length > 0 &&
                                        location.map(item => (
                                            item.name === city &&
                                            item.huyen.map(huyen =>
                                                huyen.name === district &&
                                                huyen.xa.map(ward => (
                                                    <Option key={ward.id} value={ward.name}>{ward.name}</Option>
                                                )))
                                        ))

                                    }
                                </Select>
                            </Form.Item>
                        </div>

                        <h3 className='col-span-12 px-6 text-[18px] !my-4 py-2 bg-blue-100/40 inline-block rounded-md'>Phương thức thanh toán</h3>
                        <Form.Item
                            name='paymentMethod'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn phương thức thanh toán của bạn.'
                                }
                            ]}>
                            <Radio.Group onChange={handleChangePaymentMethod}>
                                {
                                    listPaymentMethod.map((payment, index) => (
                                        <div key={index} className='mb-5'>
                                            <Radio 
                                                value={payment.name}
                                                checked={selectedPaymentMethod === payment.name}
                                                className='!flex !items-center gap-x-3 !space-y-2'>
                                                    <div className='flex items-center gap-x-4'>
                                                        <img src={payment.img} alt={payment.name} className='w-9 h-9 mt-2'/>
                                                        <span className='text-base font-semibold'>{payment.name}</span>
                                                    </div>
                                            </Radio>
                                        </div>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>

                        <h3 className='col-span-12 px-6 text-[18px] !my-4 py-2 bg-blue-100/40 inline-block rounded-md'>Phương thức vận chuyễn</h3>
                        <Form.Item
                            name='shippingMethod'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn phương thức vận chuyễn của bạn.'
                                }
                            ]}>
                            <Radio.Group onChange={handleChangeShippingMethod}>
                                {
                                    listShippingMethod.map((shipping, index) => (
                                        <div key={index} className='mb-5'>
                                            <Radio 
                                                value={shipping.title}
                                                checked={selectedShippingMethod === shipping.title}
                                                className='!flex !items-center gap-x-3 !space-y-2'>
                                                    <div className='flex items-center gap-x-4'>
                                                        <span className='font-semibold text-base'>{shipping.title}</span>
                                                        <span className='text-sm text-gray-400 font-semibold italic'>{shipping.subTitle}</span>
                                                    </div>
                                                    <p className='font-semibold text-red-500 text-lg'>
                                                        {new Intl.NumberFormat().format(shipping.priceShipping)} 
                                                        <sup className='underline ml-0.5'>đ</sup>
                                                    </p>
                                            </Radio>
                                        </div>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>

                        <div className='mt-4'>
                            <Form.Item>
                                <Button htmlType="submit" className='mr-6 btn--order-now'>
                                    Tiếp tục đặt hàng
                                </Button>
                                <Button htmlType="button" className='mr-6 mt-2 btn--reset-order' onClick={handleResetValueField}>
                                    Reset
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className='col-span-5'>
                    <h3 className='px-6 text-[18px] inline-flex items-center gap-x-2 !mt-4 py-2 bg-gray-100/95 inline-block rounded-tl-md rounded-tr-md'>
                        Giỏ hàng của bạn
                        <ShoppingOutlined />
                    </h3>    
                    <div className='w-full px-6 py-3 bg-gray-100/95 rounded-md rounded-tl-none'>
                        <div className='divide-y-2 divide-gray-200 pb-3'>
                            {
                                cartItems.length > 0 &&
                                    cartItems.map((item, index) => (
                                        <div key={index} className='flex items-center gap-x-5 py-4'>
                                            <Badge count={item.quantity} size='default'>
                                                <Image
                                                    src={item.images}
                                                    alt={item.name}
                                                    width={80}
                                                    height={80}
                                                    className='!p-1.5 bg-white !border-2 !border-gray-500 rounded-md'/>
                                            </Badge>
                                            <p className='flex-1 text-[16px] font-semibold line-clamp-1'>{item.name}</p>
                                            <p className='font-medium text-gray-600 text-[14px] italic'>
                                                {new Intl.NumberFormat().format(item.price)} 
                                                <sup className='underline ml-1 mt-1.5'>đ</sup>
                                            </p>
                                        </div>
                                    ))
                            }
                        </div>
                        <div className='border-t-2 border-gray-200 pt-2'>
                            <div className='flex items-center justify-between my-5'>
                                <p className='text-[16px] font-semibold text-gray-600'>
                                    Tạm tính: 
                                </p> 
                                <p className={`font-semibold text-gray-500 text-[15px] ${selectedShippingMethod !== '' ? ' line-through italic' : ''}`}>
                                    {new Intl.NumberFormat().format(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))}
                                    <sup className='underline ml-1 mt-1.5'>đ</sup>
                                </p>
                            </div>
                            <div className='flex items-center justify-between my-5'>
                                <p className='text-[16px] font-semibold text-gray-600'>
                                    Phí vận chuyễn:
                                </p> 
                                <p className='font-semibold text-green-500 text-[15px] flex items-center'>
                                    {renderShippingPrice()}
                                    <sup className='underline ml-1 mt-1.5'>đ</sup>
                                </p>
                            </div>
                            <div className='flex items-center justify-between my-5'>
                                <p className='text-xl font-semibold flex items-center gap-x-2'>
                                    <span>Tổng cộng:</span> 
                                    <DollarOutlined className='!mt-1'/>
                                </p> 
                                <p className='font-bold text-xl flex items-center'>
                                    {renderTotalPrice()}
                                    <sup className='underline ml-1 mt-1.5'>đ</sup>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


