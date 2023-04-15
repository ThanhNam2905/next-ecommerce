import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, notification } from 'antd';
import React, { useReducer } from 'react';
import toSlugName from '../../../../utils/convertStringToSlugName';
import { getError } from '../../../../utils/getError';
import axios from 'axios';


function reducer(state, action) {
    switch(action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loadingCreate: true };
        case 'CREATE_SUCCESS': 
            return { ...state, loadingCreate: false };
        case 'CREATE_FAIL':
            return { ...state, loadingCreate: false };
        default: 
            return state;
    }
}


function CreateCategoryAdminPage() {

    const [{ loadingCreate }, dispatch] = useReducer(reducer, {
        loadingCreate: false,
    });

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

    // Feature Create a new Category
    const onSubmitFormAddCategory = async (values) => {
        dispatch({ type: 'CREATE_REQUEST'});
        const {
            nameCategory,
            title,
            typeCategory,
        } = values;

        const slugNameCategory = toSlugName(nameCategory);
        const slugTitle = toSlugName(title);
        try {
            await axios.post(`/api/admin/categories`, {
                nameCategory,
                title,
                typeCategory,
                slugNameCategory,
                slugTitle,
            });

            setTimeout(() => {
                dispatch({ type: 'CREATE_SUCCESS'})
            }, 500);

            notification.success({
                message: 'Thông báo',
                description: `Bạn vừa thêm danh mục thành công`
            });

            // reset input values
            form.resetFields(['nameCategory']);
            form.resetFields(['title']);
            form.resetFields(['typeCategory']);
        } catch (error) {
            dispatch({ type: 'CREATE_FAIL' });
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            })
        }
    };

    return (
        <>
            <h1 className="text-[18px] capitalize text-gray-700 font-semibold !my-4">
                Thêm danh mục
            </h1>
            <Form
                name="form-create-category"
                className="form-create-category bg-white !py-10 !px-8 !mt-4 !rounded-lg space-y-2 !shadow-lg"
                form={form}
                {...layout}
                initialValues={{
                    remember: true
                }}
                onFinish={onSubmitFormAddCategory}
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
                                message: 'Tên danh mục không được để trống!'
                            },
                        ]}
                        hasFeedback
                    >
                        <Input
                            type="text"
                            min={0}
                            max={200}
                            placeholder="Name category"
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
                            },
                        ]}
                        hasFeedback
                    >
                        <Input
                            type="text"
                            min={0}
                            max={200}
                            placeholder="Name sub title"
                            className="!py-2.5 !px-4 !rounded-md placeholder:!text-gray-500"
                        />
                    </Form.Item>
                </div>
                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Phân loại:
                    </h3>
                    <Form.Item
                        name="typeCategory"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn loại danh mục!'
                            },
                        ]}
                        hasFeedback
                    >
                        <Radio.Group>
                            <Radio value='Nam'>Nam</Radio>
                            <Radio value='Nữ'>Nữ</Radio>
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
                            {loadingCreate ? (
                                <div className="flex items-center gap-x-2">
                                    <p>Đang tải...</p>
                                    <Loading3QuartersOutlined className="animate-spin" />
                                </div>
                            ) : (
                                <p>Thêm danh mục</p>
                            )}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}

export default CreateCategoryAdminPage;
