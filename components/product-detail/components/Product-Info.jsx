import React, { useContext, useEffect, useState } from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/Store';
import { message, Radio, Tag, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const key = 'loadingAddProductToCart';

export default function ProductInfo({ product, productsDetail }) {
    const { dispatch } = useContext(StoreContext);

    const [quantity, setQuantity] = useState(1);
    const handlerChangeQuantity = async (value) => {
        if (quantity < 0) {
            await setQuantity(0);
        }
        else {
            await setQuantity(value);
        }
    };

    let listArrayColor = [];
    const renderListColors = productsDetail.filter((item) => {
        if (item.productId === product._id && !listArrayColor.includes(item.color)) {
            listArrayColor.push(item.color);
            return item;
        }
    });

    let listArraySize = [];
    const renderListSizes = productsDetail.filter((item) => {
        if (item.productId === product._id && !listArraySize.includes(item.size)) {
            listArraySize.push(item.size);
            return item;
        }
    });

    let listArrayCodeProduct = [];
    const renderListCodeProduct = productsDetail.filter((item) => {
        if (item.productId === product._id) {
            listArrayCodeProduct.push(item.size);
            return item;
        }
    });

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [codeProduct, setCodeProduct] = useState('');
    const [countOfStock, setCountOfStock] = useState(0);

    const onChangeSizes = (e) => {
        setSelectedSize(e.target.value);
        renderListCodeProduct.filter((item) => {
            if(item.size === e.target.value && item.color === selectedColor) {
                setCodeProduct(item.codeProduct);
            }
        })
    };

    useEffect(() => {
        if(selectedSize !== '' && selectedColor !== '') {
            productsDetail.filter(async (item) => {
                if(item.color === selectedColor && item.size === selectedSize) {
                    setCountOfStock(item.countOfStock)
                }
            })
        }
    }, [productsDetail, selectedColor, selectedSize]);

    const onChangeColors = (e) => {
        setSelectedColor(e.target.value);
        renderListCodeProduct.filter((item) => {
            if(item.color === e.target.value && item.size === selectedSize) {
                setCodeProduct(item.codeProduct);
            }
        })
    };

    // Features add Product to Cart
    const handleAddToCart = async (productId) => { 
        let discountPrice = 0;
        if (productsDetail.length > 0) {
            productsDetail.filter(item => {
                if (item.productId === productId
                    && item.color === selectedColor
                    && item.size === selectedSize) {
                    discountPrice = item.discountPrice;
                }
            }
            );
        }       
        dispatch({ 
            type: 'ADD_CART_ITEM', 
            payload: { 
                productId, 
                nameProduct: product.nameProduct,
                imagesProduct: product.imagesProduct[0].url,
                slugProduct: product.slugProduct,
                priceProduct: product.priceProduct,
                discountPrice: discountPrice,
                countOfStock: countOfStock,
                itemId : uuidv4(),
                quantity, 
                selectedSize, 
                selectedColor,
                codeProduct,
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
        }, 1000);
    }

    return (
        <>
            <div className='col-span-6'>
                <ul >
                    <li className='mb-3'>
                        <h2 className='text-[19px] !pt-2 font-semibold font-sans'>{product.nameProduct} - {codeProduct}</h2>
                    </li>
                    
                    <li className='mb-3'>
                        <p className='text-[15px] font-semibold'>
                            Thương hiệu sản phẩm: <span className='italic text-gray-500 font-semibold !ml-1.5'>{product.brandProduct}</span>
                        </p>
                    </li>
                    <li className='mb-3'>
                        <p className='text-[22px] font-bold font-nunito tracking-wider'>
                            {new Intl.NumberFormat('de-DE').format(product.priceProduct)}
                            <span className='text-[20px] underline underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                        </p>
                    </li>
                    <li className='mb-6'>
                        <p className='text-[15px] font-semibold !mb-4'>Chọn màu sắc:</p>
                        {   
                            renderListColors.length > 0 &&
                                <Radio.Group
                                    className='radio__customize--colors !flex !items-center gap-3'
                                    onChange={onChangeColors}>
                                    {
                                        renderListColors.map((item, index) => (
                                            <Radio.Button
                                                key={index}
                                                value={item.color}
                                                className='!w-[50px] !h-[50px] !border !p-[2px] !border-gray-400 !rounded'>
                                                    <Tooltip placement="bottom" color={item.subColor !== '#ffffff' ? item.subColor : 'gray'} title={item.color}>
                                                        <Tag key={item._id} color={item.subColor} className='w-full !h-full !rounded'></Tag>
                                                    </Tooltip>
                                            </Radio.Button>
                                        ))
                                    }
                                </Radio.Group>
                        }
                    </li>
                    <li className='mb-6'>
                        <p className='text-[15px] font-semibold !mb-4'>Chọn size:</p>
                        {renderListSizes.length > 0 &&
                            <Radio.Group
                                className='radio__customize--sizes !flex !items-center gap-5'
                                onChange={onChangeSizes}>
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
                    </li>
                    <li className='mb-4 flex items-end gap-x-7'>
                        <div>
                            <p className='text-[15px] font-semibold !mb-4'>Chọn số lượng:</p>
                            <div className='inline-flex items-center h-[52px] rounded border border-gray-500'>
                                <button
                                    className='h-full w-[44px] flex items-center justify-center cursor-pointer text-[41px] font-semibold -mt-2'
                                    disabled={quantity === 1 ? true : false}
                                    onClick={() => setQuantity(quantity - 1)}>
                                    -
                                </button>
                                <input
                                    type="number" name="quantity" id="quantity"
                                    className='rounded-none h-full border-none w-[50px] text-xl font-semibold text-center focus:outline-none focus:ring-0'
                                    value={quantity}
                                    onChange={(e) => handlerChangeQuantity(Number(e.target.value))} />
                                <button
                                    className='h-full w-[44px] flex items-center justify-center cursor-pointer text-[24px] font-bold'
                                    onClick={() => setQuantity(quantity + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='w-[55%]'>
                            <button
                                className='btn btn__primary--index w-full h-[52px] uppercase !font-bold flex items-center justify-center gap-x-3'
                                type='button'
                                onClick={() => handleAddToCart(product._id)}>
                                <ShoppingOutlined className='text-xl' />
                                Mua ngay
                            </button>
                        </div>
                    </li>
                    <li>
                        { 
                            countOfStock > 0 ? (
                                <p className='text-[13px] text-gray-600 font-semibold'>Còn lại: {countOfStock} sản phẩm</p>
                            ) : ''
                        }
                    </li>
                </ul>
                
            </div>
        </>
    )
}
