import { CameraOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, InputNumber, message, notification, Upload } from 'antd'
import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react'
import toSlugName from '../../../../utils/convertStringToSlugName';
import { getError } from '../../../../utils/getError';
import uploadListImageProduct from '../../../../utils/uploadListImagesProduct';


function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
}

export default function EditProductAdminPage() {
    const router = useRouter();
    const { id } = router.query;

    // Antd Form
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const [{ loadingUpdate }, dispatch] =
        useReducer(reducer, {
            loadingUpdate: false,
        });

    const [product, setProduct] = useState({
        nameProduct: '',
        slugProduct: '',
        codeProduct: '',
        tagProduct: [],
        imagesProduct: [],
        priceProduct: 0,
        brandProduct: '',
        description: '',
    });

    const [arrayListImagesProduct, setArrayListImagesProduct] = useState([{

    }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const { data } = await axios.get(`/api/admin/products/${id}`);
                    await setProduct({
                        nameProduct: data.nameProduct,
                        slugProduct: data.slugProduct,
                        codeProduct: data.codeProduct,
                        tagProduct: data.tagProduct,
                        imagesProduct: data.imagesProduct,
                        priceProduct: data.priceProduct,
                        brandProduct: data.brandProduct,
                        description: data.description,
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

    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                nameProduct: product.nameProduct,
                codeProduct: product.codeProduct,
                tagProduct: product.tagProduct,
                priceProduct: product.priceProduct,
                brandProduct: product.brandProduct,
                description: product.description,
            });

            setArrayListImagesProduct(product.imagesProduct)

        }
    }, [form, product]);

    const handleChangeProductPrice = async (value) => {
        await form.setFieldsValue({
            priceProduct: value
        })
    }

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

    const handleChangeUploadImageProduct = async (files) => {
        const { file, fileList } = files;

        if (file.size > 1024 * 1024) {
            return message.error({
                content: 'Kích thước hình ảnh lớn nhất là 1mb',
                className: 'customize__antd--message-error'
            })
        }
        // if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg") {
        //     return message.error({
        //         content: 'Định dạng tệp hình ảnh không chính xác.',
        //         className: 'customize__antd--message-error'
        //     })
        // }

        if (id) {
            // Delete Image Product
            if (file && fileList.length > 0 && file.status === 'removed') {
                const newListImageProduct = [...arrayListImagesProduct];
                const index = newListImageProduct.findIndex(img => img.uid === file.uid);
                newListImageProduct.splice(index, 1);
                await setArrayListImagesProduct(newListImageProduct);
            }
            // Add Image Product
            await setArrayListImagesProduct(fileList);
        }
    }

    // Feature Submit Handler Edit Product
    const onSubmitFormEditProduct = async (values) => {
        // console.log(values);
        dispatch({ type: 'UPDATE_REQUEST' });
        const {
            nameProduct,
            codeProduct,
            priceProduct,
            brandProduct,
            tagProduct,
            description
        } = values;
        const slugProduct = toSlugName(values.nameProduct);

        let arrayListImg = [];
        const imgNewURL = arrayListImagesProduct.filter(img => !img.url);
        const imgOldURL = arrayListImagesProduct.filter(img => img.url);
        if (imgNewURL.length > 0) {
            arrayListImg = await uploadListImageProduct(imgNewURL);
        }

        try {
            await axios.put(`/api/admin/products/${id}`, {
                nameProduct,
                codeProduct,
                priceProduct,
                brandProduct,
                tagProduct,
                description,
                slugProduct,
                arrayListImg: [ ...imgOldURL, ...arrayListImg],
            });

            setTimeout(() => {
                dispatch({ type: 'UPDATE_SUCCESS' })
            }, 500);

            notification.success({
                message: 'Thông báo',
                description: `Bạn vừa chỉnh sửa sản phẩm thành công`
            });

            router.push('/admin/products');
        } catch (error) {
            dispatch({ type: 'UPDATE_FAIL' });
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            });
        }
    }

    return (
        <>
            <h2 className='text-[19px] text-center !mt-2 !mb-4 capitalize'>Chỉnh sửa Sản phẩm</h2>
            <Form
                name="form-edit-product"
                className="form-edit-product"
                form={form}
                {...layout}
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmitFormEditProduct}
            >
                <div className='flex gap-8'>
                    <Form.Item
                        style={{ width: "50%" }}
                        label="Tên sản phẩm"
                        name="nameProduct"
                        rules={[
                            {
                                required: true,
                                message: 'Tên sản phẩm không được để trống!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input type="text" min={0} max={200} className='!py-3 !px-4 !rounded-md' />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "50%" }}
                        label="Mã sản phẩm"
                        name="codeProduct"
                        rules={[
                            {
                                required: true,
                                message: 'Code sản phẩm không được để trống!',
                            },
                            {
                                unique: true,
                                message: 'Code sản phẩm không được trùng nhau!',
                                warningOnly: true,
                            }
                        ]}
                        hasFeedback
                    >
                        <Input type="text" min={0} max={200} className='!py-3 !px-4 !rounded-md' />
                    </Form.Item>
                </div>

                <div className='flex gap-8'>
                    <Form.Item
                        style={{ width: "50%" }}
                        label="Giá tiền sản phẩm"
                        name="priceProduct"

                        rules={[
                            {
                                required: true,
                                message: 'Giá tiền sản phẩm không được để trống!',
                            },
                        ]}
                        hasFeedback
                    >
                        <InputNumber
                            min={0}
                            max={999999999}
                            className='antd__inputnumber--customize !w-full !py-1 !pr-2 !rounded-md !ring-0'
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$ \s?|(,*)/g, '')}
                            onChange={handleChangeProductPrice} />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "50%" }}
                        label={
                            <div className='flex items-center gap-x-2'>
                                <span className='pt-2 inline-block text-[18px] text-red-500'>*</span>
                                <span>Thương hiệu sản phẩm</span>
                            </div>
                        }
                        name="brandProduct"
                        rules={[
                            {
                                required: true,
                                message: 'Thương hiệu sản phẩm không được để trống!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input type="text" min={0} max={200} className='!py-3 !px-4 !rounded-md' />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        style={{ width: "100%" }}
                        label={
                            <div className='flex items-center gap-x-2'>
                                <span className='pt-2 inline-block text-[18px] text-red-500'>*</span>
                                <span>Tag sản phẩm</span>
                            </div>
                        }
                        // render: (text) => <p className="text-center">{text}</p>
                        name="tagProduct"
                    >
                        <Checkbox.Group className="flex space-x-3">
                            <Checkbox value="New">New</Checkbox>
                            <Checkbox value="Sale">Sale</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        style={{ width: "100%" }}
                        label="Tải ảnh lên"

                        rules={[
                            {
                                required: arrayListImagesProduct.length === 0 ? true : false,
                                message: 'Ảnh sản phẩm không được để trống!',
                            },
                        ]}
                        hasFeedback
                    >
                        <ImgCrop rotate>
                            <Upload
                                listType="picture-card"
                                accept=".jpg, .png, .jpeg"
                                className='!flex !items-center !justify-center'
                                onChange={handleChangeUploadImageProduct}
                                onPreview={onPreviewImgProduct}
                                fileList={arrayListImagesProduct}
                                multiple={true}
                            >
                                <Button
                                    type="dashed"
                                    className="!flex !items-center gap-x-2"
                                    icon={<CameraOutlined className="text-18" />}>
                                    Tải ảnh lên
                                </Button>
                            </Upload>
                        </ImgCrop>
                        <p className="text-gray-400 text-14 text-center font-semibold mt-4">(Dung lượng tối đa của ảnh 1MB và định dạng file: .PNG, .JPG, .JPEG)</p>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        style={{ width: "100%" }}
                        label="Mô tả sản phẩm"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Mô tả sản phẩm không được để trống!',
                            },
                        ]}
                        hasFeedback
                    >
                        <TextArea showCount rows={5} maxLength={1000000} />
                    </Form.Item>
                </div>

                <div className='pt-6'>
                    <Form.Item
                        style={{ width: "100%" }}
                    >
                        <Button type="primary" htmlType="submit" className='w-full !py-6 !flex items-center justify-center !text-lg'>
                            {
                                loadingUpdate ? (
                                    <div className='flex items-center gap-x-2'>
                                        <p>Đang tải...</p>
                                        <Loading3QuartersOutlined className='animate-spin' />
                                    </div>
                                )
                                    : (
                                        <p>Chỉnh sửa sản phẩm</p>
                                    )
                            }
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    )
}
