import React, { useContext, useState } from 'react';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/Store';
// import { message, Radio, Tag, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';

const key = 'loadingAddProductToCart';

export default function ProductInfo({ product }) {

    const { state, dispatch } = useContext(StoreContext);
    const {
        cart: { cartItems }
    } = state;
    console.log(cartItems);

    const [quantity, setQuantity] = useState(1);
    const handlerChangeQuantity = async (value) => {
        if (quantity < 0) {
            await setQuantity(0);
        }
        else {
            await setQuantity(value);
        }
    };

    // let listArrayColor = [];
    // const renderListColors = productsDetail.filter((item) => {
    //     if (item.productId === product._id && !listArrayColor.includes(item.color)) {
    //         listArrayColor.push(item.color);
    //         return item;
    //     }
    // });

    // let listArraySize = [];
    // const renderListSizes = productsDetail.filter((item) => {
    //     if (item.productId === product._id && !listArraySize.includes(item.size)) {
    //         listArraySize.push(item.size);
    //         return item;
    //     }
    // });

    // let listArrayCodeProduct = [];
    // const renderListCodeProduct = productsDetail.filter((item) => {
    //     if (item.productId === product._id) {
    //         listArrayCodeProduct.push(item.size);
    //         return item;
    //     }
    // });

    // const [selectedSize, setSelectedSize] = useState(renderListSizes[0].size);
    // const [selectedColor, setSelectedColor] = useState(renderListColors[0].color);
    // const [codeProduct, setCodeProduct] = useState(renderListCodeProduct[0].codeProduct);

    // const onChangeSizes = (e) => {
    //     setSelectedSize(e.target.value);
    //     renderListCodeProduct.filter((item) => {
    //         if(item.size === e.target.value && item.color === selectedColor) {
    //             setCodeProduct(item.codeProduct);
    //         }
    //     })
    // };
    // const onChangeColors = (e) => {
    //     setSelectedColor(e.target.value);
    //     renderListCodeProduct.filter((item) => {
    //         if(item.color === e.target.value && item.size === selectedSize) {
    //             setCodeProduct(item.codeProduct);
    //         }
    //     })
    // };

    // Features add Product to Cart
    const handleAddToCart = async (idProduct) => {
        const existItem = cartItems.find((x) => x.idProduct === idProduct);
        const quantityItem = existItem ? existItem.quantityItem + quantity : quantity;
        const idItemCart = uuidv4();

        //  get Product with id
        // const { data } = await axios.get(`/api/products/${product._id}`);
        // if (data.countInStock < quantityItem) {
        //     return message.error({
        //         content: "Xin lỗi, sản phẩm này đã hết hàng",
        //         className: 'customize__antd--message-error'
        //     });
        // }

        // state.cart => existItem true => +/- , false : add_new_item
        dispatch({ 
            type: 'ADD_CART_ITEM', 
            payload: { 
                idProduct, 
                quantityItem, 
                // selectedSize, 
                // selectedColor,
                idItemCart,
            } 
        });

        message.loading({
            content: 'Đang tải...',
            className: 'customize__antd--message-loading',
            key,
        });
        setTimeout(() => {
            message.success({
                content: 'Thêm sản phẩm vào giỏ hàng thành công',
                key,
                className: 'customize__antd--message-success',
                duration: 5,
            });
        }, 1500);
    }

    // console.log(productsDetail);
    // console.log(renderListCodeProduct);
    // console.log(renderListSizes);

    return (
        <>
            <div className='col-span-4'>
                <ul >
                    <li className='mb-3'>
                        <h2 className='text-[24px] font-semibold font-sans'>{product.nameProduct}</h2>
                    </li>
                    <li className='mb-3'>
                        <p className='text-[14px] uppercase font-semibold'>
                            Mã sản phẩm: <span className='italic text-gray-500 font-semibold !ml-1.5'>{product.codeProduct}</span>
                        </p>
                    </li>
                    <li className='mb-3'>
                        <p className='text-[14px] uppercase font-semibold'>
                            Thương hiệu sản phẩm: <span className='italic text-gray-500 font-semibold !ml-1.5'>{product.brandProduct}</span>
                        </p>
                    </li>
                    <li className='mb-3'>
                        <p className='text-[14px] uppercase font-semibold'>
                            Đánh giá:
                            <span className='italic text-gray-500 font-semibold !ml-1.5'>of reviews</span>
                        </p>
                    </li>
                    <li className='mb-4'>
                        <p className='text-[22px] font-bold font-nunito text-red-500'>
                            {new Intl.NumberFormat('vn-VN').format(product.priceProduct)}
                            <sup className='inline-block ml-1.5 !mt-0'>đ</sup>
                        </p>
                    </li>
                    {/* <li className='mb-8'>
                        <p className='text-[14px] uppercase font-semibold !mr-2'>Màu sắc:</p>
                        {   
                            renderListColors.length > 0 &&
                                <Radio.Group
                                    className='radio__customize--colors !flex !items-center gap-3 !mt-3'
                                    onChange={onChangeColors}
                                    defaultValue={renderListColors[0].color}>
                                    {
                                        renderListColors.map((item, index) => (
                                            <Radio.Button
                                                key={index}
                                                value={item.color}
                                                className='!w-[50px] !h-[50px] !border-2 !p-[2px] !border-gray-400 !rounded'>
                                                    <Tooltip placement="bottom" color={item.subColor !== '#ffffff' ? item.subColor : 'gray'} title={item.color}>
                                                        <Tag key={item._id} color={item.subColor} className='w-full !h-full !rounded'></Tag>
                                                    </Tooltip>
                                            </Radio.Button>
                                        ))
                                    }
                                </Radio.Group>
                        }
                        
                    </li>
                    <li className='mb-8'>
                        <p className='text-[14px] uppercase font-semibold !mr-2'>Kích thước:</p>
                        {renderListSizes.length > 0 &&
                            <Radio.Group
                                className='radio__customize--sizes !flex !items-center gap-3 !mt-3'
                                onChange={onChangeSizes}
                                defaultValue={renderListSizes[0].size}>
                                {
                                    renderListSizes.map((item) => (
                                        <Radio.Button
                                            key={item._id}
                                            value={item.size}>
                                                {item.size}
                                        </Radio.Button>
                                    ))
                                }
                            </Radio.Group>
                        }
                    </li> */}
                    <li className='mb-8'>
                        <p className='text-[14px] uppercase font-semibold !mr-2'>Số lượng:</p>
                        <div className='flex items-center h-10 mt-3'>
                            <button
                                className='bg-gray-200 h-full w-10 flex items-center justify-center rounded-tl-md rounded-bl-md'
                                disabled={quantity === 1 ? true : false}
                                onClick={() => setQuantity(quantity - 1)}>
                                <MinusOutlined className='text-[12px]' />
                            </button>
                            <input
                                type="number" name="quantity" id="quantity"
                                className='rounded-none h-full w-[72px] text-center focus:outline-none focus:ring-0 focus:ring-gray-400'
                                value={quantity}
                                onChange={(e) => handlerChangeQuantity(Number(e.target.value))} />
                            <button
                                className='bg-gray-200 h-full w-10 flex items-center justify-center rounded-tr-md rounded-br-md'
                                onClick={() => setQuantity(quantity + 1)}>
                                <PlusOutlined className='text-[13px]' />
                            </button>
                        </div>
                    </li>
                </ul>
                <div className='mt-5'>
                    <button
                        className='btn btn--primary px-5 py-2.5 uppercase flex items-center gap-x-2'
                        type='button'
                        onClick={() => handleAddToCart(product._id)}>
                        <ShoppingCartOutlined className='text-base -mt-1' />
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </>
    )
}
