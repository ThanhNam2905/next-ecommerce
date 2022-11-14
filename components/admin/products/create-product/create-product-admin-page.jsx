import { Form, Input } from 'antd'
import React, { useState } from 'react'

export default function CreateProductAdminPage() {


    // Antd Form.
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const initialState = {
        nameProduct: '',
    };

    const [product, setProduct] = useState(initialState)

    // Feature Create a new Product
    const onSubmitFormAddProduct = async (values) => {
        console.log(values);
    }

    return (
        <>
            <h2 className='text-[19px] text-center !mt-2 !mb-4 capitalize'>Thêm mới Sản phẩm</h2>
            <Form
                name="form-create-product"
                className="form-create-product"
                form={form}
                {...layout}
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmitFormAddProduct}
                >
                    <Form.Item
                        style={{ width: "100%" }}
                        label="Tên sản phẩm"
                        name="nameProduct"
                        rules={[
                            {
                                required: true,
                                message: 'Tên sản phẩm không được để trống!',
                            },
                            {
                                unique: true,
                                message: 'Tên sản phẩm không được trùng nhau!',
                                warningOnly: true,
                            }
                        ]}
                        hasFeedback
                    >
                        <Input type="text" min={0} max={200} placeholder="Tên sản phẩm"/>
                    </Form.Item>
                </Form>

        </>
    )
}
