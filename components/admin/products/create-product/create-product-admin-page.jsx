import { CameraOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Form,
    Input,
    InputNumber,
    message,
    notification,
    Upload
} from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useReducer, useState } from 'react';
import toSlugName from '../../../../utils/convertStringToSlugName';
import { getError } from '../../../../utils/getError';
import uploadListImageProduct from '../../../../utils/uploadListImagesProduct';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>
});
import EditorToolbar, { modules, formats } from '../../../shared/EditorToolbar';
import upLoadImage from '../../../../utils/upLoadImages';

function reducer(state, action) {
    switch (action.type) {
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

export default function CreateProductAdminPage() {
    const router = useRouter();
    const [{ loadingCreate }, dispatch] = useReducer(reducer, {
        loadingCreate: false
    });

    const initialState = {
        nameProduct: '',
        tagProduct: [],
        priceProduct: 0,
        brandProduct: '',
        descriptionProduct: ''
    };

    const [product, setProduct] = useState(initialState);
    const { priceProduct, descriptionProduct } = product;
    const [arrayListImagesProduct, setArrayListImagesProduct] = useState({});

    // Antd Form.
    const [form] = Form.useForm();
    form.setFieldValue({
        priceProduct: priceProduct
    });
    const layout = {
        labelCol: {
            span: 24
        },
        wrapperCol: {
            span: 24
        }
    };

    const handleChangeProductPrice = async (value) => {
        await setProduct({ ...product, priceProduct: value });
    };

    const onPreviewImgProduct = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handleChangeUploadImageProduct = async ({
        fileList: newFileList
    }) => {
        newFileList.forEach((file) => {
            if (file.originFileObj.size > 1024 * 1024) {
                return message.error({
                    content: 'Kích thước hình ảnh lớn nhất là 1mb',
                    className: 'customize__antd--message-error'
                });
            }
            if (
                file.originFileObj.type !== 'image/jpeg' &&
                file.originFileObj.type !== 'image/png' &&
                file.originFileObj.type !== 'image/jpg'
            ) {
                return message.error({
                    content: 'Định dạng tệp hình ảnh không chính xác.',
                    className: 'customize__antd--message-error'
                });
            }
        });
        await setArrayListImagesProduct(newFileList);
    };

    // Feature Create a new Product
    const onSubmitFormAddProduct = async (values) => {
        dispatch({ type: 'CREATE_REQUEST' });
        const { nameProduct, brandProduct, priceProduct, tagProduct } = values;

        const slugProduct = toSlugName(nameProduct);

       
        let imageProduct = {};
        if (Object.keys(arrayListImagesProduct).length > 0) {
            imageProduct = await upLoadImage(arrayListImagesProduct);
        }

        // console.log('values ===> ', values);
        // console.log('slugProduct ===> ', slugProduct);
        // console.log('descriptionProduct ===> ', descriptionProduct);
        // console.log('imageProduct ==> ', imageProduct);

        try {
            await axios.post(`/api/admin/products`, {
                nameProduct,
                slugProduct,
                brandProduct,
                priceProduct,
                tagProduct,
                imageProduct: [...imageProduct],
                descriptionProduct,
            });

            setTimeout(() => {
                dispatch({ type: 'CREATE_SUCCESS' });
            }, 500);

            notification.success({
                message: 'Thông báo',
                description: `Bạn vừa thêm sản phẩm thành công`
            });
            // reset input values
            form.resetFields(['nameProduct']);
            form.resetFields(['brandProduct']);
            form.resetFields(['tagProduct']);
            form.resetFields(['description']);

            await form.setFieldValue({
                priceProduct: 0
            });
            await setArrayListImagesProduct({});
            router.push('/admin/products');

        } catch (error) {
            dispatch({ type: 'CREATE_FAIL' });
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            });
        }
    };

    const ondescription = (value) => {
        setProduct({ ...product, descriptionProduct: value });
    };

    return (
        <>
            <h1 className="text-[18px] capitalize text-gray-700 text-left font-semibold !my-4">
                Thêm sản phẩm
            </h1>
            <Form
                name="form-create-product"
                className="form-create-product bg-white !py-6 !px-8 !mt-4 !rounded-lg space-y-2 !shadow-lg"
                form={form}
                {...layout}
                initialValues={{
                    remember: true
                }}
                onFinish={onSubmitFormAddProduct}
            >
                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Tên sản phẩm:
                    </h3>
                    <Form.Item
                        name="nameProduct"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Tên sản phẩm không được để trống!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            type="text"
                            min={0}
                            max={200}
                            placeholder="Name product"
                            className="!py-2.5 !px-4 !rounded-md placeholder:!text-gray-500"
                        />
                    </Form.Item>
                </div>

                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Giá tiền sản phẩm:
                    </h3>
                    <Form.Item
                        name="priceProduct"
                        style={{ width: '100%' }}
                        initialValue={priceProduct}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Giá tiền sản phẩm không được để trống!'
                            }
                        ]}
                        hasFeedback
                    >
                        <InputNumber
                            min={0}
                            max={999999999}
                            className="antd__inputnumber--customize !w-full !py-[3px] !pr-1 !pl-2 !rounded-md !ring-0"
                            formatter={(value) =>
                                `$ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                )
                            }
                            parser={(value) =>
                                value.replace(/\$ \s?|(,*)/g, '')
                            }
                            onChange={handleChangeProductPrice}
                        />
                    </Form.Item>
                </div>

                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Thương hiệu sản phẩm:
                    </h3>
                    <Form.Item
                        name="brandProduct"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Thương hiệu sản phẩm không được để trống!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            type="text"
                            min={0}
                            max={200}
                            placeholder="Brand product"
                            className="!py-2.5 !px-4 !rounded-md"
                        />
                    </Form.Item>
                </div>

                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Tag sản phẩm:
                    </h3>
                    <Form.Item style={{ width: '100%' }} name="tagProduct">
                        <Checkbox.Group className="flex space-x-3">
                            <Checkbox value="New">New</Checkbox>
                            <Checkbox value="Sale">Sale</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>

                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Upload ảnh sản phẩm:
                    </h3>
                    <Form.Item
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required:
                                    arrayListImagesProduct.length === 0
                                        ? true
                                        : false,
                                message: 'Ảnh sản phẩm không được để trống!'
                            }
                        ]}
                        hasFeedback
                    >
                        <ImgCrop rotate>
                            <Upload
                                listType="picture-card"
                                accept=".jpg, .png, .jpeg"
                                className="!flex !items-center !justify-center"
                                onChange={handleChangeUploadImageProduct}
                                onPreview={onPreviewImgProduct}
                                multiple={true}
                            >
                                <Button
                                    type="dashed"
                                    className="!flex !items-center gap-x-2"
                                    icon={
                                        <CameraOutlined className="text-18" />
                                    }
                                >
                                    Tải ảnh lên
                                </Button>
                            </Upload>
                        </ImgCrop>
                        <p className="text-gray-400 text-14 text-center font-semibold mt-4">
                            (Dung lượng tối đa của ảnh 1MB và định dạng file:
                            .PNG, .JPG, .JPEG)
                        </p>
                    </Form.Item>
                </div>

                <div className="!flex flex-col items-start justify-between gap-x-8">
                    <h3 className="!mb-5 text-[15px] font-normal capitalize">
                        Mô tả sản phẩm:
                    </h3>
                    <Form.Item
                        style={{ width: '100%' }}
                        name="descriptionProduct"
                        initialValue={descriptionProduct}
                    >
                        <EditorToolbar toolbarId={'t1'} />
                        <ReactQuill
                            theme="snow"
                            value={descriptionProduct}
                            onChange={ondescription}
                            placeholder={'Mô tả thông tin sản phẩm tại đây...'}
                            modules={modules('t1')}
                            formats={formats}
                            style={{ height: '450px' }}
                        />
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
                                <p>Thêm sản phẩm</p>
                            )}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
