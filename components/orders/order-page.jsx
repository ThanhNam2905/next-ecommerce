import React, { useContext, useEffect, useState } from 'react'
import CheckoutWizard from './components/checkout-wizard'
import { location } from '../../utils/location-data'
import { Button, Form, Input, Select, Space, Radio, Badge } from 'antd'
import { PhoneOutlined, UserOutlined, ShoppingOutlined, DollarOutlined } from '@ant-design/icons'
import { StoreContext } from '../../store/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function OrderPage() {

    const { state, dispatch } = useContext(StoreContext);
    const { data: session} = useSession();
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

    console.log('session ==>', session.user.email);

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
    }, [city, form]);

    useEffect(() => {
        form.resetFields(['ward'])
    }, [district, form]);

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

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
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
    const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
    const handleChangeShippingMethod = async (e) => {
        await setSelectedShippingMethod(e.target.value);
    };

    const renderShippingPrice = () => {
        if (selectedShippingMethod === 'Nội thành') {
            return (
                <span>{new Intl.NumberFormat().format(25000)} </span>
            )
        }
        else if (selectedShippingMethod === 'Ngoại thành / tỉnh') {
            return (
                <span>{new Intl.NumberFormat().format(45000)} </span>
            )
        }
        return (
            <span> --- </span>
        )
    }

    const renderTotalPrice = () => {
        if (selectedShippingMethod === 'Nội thành') {
            return (
                <span>{new Intl.NumberFormat().format(cartItems.reduce((a, c) => (a + c.quantityItem * c.price), +25000))} </span>
            )
        }
        else if (selectedShippingMethod === 'Ngoại thành / tỉnh') {
            return (
                <span>{new Intl.NumberFormat().format(cartItems.reduce((a, c) => (a + c.quantityItem * c.price), +45000))} </span>
            )
        }
        return (
            <span> --- </span>
        )
    }

    return (
        <div className='mt-6 mb-12'>
            {/* Breadcrumbs component */}
            <div className='flex flex-col items-center justify-center mb-6'>
                <div className="flex items-center justify-center mb-5">
                    <Link href="/" passHref legacyBehavior>
                        <a>
                            <Image
                                src='https://res.cloudinary.com/nam290596/image/upload/v1679468426/next-store-fashion/logo-shop-10_pqnlwu.png'
                                alt='logo image'
                                width={125}
                                height={50}
                                className='cursor-pointer'
                            />
                        </a>
                    </Link>
                </div>
                <div className='flex items-center gap-x-[5px] text-[15px]'>
                    <Link href={"/"}>
                        <h2 title='Trang chủ' className='font-normal cursor-pointer text-gray-500' >
                            Trang chủ
                        </h2>
                    </Link>
                    <p className='text-lg'>/</p>
                    <h2 className='text-gray-800'>Đặt hàng</h2>
                </div>
            </div>

            {/* CheckoutWizard Component */}
            <CheckoutWizard activeStepOrder={1} />

            <div className='border-y py-10 border-gray-300'>
                <div className='flex items-center gap-x-3 text-gray-400'>
                    <UserOutlined className='text-2xl'/>
                    <p className='text-2xl font-bold'>Đăng nhập</p>
                </div>
                <p className='text-gray-500 text-[14px] font-semibold !ml-9 !mt-2'>{session.user.email}</p>
            </div>

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
                                <div className='my-3 space-y-3'>
                                    <Radio
                                        value='Paypal'
                                        checked={selectedPaymentMethod === 'Paypal'}
                                        className='!flex !items-center gap-x-3 !space-y-2'>
                                        <div className='flex items-center gap-x-4'>
                                            <Image 
                                                src={'https://res.cloudinary.com/nam290596/image/upload/v1664464658/next-store-fashion/paypal-logo-C83095A82C-seeklogo.com_fsf6ae_yxfqyx.png'}
                                                alt='Paypal Logo'
                                                width={36}
                                                height={36}/>
                                            <span className='text-[13px] italic text-gray-500/80 font-semibold pb-1'>(Ví điện tử Paypal)</span>
                                        </div>
                                    </Radio>
                                    <Radio
                                        value='Thanh toán khi giao hàng'
                                        checked={selectedPaymentMethod === 'Thanh toán khi giao hàng'}
                                        className='!flex !items-center gap-x-3 !space-y-2'>
                                        <div className='flex items-center gap-x-4'>
                                            <Image 
                                                src={'https://res.cloudinary.com/nam290596/image/upload/v1664465232/next-store-fashion/shipcode_kmlng6_iuiq3h.jpg'}
                                                alt='Shipcode Logo'
                                                width={110}
                                                height={36}/>
                                            <span className='text-[13px] italic text-gray-500/80 font-semibold pb-1'>(Thanh toán khi giao hàng)</span>
                                        </div>
                                    </Radio>
                                </div>
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
                    <h3 className='px-6 text-[18px] inline-flex items-center gap-x-2 !mt-4 py-2 bg-gray-100/95 rounded-tl-md rounded-tr-md'>
                        Giỏ hàng của bạn
                        <ShoppingOutlined />
                    </h3>
                    <div className='w-full px-6 py-3 bg-gray-100/95 rounded-md rounded-tl-none'>
                        <div className='divide-y-2 divide-gray-200 pb-3'>
                            {
                                cartItems.length > 0 &&
                                cartItems.map((item, index) => (
                                    <div key={index} className='flex items-center gap-x-5 py-4'>
                                        <Badge count={item.quantityItem} size='default'>
                                            <Image
                                                src={item.imagesProduct}
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                className='!p-1.5 bg-white !border-2 !border-gray-500 rounded-md' />
                                        </Badge>
                                        <div className='flex-1 flex flex-col'>
                                            <p className='text-[17px] font-semibold line-clamp-1'>{item.name}</p>
                                            <p className='text-sm'>Color: <span className='font-semibold italic'>{item.selectedColor}</span></p>
                                            <p className='text-sm'>Size: <span className='font-semibold italic'>{item.selectedSize}</span></p>
                                        </div>
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
                                <p className={`font-semibold text-gray-500 text-[15px]  ${selectedShippingMethod !== '' ? ' line-through italic ' : ' '}`}>
                                    {new Intl.NumberFormat().format(cartItems.reduce((a, c) => a + c.quantityItem * c.price, 0))}
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
                                    <DollarOutlined className='!mt-1' />
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


