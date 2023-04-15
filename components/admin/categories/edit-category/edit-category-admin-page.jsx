import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, notification } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { getError } from '../../../../utils/getError';
import toSlugName from '../../../../utils/convertStringToSlugName';

function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
    }
}

export default function EditCategoryAdminPage() {
    // Antd Form.
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 24
        },
        wrapperCol: {
            span: 24
        }
    };

    const router = useRouter();
    const { id } = router.query;

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
        errorUpdate: ''
    });

    const [category, setCategory] = useState({
        nameCategory: '',
        title: '',
        typeCategory: '',
    })

    // Get Data from Api
    useEffect(() => {
        const fetchData = async() => {
            try {
                if(id) {
                    const { data } = await axios.get(`/api/admin/categories/${id}`);
                    await setCategory({
                        nameCategory: data.category.nameCategory,
                        title: data.category.title,
                        typeCategory: data.category.typeCategory,
                    });
                }
            } catch (error) {
                notification.error({
                    message: 'Thông báo',
                    description: getError(error)
                });
            }
        };
        fetchData();
    }, [id]);

    // Set Value of Fields Form
    useEffect(() => {
        if(category) {
            form.setFieldsValue({
                nameCategory: category.nameCategory,
                title: category.title,
                typeCategory: category.typeCategory,
            });
        }
    }, [category, form]);

    // Handler Edit Category
    const onSubmitFormEditCategory = async (values) => {
        dispatch({ type: 'UPDATE_REQUEST' });
        const {
            nameCategory,
            title,
            typeCategory,
        } = values;

        const slugNameCategory = await toSlugName(nameCategory);
        const slugTitle = toSlugName(title);

        try {
            await axios.put(`/api/admin/categories/${id}`, {
                nameCategory,
                title,
                typeCategory,
                slugNameCategory,
                slugTitle
            });

            setTimeout(() => {
                dispatch({ type: 'UPDATE_SUCCESS' });
            }, 500);

            notification.success({
                message: 'Thông báo',
                description: `Bạn vừa chỉnh sửa danh mục thành công`
            })

            router.push('/admin/categories');
        } catch (error) {
            dispatch({ type: 'UPDATE_FAIL' });
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            })
        }
    };

    return (
        <>
            <h1 className="text-[18px] capitalize text-gray-700 text-left font-semibold !mt-4 !mb-6">
                Chỉnh sửa danh mục
            </h1>
            <Form
                name="form-edit-category"
                className="form-edit-category bg-white !py-10 !px-8 !mt-4 !rounded-lg space-y-2 !shadow-lg"
                form={form}
                {...layout}
                initialValues={{
                    remember: true
                }}
                onFinish={onSubmitFormEditCategory}
            >
                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Tên danh mục:
                    </h3>
                    <Form.Item
                        name="nameCategory"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Tên danh mục không được để trống!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            type="text"
                            min={0}
                            max={200}
                            className="!py-2.5 !px-4 !rounded-md placeholder:!text-gray-500"
                        />
                    </Form.Item>
                </div>
                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Tên tiêu đề:
                    </h3>
                    <Form.Item
                        name="title"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Tên tiêu đề không được để trống!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            type="text"
                            min={0}
                            max={200}
                            className="!py-2.5 !px-4 !rounded-md placeholder:!text-gray-500"
                        />
                    </Form.Item>
                </div>
                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Loại danh mục:
                    </h3>
                    <Form.Item
                        name="typeCategory"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn loại danh mục!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Radio.Group>
                            <Radio value="Nam">Nam</Radio>
                            <Radio value="Nữ">Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="pt-6">
                    <Form.Item style={{ width: '100%' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full !py-6 !flex items-center justify-center !text-lg"
                        >
                            { loadingUpdate ? (
                                <div className="flex items-center gap-x-2">
                                    <p>Đang tải...</p>
                                    <Loading3QuartersOutlined className="animate-spin" />
                                </div>
                            ) : (
                                <p>Chỉnh sửa danh mục</p>
                            )}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
