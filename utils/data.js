import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('Admin123456'),
            isAdmin: true,
            numberPhone: '0942898298'
        },
        {
            name: 'User01',
            email: 'user01@example.com',
            password: bcrypt.hashSync('Thanhnam2905'),
            isAdmin: false,
            numberPhone: '0942898297'
        }
    ],
    products: [
        {
            nameProduct: 'Peanuts Snoopy Áo Nỉ Dài Tay',
            slugProduct: 'peanuts-snoopy-ao-ni-dai-tay',
            imagesProduct: [
                {
                    public_id:
                        'v1666422319/next-store-fashion/goods_453658_sub14_rk2z7x.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666422319/next-store-fashion/goods_453658_sub14_rk2z7x.jpg'
                },
                {
                    public_id:
                        'v1666422358/next-store-fashion/vngoods_09_453658_oiqdun.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666422358/next-store-fashion/vngoods_09_453658_oiqdun.jpg'
                },
                {
                    public_id:
                        'v1666422272/next-store-fashion/vngoods_453658_sub1_rlv9n8.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666422272/next-store-fashion/vngoods_453658_sub1_rlv9n8.jpg'
                },
                {
                    public_id:
                        'v1666420922/next-store-fashion/goods_453658_sub17_vvnze1.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666420922/next-store-fashion/goods_453658_sub17_vvnze1.jpg'
                },
                {
                    public_id:
                        'v1666420922/next-store-fashion/goods_453658_sub20_ewebep.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666420922/next-store-fashion/goods_453658_sub20_ewebep.jpg'
                },
                {
                    public_id:
                        'v1666422225/next-store-fashion/goods_453658_sub18_nvwsws.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666422225/next-store-fashion/goods_453658_sub18_nvwsws.jpg'
                }
            ],
            tagProduct: ['new'],
            priceProduct: 600000,
            brandProduct: 'PEANUTS',
            description:
                'Bộ sưu tập với những họa tiết miêu tả hình ảnh thư giãn của các thành viên Peanuts trong thiết kế cổ điển.'
        },
        {
            nameProduct: 'Peanuts Snoopy Áo Nỉ Dài Tay 2',
            slugProduct: 'peanuts-snoopy-ao-ni-dai-tay-2',
            imagesProduct: [
                {
                    public_id:
                        'v1666421108/next-store-fashion/goods_453657_sub14_fyxhiv.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666421108/next-store-fashion/goods_453657_sub14_fyxhiv.jpg'
                },
                {
                    public_id:
                        'v1666421107/next-store-fashion/goods_453657_sub15_jxurnc.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666421107/next-store-fashion/goods_453657_sub15_jxurnc.jpg'
                },
                {
                    public_id:
                        'v1666421968/next-store-fashion/vngoods_453657_sub7_rx6tem_j7ysvb.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666421968/next-store-fashion/vngoods_453657_sub7_rx6tem_j7ysvb.jpg'
                },
                {
                    public_id:
                        'v1666421878/next-store-fashion/vngoods_453657_sub1_swtzrk_a5flln.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666421878/next-store-fashion/vngoods_453657_sub1_swtzrk_a5flln.jpg'
                },
                {
                    public_id:
                        'v1666421836/next-store-fashion/vngoods_59_453657_n9mevc.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666421836/next-store-fashion/vngoods_59_453657_n9mevc.jpg'
                },
                {
                    public_id:
                        'v1666421108/next-store-fashion/goods_453657_sub17_c2mbdm.jpg',
                    url: 'https://res.cloudinary.com/nam290596/image/upload/v1666421108/next-store-fashion/goods_453657_sub17_c2mbdm.jpg'
                }
            ],
            tagProduct: ['new'],
            priceProduct: 600000,
            brandProduct: 'PEANUTS',
            description:
                'Bộ sưu tập với những họa tiết miêu tả hình ảnh thư giãn của các thành viên Peanuts trong thiết kế cổ điển.'
        }
    ],
    productsDetail: [
        {
            size: 'M',
            color: 'Đen',
            subColor: '#000000',
            countOfStock: 15,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 0,
            codeProduct: 'ANDT001-001',
            soldOut: 5
        },
        {
            size: 'L',
            color: 'Đen',
            subColor: '#000000',
            countOfStock: 20,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 10,
            codeProduct: 'ANDT001-002',
            soldOut: 2
        },
        {
            size: 'XL',
            color: 'Đen',
            subColor: '#000000',
            countOfStock: 25,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 5,
            codeProduct: 'ANDT001-003',
            soldOut: 0
        },
        {
            size: 'XXL',
            color: 'Đen',
            subColor: '#000000',
            countOfStock: 30,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 15,
            codeProduct: 'ANDT001-004',
            soldOut: 0
        },
        {
            size: 'M',
            color: 'Trắng',
            subColor: '#ffffff',
            countOfStock: 10,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 0,
            codeProduct: 'ANDT001-005',
            soldOut: 0
        },
        {
            size: 'L',
            color: 'Trắng',
            subColor: '#ffffff',
            countOfStock: 15,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 0,
            codeProduct: 'ANDT001-006',
            soldOut: 0
        },
        {
            size: 'XL',
            color: 'Trắng',
            subColor: '#ffffff',
            countOfStock: 20,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 10,
            codeProduct: 'ANDT001-007',
            soldOut: 0
        },
        {
            size: 'XXL',
            color: 'Trắng',
            subColor: '#ffffff',
            countOfStock: 30,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 15,
            codeProduct: 'ANDT001-008',
            soldOut: 0
        },
        {
            size: 'M',
            color: 'Xanh rêu',
            subColor: '#006400',
            countOfStock: 10,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 0,
            codeProduct: 'ANDT001-009',
            soldOut: 0
        },
        {
            size: 'L',
            color: 'Xanh rêu',
            subColor: '#006400',
            countOfStock: 15,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 5,
            codeProduct: 'ANDT001-010',
            soldOut: 0
        },
        {
            size: 'XL',
            color: 'Xanh rêu',
            subColor: '#006400',
            countOfStock: 20,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 10,
            codeProduct: 'ANDT001-011',
            soldOut: 0
        },
        {
            size: 'XXL',
            color: 'Xanh rêu',
            subColor: '#006400',
            countOfStock: 30,
            productId: '639b3ed6dc184839aa8e7b3f',
            discountPrice: 15,
            codeProduct: 'ANDT001-012',
            soldOut: 0
        },

        {
            size: 'M',
            color: 'Xanh rêu',
            subColor: '#006400',
            countOfStock: 10,
            productId: '639b3ed6dc184839aa8e7b46',
            discountPrice: 0,
            codeProduct: 'ANDT002-001',
            soldOut: 0
        },
        {
            size: 'L',
            color: 'Xanh rêu',
            subColor: '#006400',
            countOfStock: 15,
            productId: '639b3ed6dc184839aa8e7b46',
            discountPrice: 5,
            codeProduct: 'ANDT002-002',
            soldOut: 0
        },
        {
            size: 'XL',
            color: 'Xanh rêu',
            subColor: '#006400',
            countOfStock: 20,
            productId: '639b3ed6dc184839aa8e7b46',
            discountPrice: 10,
            codeProduct: 'ANDT002-003',
            soldOut: 0
        },
        {
            size: 'XXL',
            color: 'Xanh rêu',
            subColor: '#006400',
            countOfStock: 30,
            productId: '639b3ed6dc184839aa8e7b46',
            discountPrice: 15,
            codeProduct: 'ANDT002-004',
            soldOut: 0
        },
        {
            size: 'M',
            color: 'Đen',
            subColor: '#000000',
            countOfStock: 10,
            productId: '639b3ed6dc184839aa8e7b46',
            discountPrice: 0,
            codeProduct: 'ANDT002-005',
            soldOut: 0
        },
        {
            size: 'L',
            color: 'Đen',
            subColor: '#000000',
            countOfStock: 15,
            productId: '639b3ed6dc184839aa8e7b46',
            discountPrice: 5,
            codeProduct: 'ANDT002-006',
            soldOut: 0
        },
        {
            size: 'XL',
            color: 'Đen',
            subColor: '#000000',
            countOfStock: 20,
            productId: '639b3ed6dc184839aa8e7b46',
            discountPrice: 10,
            codeProduct: 'ANDT002-007',
            soldOut: 0
        },
        {
            size: 'XXL',
            color: 'Đen',
            subColor: '#000000',
            countOfStock: 30,
            productId: '639b3ed6dc184839aa8e7b46',
            discountPrice: 15,
            codeProduct: 'ANDT002-008',
            soldOut: 0
        }
    ]
    // category: [
    //     {
    //         name: 'Áo',
    //         slug: 'ao',
    //     },
    //     {
    //         name: 'Quần',
    //         slug: 'quan',
    //     },
    // ],
    // productType: [
    //     {
    //         name: 'Áo Thun',
    //         slug: 'ao-thun',
    //     },
    //     {
    //         name: 'Áo Sơ Mi',
    //         slug: 'ao-so-mi',
    //     },
    //     {
    //         name: 'Áo Nỉ & Len',
    //         slug: 'ao-ni-&-len',
    //     },
    //     {
    //         name: 'Áo Hoodie',
    //         slug: 'ao-hoodie',
    //     },
    //     {
    //         name: 'Quần Jean',
    //         slug: 'quan-jean',
    //     },
    //     {
    //         name: 'Quần Short',
    //         slug: 'quan-short',
    //     },
    //     {
    //         name: 'Quần Jean',
    //         slug: 'quan-jean',
    //     },
    //     {
    //         name: 'Quần Kaki & Chino',
    //         slug: 'quan-kaki-&-chino',
    //     },
    //     {
    //         name: 'Quần Jogger',
    //         slug: 'quan-jogger',
    //     },
    //     {
    //         name: 'Quần Tây',
    //         slug: 'quan-tay',
    //     },
    // ],
};

export default data;
