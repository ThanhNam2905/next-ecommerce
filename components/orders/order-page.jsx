import React, { useContext, useEffect, useState } from 'react'
import CheckoutWizard from './components/checkout-wizard'
import { location } from '../../utils/location-data'
import { Button, Form, Input, Select, Space } from 'antd'
import { PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { StoreContext } from '../../store/Store'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

export default function OrderPage() {

    const { state, dispatch } = useContext(StoreContext);
    const { cart } = state;
    const { shippingAddress } = cart;
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


    // handler Submit Order
    const { setValue } = useForm();

    useEffect(() => {
        
        setValue('username', shippingAddress.username)
        setValue('numberPhone', shippingAddress.numberPhone)
        setValue('addressShip', shippingAddress.addressShip)
    }, [setValue, shippingAddress]);

    const handleSubmitFormOrder = (values) => {
        const addressShip = values.apartmentNumber + ', ' + ward + ', ' + district + ', ' + city;
        const { username, numberPhone } = values;

        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { username, numberPhone, addressShip }
        })
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    username, 
                    numberPhone,
                    addressShip
                }
            })
        )
        router.push('/checkout');
    }

    return (
        <div className='my-12'>
            <CheckoutWizard activeStepOrder={1}/>
            {/* Form Order  */}
            <h1 className='col-span-12 px-6 text-2xl !mt-4 py-2.5 !mb-0 bg-gray-100/70 inline-block rounded-tl rounded-tr'>Thông tin giao hàng</h1>
            <div className='grid grid-cols-12 gap-x-7'>
                <div className="col-span-7 bg-gray-100/70 px-6 py-6 rounded">
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

                        <div className='mt-4'>
                            <Form.Item>
                                <Button htmlType="submit" className='mr-6 btn--order-now'>
                                    Đặt hàng ngay
                                </Button>
                                <Button htmlType="button" className='mr-6 mt-2 btn--reset-order' onClick={handleResetValueField}>
                                    Reset
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className='col-span-5'>

                </div>
            </div>
        </div>
    )
}


