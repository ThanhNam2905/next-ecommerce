import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserOutlined, DownOutlined, LogoutOutlined, IdcardOutlined, LoadingOutlined, ShoppingOutlined, BarChartOutlined, CloseOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/Store';
import { signOut, useSession } from 'next-auth/react';
import { Badge, Drawer, Dropdown, Menu, message, Popconfirm, Space, Spin } from 'antd';
import DropDownItem from '../../shared/dropdown-item';
import Cookies from 'js-cookie'
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

const key = 'loadingRemoveItemCart';

function Header() {
    const router = useRouter();
    const { state, dispatch } = useContext(StoreContext);
    const { cart } = state;
    const { cartItems } = cart;
    const { status, data: session } = useSession();
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUserData = async () => {
            if (session) {
                const { data } = await axios.get(`/api/user/${session._id}`);
                setUser(data);
            }
        }
        getUserData();
    }, [session]);

    // Handler Event when User Logout.
    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
        Cookies.remove('cart');     // remove cart in Cookies.
        dispatch({ type: 'CLEAR_CART_ITEMS' })     // reset objects in cart(cartItems, shippingAddress, paymentMethod) in Store.js
        message.success({
            content: 'Bạn đã đăng xuất thành công',
            className: 'customize__antd--message-success'
        })
    }

    const menuUser = (
        <Menu
            className='dropdown-user-profile !space-y-1'
            items={[
                {
                    label:
                        <DropDownItem href="/user-profile" className='dropdown-link'>
                            <IdcardOutlined />
                            Thông tin tài khoản
                        </DropDownItem>,
                    key: '0',
                },
                {
                    label:
                        <DropDownItem href="/order-history" className='dropdown-link'>
                            <ShoppingOutlined />
                            Đơn hàng của tôi
                        </DropDownItem>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label:
                        <a
                            className='dropdown-link'
                            href='#'
                            onClick={handleLogout}>
                            <LogoutOutlined />
                            <span>Đăng xuất</span>
                        </a>,
                    key: '3',
                },
            ]}
        />
    );
    const menuAdmin = (
        <Menu
            className='dropdown-user-profile !space-y-1'
            items={[
                {
                    label:
                        <DropDownItem href="/user-profile" className='dropdown-link'>
                            <IdcardOutlined />
                            Thông tin tài khoản
                        </DropDownItem>,
                    key: '0',
                },
                {
                    label:
                        <DropDownItem href="/admin/dashboard" className='dropdown-link'>
                            <BarChartOutlined />
                            Admin Dashboard
                        </DropDownItem>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label:
                        <a
                            className='dropdown-link'
                            href='#'
                            onClick={handleLogout}>
                            <LogoutOutlined />
                            <span>Đăng xuất</span>
                        </a>,
                    key: '3',
                },
            ]}
        />
    );

    const [openCart, setOpenCart] = useState(false);
    const showDrawerCart = () => {
        setOpenCart(true);
    };
    const closeDrawerCart = () => {
        setOpenCart(false);
    };

    const handlerChangeQuantity = async (value) => {
        console.log('value change qty ===> ', value);
    };

    const handlerIncreaseQuantity = (itemId) => {
        dispatch({ type: 'INCREASE_QTY_ITEM_CART', payload: itemId});
    }

    const handlerDecreaseQuantity = (itemId) => {
        dispatch({ type: 'DECREASE_QTY_ITEM_CART', payload: itemId})
    }

    const handleRemoveItemProduct = (itemId) => {
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

    return (
        <>
            <header>
                <div className='flex items-center justify-between h-20 px-20 shadow-md'>
                    <div className="logo">
                        <Link href="/" passHref legacyBehavior>
                            <a>
                                <Image
                                    src='https://res.cloudinary.com/nam290596/image/upload/v1679468426/next-store-fashion/logo-shop-10_pqnlwu.png'
                                    alt='logo image'
                                    width={125}
                                    height={50}
                                    className='cursor-pointer'
                                />
                            </a>
                        </Link>
                    </div>
                    <nav className='flex items-center gap-x-7'>
                        <div>

                            {
                                status === 'loading' ? (<Spin indicator={antIcon} />) :
                                    session?.user ? (
                                        <Dropdown
                                            overlay={user.isAdmin ? menuAdmin : menuUser}
                                            trigger={['click']}
                                            placement="topLeft"
                                        >
                                            <a
                                                className='group flex items-center justify-center'
                                                onClick={(e) => e.preventDefault()}>
                                                <Space className='!gap-x-1.5 !gap-y-0 space-customize--css'>
                                                    <span className='text-lg group-hover:!text-amber-500 transition ease-linear duration-300'>{session.user.name}</span>
                                                    <DownOutlined className='text-[12px] !mt-1 group-hover:text-amber-500 transition ease-linear duration-300' />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    ) : (
                                        <Link href='/login'>
                                            <a className="flex items-center gap-x-1.5 group" title='Đăng nhập'>
                                                <UserOutlined className='text-lg -mt-1 mr-1 group-hover:text-amber-500 transition ease-linear duration-300' />
                                                <span className='text-lg group-hover:text-amber-500 transition ease-linear duration-300'>Đăng nhập</span>
                                            </a>
                                        </Link>
                                    )
                            }

                        </div>

                        <div className="flex items-center relative hover:cursor-pointer" title='Giỏ hàng' onClick={showDrawerCart}>
                            <ShoppingOutlined className="text-2xl -mt-1.5 mr-4" />
                            <Badge 
                                count={cartItems.reduce((a, c) => a + c.quantity, 0) > 0
                                ? cartItems.reduce((a, c) => a + c.quantity, 0)
                                : 0} 
                                overflowCount={99} 
                                className='absolute -top-2 right-2.5'>
                            </Badge>
                        </div>
                    </nav>
                </div>
            </header>
            <Drawer
                title={(
                    <>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-x-3'>
                                <ShoppingOutlined className='text-[26px]' />
                                <h4 className='text-lg font-bold'>Giỏ hàng</h4>
                            </div>
                            <button>
                                <CloseOutlined className='btn--close text-[22px]' onClick={closeDrawerCart} />
                            </button>
                        </div>
                        <p className='text-[15px] font-semibold !mt-8'>
                            {cartItems.reduce((a, c) => a + c.quantity, 0) > 0
                                ? cartItems.reduce((a, c) => a + c.quantity, 0)
                                : 0} sản phẩm
                        </p>
                    </>
                )}
                footer={(
                    <>
                        <div className='flex items-center justify-between text-[15px]'>
                            <h4>Tổng tiền:</h4>
                            <p className='text-[20px] tracking-wider font-bold'>
                                {new Intl.NumberFormat('de-DE').format(cartItems.reduce((a, c) => a + c.quantity * (c.priceProduct * (100 - c.discountPrice) / 100), 0))}
                                <span className='text-[18px] underline underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                            </p>
                        </div>
                        <div className='flex items-center justify-between my-4 gap-x-4'>
                            <button
                                className='btn btn--default flex-1 py-3 uppercase text-[16px] rounded-none'
                                onClick={() => router.push('/cart')}>Xem giỏ hàng
                            </button>
                            <button className='btn btn--primary flex-1 py-3 uppercase text-[16px] rounded-none'>Thanh toán</button>
                        </div>
                    </>
                )}
                footerStyle={{
                    padding: '1rem 3rem',
                    borderBottom: '1px solid #b7b7b7'
                }}
                headerStyle={{
                    padding: '2.2rem 3rem 1rem',
                    borderBottom: 'none'
                }}
                bodyStyle={{
                    padding: '1rem 3rem 2rem',
                }}
                className='antd__drawer-cart'
                placement="right"
                onClose={closeDrawerCart}
                open={openCart}
                closable={false}
                width='32%'
            >
                <section>
                    <div >
                        {
                            cartItems.length > 0 ? (
                                <div className='w-full mt-0 space-y-8'>
                                    {
                                        cartItems.map((item, index) => (
                                            <div key={index} className='flex items-start justify-between gap-x-4'>
                                                <div className=''>
                                                    <Image
                                                        src={item.imagesProduct}
                                                        alt={item.nameProduct}
                                                        width={120}
                                                        height={150}
                                                        className='bg-gray-200 object-center object-contain rounded-sm !p-2'
                                                    />
                                                </div>

                                                <div className='flex-1 space-y-1'>
                                                    <Link href={`/product/${item.slugProduct}`}>
                                                        <a className='line-clamp-2 text-[14px] font-semibold capitalize hover:underline hover:underline-offset-2 hover:decoration-[1px] transition ease-linear duration-300' title={item.nameProduct + ' - ' + item.codeProduct}>
                                                            {item.nameProduct} - <span className='italic'>{item.codeProduct}</span>
                                                        </a>
                                                    </Link>
                                                    <div className='flex items-center gap-x-5 text-[13px] capitalize text-[#6f6f6f]'>
                                                        <p className='font-normal'>Màu: {item.selectedColor} </p>
                                                        <p className='font-normal'>Size: {item.selectedSize} </p>
                                                    </div>
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
                                                    <div className='flex items-center gap-x-4 font-bold tracking-wider'>
                                                        {
                                                            item.discountPrice > 0 ? (
                                                                <>
                                                                    <p className='text-[14px]'>{new Intl.NumberFormat('de-DE').format((item.priceProduct * (100 - item.discountPrice) / 100))}
                                                                        <span className='underline underline-offset-[1.5px] decoration-[1.5px] !ml-1'>đ</span>
                                                                    </p>
                                                                    <p className='line-through decoration-[1.5px] font-semibold text-[13px] text-[#6f6f6f]'>{new Intl.NumberFormat('de-DE').format(item.priceProduct)}
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
                                                </div>
                                                <button>
                                                    <Popconfirm
                                                        title="Bạn xác nhận muốn xoá sản phẩm này khỏi giỏ hàng?"
                                                        onConfirm={() => handleRemoveItemProduct(item.itemId)}
                                                        okText="Có"
                                                        cancelText="Huỷ bỏ">
                                                        <CloseOutlined className='btn--close text-[18px]'/>
                                                    </Popconfirm>
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className='text-center font-semibold !mt-20'>Bạn không có sản phẩm nào trong giỏ hàng của bạn.</p>
                            )
                        }
                    </div>
                </section>
            </Drawer>
        </>

    )
}

export default Header