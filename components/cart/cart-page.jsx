import React, { useContext } from 'react'
import { ShoppingOutlined, CloseOutlined } from '@ant-design/icons'
import Link from 'next/link';
import Image from 'next/image'
import { StoreContext } from '../../store/Store';
import { Popconfirm, message } from 'antd';
import { useRouter } from 'next/router';

const key = 'loadingRemoveItemCart';

export default function CartPage({ productsDetail }) {

    const { state, dispatch } = useContext(StoreContext);
    const router = useRouter();

    const {
        cart: { cartItems }
    } = state;

    // Hanlde event user remove item in Cart
    function handleRemoveItemProduct(itemId) {
        dispatch({ type: 'REMOVE_ITEM_CART', payload: itemId });
        message.loading({
            content: 'Đang tải...',
            className: 'customize__antd--message-loading',
            key,
        });
        setTimeout(() => {
            message.success({
                content: 'Xoá sản phẩm thành công',
                key,
                className: 'customize__antd--message-success',
                duration: 5,
            });
        }, 1000);
    }

    const handleUpdateQuantityInCart = async() => {
        console.log('cartItemsUpdateQty ==>', cartItems);
        dispatch({ type: 'UPDATE_QUANTITY_ITEM_CART', payload: { cartItems } });
        message.loading({
            content: 'Đang tải...',
            className: 'customize__antd--message-loading',
            key,
        });
        setTimeout(() => {
            message.success({
                content: 'Giỏ hàng của bạn đã cập nhật thành công',
                key,
                className: 'customize__antd--message-success',
                duration: 3,
            });
        }, 1500);
    }

    const handlerIncreaseQuantity = (itemId) => {
        dispatch({ type: 'INCREASE_QTY_ITEM_CART', payload: itemId})
    }

    const handlerDecreaseQuantity = (itemId) => {
        dispatch({ type: 'DECREASE_QTY_ITEM_CART', payload: itemId})
    }

    const handlerChangeQuantity = async (value) => {
        console.log('value change qty ===> ', value);
    };


    return (
        <div className='my-16'>
            {/* Breadcrumbs component */}
            <div className='mt-2 mb-6 flex items-center justify-center gap-x-2 '>
                <Link href={"/"}>
                    <h2 title='Trang chủ' className='text-lg cursor-pointer hover:text-amber-500 text-stone-600' >
                        Trang chủ
                    </h2>
                </Link>
                <p className='text-xl'>/</p>
                <h2 className='text-lg text-stone-800'>Giỏ hàng</h2>
            </div>

            <div className='my-4'>
                <div className='flex items-center gap-x-4 text-2xl mb-4'>
                    <ShoppingOutlined />
                    <h5 className='font-bold'>Giỏ hàng</h5>
                </div>
                <p className='text-base font-semibold'>
                    {cartItems.reduce((a, c) => a + c.quantity, 0) > 0 ? cartItems.reduce((a, c) => a + c.quantity, 0): 0}  sản phẩm
                </p>
            </div>
            {
                cartItems.length === 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <Image
                            src="/images/cart-empty.png"
                            alt="cart-empty"
                            width={350}
                            height={250}
                        />

                        <p className='!mt-6 !mb-3 text-xl font-nunito font-bold'>Hiện chưa có sản phẩm</p>

                        <Link href={"/"}>
                            <a>Tiếp tục mua sắm.</a>
                        </Link>
                    </div>
                ) : (
                    <div className='w-full my-2 grid grid-cols-12 gap-x-10'>
                        <div className='col-span-8'>
                            {cartItems.map((item, index) => (
                                <div className='flex justify-between gap-x-5 mt-5 mb-10' key={index}>
                                    <div className='flex gap-x-5'>
                                        <div >
                                            <Image
                                                src={item.imagesProduct}
                                                alt={item.nameProduct}
                                                width={155}
                                                height={165}
                                                className='bg-gray-200 !p-4 rounded-sm'
                                            />
                                        </div>

                                        <div className='mt-2 space-y-1.5'>
                                            <Link href={`/product/${item.slugProduct}`}>
                                                <a className='text-[16px] uppercase hover:underline hover:underline-offset-2 hover:decoration-[1px] transition ease-linear duration-300'>{item.nameProduct} - <span className='italic'>{item.codeProduct}</span> </a>
                                            </Link>
                                            <div className='flex items-center gap-x-5 text-[14px] capitalize text-slate-600'>
                                                <p className='font-medium'>Màu: {item.selectedColor} </p>
                                                <p className='font-medium'>Size: {item.selectedSize} </p>
                                            </div>
                                            <div className='flex items-center gap-x-7 text-[15px] font-bold'>
                                                {
                                                    item.discountPrice > 0 ? (
                                                        <>
                                                            <p className='text-[16px]'>{new Intl.NumberFormat('de-DE').format((item.priceProduct * (100 - item.discountPrice) / 100))}
                                                                <span className='underline underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                                                            </p>
                                                            <p className='line-through decoration-[1.5px] text-[13px] text-gray-500'>{new Intl.NumberFormat('de-DE').format(item.priceProduct)}
                                                                <span className='!ml-0.5'>đ</span>
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <p>{new Intl.NumberFormat('de-DE').format(item.priceProduct)}
                                                            <span className='underline underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                                                        </p>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                {/* <Select
                                                    size='middle'
                                                    defaultValue={item.quantity}
                                                    onChange={(value) => handleChangeQuantityItem(value, item.itemId)}
                                                    dropdownStyle={{
                                                        textAlign: 'center'
                                                    }}
                                                    popupClassName='customize__popup-antd'
                                                    className='antd-select__customize--quantity'
                                                >
                                                    {children}
                                                </Select> */}
                                                <div className='flex items-center justify-between w-24 border border-gray-400 h-8 !my-2 px-2'>
                                                        <button
                                                            className='text-[28px]  font-semibold -mt-1.5'
                                                            onClick={() => handlerIncreaseQuantity(item.itemId)}
                                                            disabled={item.quantity === 1 ? 'disabled' : ''}>-
                                                        </button>
                                                        <input
                                                            type="number" name="quantityItemCart" id="quantityItemCart"
                                                            className='rounded-sm h-full w-1/2 text-center border-none font-semibold focus:outline-none focus:ring-0'
                                                            value={item.quantity}
                                                            onChange={(e) => handlerChangeQuantity(Number(e.target.value))} />
                                                        <button
                                                            className='text-[18px] font-bold'
                                                            onClick={() => handlerDecreaseQuantity(item.itemId)}>+
                                                        </button>
                                                    </div>
                                                </div>
                                            <div>
                                                <p className=' font-semibold'>
                                                    Tổng tiền:
                                                    {
                                                        item.discountPrice > 0 ? (
                                                                <>
                                                                    <span className='text-[15px] font-bold inline-block !ml-2'>{new Intl.NumberFormat('de-DE').format(item.quantity * (item.priceProduct * (100 - item.discountPrice) / 100))}</span>
                                                                    <span className='underline font-bold !ml-1'>đ</span>
                                                                </>
                                                        ) : (
                                                            <>
                                                                <span className='text-[15px] font-bold inline-block !ml-2'>{new Intl.NumberFormat('de-DE').format(item.quantity * item.priceProduct)}</span>
                                                                <span className='underline font-bold !ml-1'>đ</span>
                                                            </>
                                                        )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Popconfirm
                                            title="Bạn xác nhận muốn xoá sản phẩm này khỏi giỏ hàng?"
                                            onConfirm={() => handleRemoveItemProduct(item.itemId)}
                                            okText="Có"
                                            cancelText="Huỷ bỏ">
                                            <CloseOutlined className='w-6 h-6 flex justify-end items-center cursor-pointer hover:text-red-500' />
                                        </Popconfirm>
                                    </div>
                                </div>
                            )
                            )}
                            <div>
                                <button 
                                    className='btn float-right uppercase border font-bold border-gray-900 py-3 px-20 rounded-sm'
                                    onClick={handleUpdateQuantityInCart}
                                >
                                    Cập nhật giỏ hàng
                                </button>
                            </div>
                        </div>
                        <div className='col-span-4'>
                            <div className='w-full bg-gray-100 pt-9 pb-14 px-7'>
                                <h6 className='font-bold'>NHẬP MÃ COUPON ƯU ĐÃI</h6>
                                <p className='text-[12px] !mt-1.5 !mb-3 text-gray-600 font-nunito font-light'>Chỉ sử dụng 1 mã cho 1 đơn hàng</p>
                                <div>
                                    <input type="text" className='text-[14px] w-4/6 border-gray-300 rounded font-medium placeholder:text-gray-500/80 focus:ring-0' placeholder='Nhập mã giảm giá' />
                                    <button className='btn uppercase ml-3 font-bold'>Áp dụng</button>
                                </div>
                            </div>
                            <div className='mt-10 border border-gray-300 shadow-md py-8 px-7 rounded-sm'>
                                <p className='font-bold uppercase'>Tạm tính</p>
                                <ul className='space-y-3 text-[14px] mt-3 mb-5 font-normal text-gray-700'>
                                    <li className='flex items-center justify-between'>
                                        <p>Số lượng sản phẩm</p>
                                        <p className='font-medium'>{cartItems.reduce((a, c) => a + c.quantity, 0)}</p>
                                    </li>
                                    <li className='flex items-center justify-between'>
                                        <p>Tạm tính</p>
                                        <p className='font-medium'>
                                            {new Intl.NumberFormat('de-DE').format(cartItems.reduce((a, c) => a + c.quantity * (c.priceProduct * (100 - c.discountPrice) / 100), 0))}
                                            <span className='underline underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                                        </p>
                                    </li>
                                    <li className='flex items-center justify-between'>
                                        <p>Giảm giá</p>
                                        <p className='font-medium'>
                                            0
                                            <span className='underline underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                                        </p>
                                    </li>
                                </ul>
                                <div className='mt-6 border-t border-gray-300 pt-5 space-y-4'>
                                    <li className='flex items-center justify-between mb-4'>
                                        <p className='text-[16px] font-semibold'>Tổng số</p>
                                        <p className='text-[18px] font-bold'>
                                            {new Intl.NumberFormat('de-DE').format(cartItems.reduce((a, c) => a + c.quantity * (c.priceProduct * (100 - c.discountPrice) / 100), 0))}
                                            <span className='underline underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                                        </p>
                                    </li>
                                    <button
                                        type='button' className='btn btn__primary--index py-2.5 font-medium text-[14px] w-full uppercase rounded'
                                        onClick={() => router.push('login?redirect=/order')}>
                                        Thanh toán
                                        <span className='!ml-1.5'>
                                            {new Intl.NumberFormat('de-DE').format(cartItems.reduce((a, c) => a + c.quantity * (c.priceProduct * (100 - c.discountPrice) / 100), 0))}
                                            <span className='underline lowercase underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                                        </span>
                                    </button>
                                    <button
                                        type='button' className='btn btn--default py-2.5 font-medium text-[14px] w-full uppercase rounded'
                                        onClick={() => router.push('/')}>
                                        Tiếp tục mua sắm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
