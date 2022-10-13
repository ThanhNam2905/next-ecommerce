import { AppstoreOutlined, CaretDownOutlined, FileAddOutlined, FilePptOutlined, HomeOutlined, IdcardOutlined, LogoutOutlined, ShoppingOutlined, UnorderedListOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

export default function SidebarAdmin() {

    const { Panel } = Collapse;
    const router = useRouter();

    return (
        <div className="siderbar-admin__content px-2 py-4 bg-green-50 border-r-4">
            <Collapse
                expandIconPosition="end"
                ghost
                accordion
                className=''
                expandIcon={({ isActive }) => (<CaretDownOutlined width={10} rotate={isActive ? 180 : 0} />)}
            >

                <Panel header={<div className="ant-collapse-custom text-[17px] font-semibold flex items-center gap-x-2.5 text-gray-600 hover:text-blue-600">
                                <HomeOutlined className="text-[15px]" />
                                <p>Admin dashboard</p>
                            </div>}
                            key="1"
                            className={`panel-item__customize group w-full h-full ${router.pathname === '/admin/dashboard' ? ' active' : ''}`}>

                    <Link href="/admin/dashboard">
                        <a className="text-[15px] text-gray-600 gap-x-2.5 py-1.5 mb-1.5 flex items-center hover:bg-gray-100 px-4 rounded">
                            <AppstoreOutlined className="mt-0.5 text-[14px]" />
                            <span className={`ml-1.5 ${router.pathname === '/admin/dashboard' ? ' font-bold' : ''}`}>Trang chủ Dashboard</span>
                        </a>
                    </Link>
                    <Link href="/admin/profile">
                        <a className="text-[15px] text-gray-600 gap-x-2.5 py-1.5 mb-1.5 flex items-center hover:bg-gray-100 px-4 rounded">
                            <IdcardOutlined className="mt-0.5 text-[14px]" />
                            <span className="ml-1.5">Hồ sơ tài khoản</span>
                        </a>
                    </Link>
                    <a className="text-[15px] text-gray-600 gap-x-2.5 py-1.5 mb-1.5 flex items-center cursor-pointer hover:bg-gray-100 px-4 rounded">
                        <LogoutOutlined className="mt-0.5 text-[14px]" />
                        <span className="ml-1.5">Đăng xuất</span>
                    </a>
                </Panel>
                <Panel header={<div className="ant-collapse-custom text-[17px] font-semibold flex items-center gap-x-2.5 text-gray-600 hover:text-blue-600">
                                <FilePptOutlined className="text-[15px]" />
                                <p>Quản lý sản phẩm</p>
                            </div>}
                            key="2"
                            className="panel-item__customize group w-full h-full">

                    <Link href="/admin/products">
                        <a className="text-[15px] text-gray-600 gap-x-2.5 py-1.5 mb-1.5 flex items-center hover:bg-gray-100 px-4 rounded">
                            <UnorderedListOutlined className="mt-0.5"/>
                            <span className="ml-1.5">Danh sách sản phẩm</span>
                        </a>
                    </Link>
                    <Link href="/admin/products/create-product">
                        <a className="text-[15px] text-gray-600 gap-x-2.5 py-1.5 mb-1.5 flex items-center hover:bg-gray-100 px-4 rounded">
                            <FileAddOutlined className="mt-0.5 text-[14px]" />
                            <span className="ml-1.5">Thêm sản phẩm</span>
                        </a>
                    </Link>
                </Panel>
                <Panel header={<div className="ant-collapse-custom text-[17px] font-semibold flex items-center gap-x-2.5 text-gray-600 hover:text-blue-600">
                                <ShoppingOutlined className="text-[15px]" />
                                <p>Quản lý đơn hàng</p>
                            </div>}
                            key="3"
                            className={`panel-item__customize group w-full h-full ${router.pathname === '/admin/orders' ? ' active' : ''}`}>

                    <Link href="/admin/orders">
                        <a className="text-[15px] text-gray-600 gap-x-2.5 py-1.5 mb-1.5 flex items-center hover:bg-gray-100 px-4 rounded">
                            <UnorderedListOutlined className="mt-0.5"/>
                            <span className={`ml-1.5 ${router.pathname === '/admin/orders' ? ' font-bold' : ''}`}>Danh sách đơn hàng</span>
                        </a>
                    </Link>
                </Panel>
                <Panel header={<div className="ant-collapse-custom text-[17px] font-semibold flex items-center gap-x-2.5 text-gray-600 hover:text-blue-600">
                                <UsergroupAddOutlined className="text-[15px]" />
                                <p>Quản lý thành viên</p>
                            </div>}
                            key="4"
                            className="panel-item__customize group w-full h-full">

                    <Link href="/admin/users">
                        <a className="text-[15px] text-gray-600 gap-x-2.5 py-1.5 mb-1.5 flex items-center hover:bg-gray-100 px-4 rounded">
                            <UnorderedListOutlined className="mt-0.5"/>
                            <span className="ml-1.5">Danh sách thành viên</span>
                        </a>
                    </Link>
                </Panel>
            </Collapse>
        </div>
    )
}
