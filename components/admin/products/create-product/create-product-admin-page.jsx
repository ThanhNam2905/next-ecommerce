import { CameraOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, InputNumber, message, notification, Upload } from 'antd'
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useReducer, useState } from 'react'
import toSlugNameProduct from '../../../../utils/convertStringToSlugName';
import { getError } from '../../../../utils/getError';
import uploadListImageProduct from '../../../../utils/uploadListImagesProduct';

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
    const [{ loadingCreate, }, dispatch] = useReducer(reducer, {
        loadingCreate: false,
    });

    const initialState = {
        nameProduct: '',
        codeProduct: '',
        tagProduct: [],
        priceProduct: 0,
        brandProduct: '',
        soldOut: 0,
        description: '',
    };

    const [product, setProduct] = useState(initialState);
    const { priceProduct } = product;
    const [arrayListImagesProduct, setArrayListImagesProduct] = useState([]);

    // Antd Form.
    const [form] = Form.useForm();
    form.setFieldValue({
        priceProduct: priceProduct
    })
    const layout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };
    const { TextArea } = Input;

    const handleChangeProductPrice = async (value) => {
        await setProduct({ ...product, priceProduct: value })
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

    const handleChangeUploadImageProduct = async ({ fileList: newFileList }) => {
        newFileList.forEach(file => {
            if (file.originFileObj.size > 1024 * 1024) {
                return message.error({
                    content: 'K??ch th?????c h??nh ???nh l???n nh???t l?? 1mb',
                    className: 'customize__antd--message-error'
                })
            }
            if (file.originFileObj.type !== "image/jpeg" && file.originFileObj.type !== "image/png" && file.originFileObj.type !== "image/jpg") {
                return message.error({
                    content: '?????nh d???ng t???p h??nh ???nh kh??ng ch??nh x??c.',
                    className: 'customize__antd--message-error'
                })
            }
        })
        await setArrayListImagesProduct(newFileList)
    }

    // Feature Create a new Product
    const onSubmitFormAddProduct = async (values) => {
        dispatch({ type: 'CREATE_REQUEST' });
        const {
            nameProduct,
            codeProduct,
            brandProduct,
            description,
            priceProduct,
            tagProduct,
        } = values;

        const slugProduct = toSlugNameProduct(nameProduct);

        let arrayListImg = [];
        if (arrayListImagesProduct.length > 0) {
            arrayListImg = await uploadListImageProduct(arrayListImagesProduct);
        }

        try {
            await axios.post(`/api/admin/products`, {
                nameProduct,
                slugProduct,
                codeProduct,
                brandProduct,
                description,
                priceProduct,
                tagProduct,
                arrayListImg: [ ...arrayListImg],
            });

            setTimeout(() => {
                dispatch({ type: 'CREATE_SUCCESS' });
            }, 500);
            
            notification.success({
                message: 'Th??ng b??o',
                description: `B???n v???a th??m s???n ph???m th??nh c??ng`
            });
            router.push('/admin/products')
        } catch (error) {
            dispatch({ type: 'CREATE_FAIL' });
            notification.error({
                message: 'Th??ng b??o',
                description: getError(error)
            });
        }

        // reset input values
        form.resetFields(['nameProduct']);
        form.resetFields(['codeProduct']);

        form.resetFields(['brandProduct']);
        form.resetFields(['tagProduct']);
        form.resetFields(['description']);
        await form.setFieldValue({
            priceProduct: 0
        })
        await setArrayListImagesProduct([]);
    }

    return (
        <>
            <h2 className='text-[19px] text-center !mt-2 !mb-4 capitalize'>Th??m m???i S???n ph???m</h2>
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
                <div className='flex gap-8'>
                    <Form.Item
                        style={{ width: "50%" }}
                        label="T??n s???n ph???m"
                        name="nameProduct"
                        rules={[
                            {
                                required: true,
                                message: 'T??n s???n ph???m kh??ng ???????c ????? tr???ng!',
                            },
                            {
                                unique: true,
                                message: 'T??n s???n ph???m kh??ng ???????c tr??ng nhau!',
                                warningOnly: true,
                            }
                        ]}
                        hasFeedback
                    >
                        <Input type="text" min={0} max={200} placeholder="Name product" className='!py-3 !px-4 !rounded-md' />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "50%" }}
                        label="M?? s???n ph???m"
                        name="codeProduct"
                        rules={[
                            {
                                required: true,
                                message: 'Code s???n ph???m kh??ng ???????c ????? tr???ng!',
                            },
                            {
                                unique: true,
                                message: 'Code s???n ph???m kh??ng ???????c tr??ng nhau!',
                                warningOnly: true,
                            }
                        ]}
                        hasFeedback
                    >
                        <Input type="text" min={0} max={200} placeholder="Code product" className='!py-3 !px-4 !rounded-md' />
                    </Form.Item>
                </div>

                <div className='flex gap-8'>
                    <Form.Item
                        style={{ width: "50%" }}
                        label="Gi?? ti???n s???n ph???m"
                        name="priceProduct"
                        initialValue={priceProduct}
                        rules={[
                            {
                                required: true,
                                message: 'Gi?? ti???n s???n ph???m kh??ng ???????c ????? tr???ng!',
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
                                <span>Th????ng hi???u s???n ph???m</span>
                            </div>
                        }
                        name="brandProduct"
                        rules={[
                            {
                                required: true,
                                message: 'Th????ng hi???u s???n ph???m kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input type="text" min={0} max={200} placeholder="Brand product" className='!py-3 !px-4 !rounded-md' />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        style={{ width: "100%" }}
                        label={
                            <div className='flex items-center gap-x-2'>
                                <span className='pt-2 inline-block text-[18px] text-red-500'>*</span>
                                <span>Tag s???n ph???m</span>
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
                        label="T???i ???nh l??n"

                        rules={[
                            {
                                required: arrayListImagesProduct.length === 0 ? true : false,
                                message: '???nh s???n ph???m kh??ng ???????c ????? tr???ng!',
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
                                multiple={true}
                            >
                                <Button
                                    type="dashed"
                                    className="!flex !items-center gap-x-2"
                                    icon={<CameraOutlined className="text-18" />}>
                                    T???i ???nh l??n
                                </Button>
                            </Upload>
                        </ImgCrop>
                        <p className="text-gray-400 text-14 text-center font-semibold mt-4">(Dung l?????ng t???i ??a c???a ???nh 1MB v?? ?????nh d???ng file: .PNG, .JPG, .JPEG)</p>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        style={{ width: "100%" }}
                        label="M?? t??? s???n ph???m"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'M?? t??? s???n ph???m kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                        hasFeedback
                    >
                        <TextArea showCount rows={5} maxLength={1000000} placeholder='Description product...'/>
                    </Form.Item>
                </div>

                <div className='pt-6'>
                    <Form.Item
                        style={{ width: "100%" }}
                    >
                        <Button type="primary" htmlType="submit" className='w-full !py-6 !flex items-center justify-center !text-lg'>

                            {
                                loadingCreate ? (
                                    <div className='flex items-center gap-x-2'>
                                        <p>??ang t???i...</p>
                                        <Loading3QuartersOutlined className='animate-spin' />
                                    </div>
                                )
                                    : (
                                        <p>Th??m s???n ph???m</p>
                                    )
                            }
                        </Button>
                    </Form.Item>
                </div>
            </Form>

        </>
    )
}
