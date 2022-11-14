import bcrypt from "bcryptjs";

const data = {
    users: [
        {
            name: 'Admin',
            email: 'admin@example.com',
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
            codeProduct: 'ANDT00001',
            imagesProduct: [
                {
                    public_id: 'v1666422319/next-store-fashion/goods_453658_sub14_rk2z7x.jpg',
                    url_img: 'https://res.cloudinary.com/nam290596/image/upload/v1666422319/next-store-fashion/goods_453658_sub14_rk2z7x.jpg'
                },
                {
                    public_id: 'v1666422358/next-store-fashion/vngoods_09_453658_oiqdun.jpg',
                    url_img: 'https://res.cloudinary.com/nam290596/image/upload/v1666422358/next-store-fashion/vngoods_09_453658_oiqdun.jpg'
                },
                {
                    public_id: 'v1666422272/next-store-fashion/vngoods_453658_sub1_rlv9n8.jpg',
                    url_img: 'https://res.cloudinary.com/nam290596/image/upload/v1666422272/next-store-fashion/vngoods_453658_sub1_rlv9n8.jpg'
                },
                {
                    public_id: 'v1666422031/next-store-fashion/vngoods_453658_sub9_lbvc4j.jpg',
                    url_img: 'https://res.cloudinary.com/nam290596/image/upload/v1666422031/next-store-fashion/vngoods_453658_sub9_lbvc4j.jpg'
                },
                {
                    public_id: 'v1666420922/next-store-fashion/goods_453658_sub17_vvnze1.jpg',
                    url_img: 'https://res.cloudinary.com/nam290596/image/upload/v1666420922/next-store-fashion/goods_453658_sub17_vvnze1.jpg'
                },
                {
                    public_id: 'v1666422225/next-store-fashion/goods_453658_sub18_nvwsws.jpg',
                    url_img: 'https://res.cloudinary.com/nam290596/image/upload/v1666422225/next-store-fashion/goods_453658_sub18_nvwsws.jpg'
                },
                {
                    public_id: 'v1666420922/next-store-fashion/goods_453658_sub20_ewebep.jpg',
                    url_img: 'https://res.cloudinary.com/nam290596/image/upload/v1666420922/next-store-fashion/goods_453658_sub20_ewebep.jpg'
                },
            ],
            tagProduct: ['new'],
            priceProduct: 500000,
            brandProduct: 'PEANUTS',
            soldOut: 0,
            description: 'Bộ sưu tập với những họa tiết miêu tả hình ảnh thư giãn của các thành viên Peanuts trong thiết kế cổ điển.',
        },
    ],
    // productsDetail: [
    //     {
    //         size: 'M',
    //         color: 'Đen',
    //         subColor: '#000000',
    //         countOfStock: 15,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 0,
    //         codeProduct: 'ANDT001-001',
    //     },
    //     {
    //         size: 'L',
    //         color: 'Đen',
    //         subColor: '#000000',
    //         countOfStock: 20,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 10,
    //         codeProduct: 'ANDT001-002',
    //     },
    //     {
    //         size: 'XL',
    //         color: 'Đen',
    //         subColor: '#000000',
    //         countOfStock: 25,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 5,
    //         codeProduct: 'ANDT001-003',
    //     },
    //     {
    //         size: 'XXL',
    //         color: 'Đen',
    //         subColor: '#000000',
    //         countOfStock: 30,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 15,
    //         codeProduct: 'ANDT001-004',
    //     },
    //     {
    //         size: 'M',
    //         color: 'Trắng',
    //         subColor: '#ffffff',
    //         countOfStock: 10,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 0,
    //         codeProduct: 'ANDT001-005',
    //     },
    //     {
    //         size: 'L',
    //         color: 'Trắng',
    //         subColor: '#ffffff',
    //         countOfStock: 15,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 0,
    //         codeProduct: 'ANDT001-006',
    //     },
    //     {
    //         size: 'XL',
    //         color: 'Trắng',
    //         subColor: '#ffffff',
    //         countOfStock: 20,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 10,
    //         codeProduct: 'ANDT001-007',
    //     },
    //     {
    //         size: 'XXL',
    //         color: 'Trắng',
    //         subColor: '#ffffff',
    //         countOfStock: 30,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 15,
    //         codeProduct: 'ANDT001-008',
    //     },
    //     {
    //         size: 'M',
    //         color: 'Xanh rêu',
    //         subColor: '#006400',
    //         countOfStock: 10,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 0,
    //         codeProduct: 'ANDT001-009',
    //     },
    //     {
    //         size: 'L',
    //         color: 'Xanh rêu',
    //         subColor: '#006400',
    //         countOfStock: 15,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 5,
    //         codeProduct: 'ANDT001-010',
    //     },
    //     {
    //         size: 'XL',
    //         color: 'Xanh rêu',
    //         subColor: '#006400',
    //         countOfStock: 20,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 10,
    //         codeProduct: 'ANDT001-011',
    //     },
    //     {
    //         size: 'XXL',
    //         color: 'Xanh rêu',
    //         subColor: '#006400',
    //         countOfStock: 30,
    //         productId: '6353a11d29f54640160b7db0',
    //         discountPrice: 15,
    //         codeProduct: 'ANDT001-012',
    //     },

    //     {
    //         size: 'M',
    //         color: 'Xanh rêu',
    //         subColor: '#006400',
    //         countOfStock: 10,
    //         productId: '6353a11d29f54640160b7db8',
    //         discountPrice: 0,
    //         codeProduct: 'ANDT002-001',
    //     },
    //     {
    //         size: 'L',
    //         color: 'Xanh rêu',
    //         subColor: '#006400',
    //         countOfStock: 15,
    //         productId: '6353a11d29f54640160b7db8',
    //         discountPrice: 5,
    //         codeProduct: 'ANDT002-002',
    //     },
    //     {
    //         size: 'XL',
    //         color: 'Xanh rêu',
    //         subColor: '#006400',
    //         countOfStock: 20,
    //         productId: '6353a11d29f54640160b7db8',
    //         discountPrice: 10,
    //         codeProduct: 'ANDT002-003',
    //     },
    //     {
    //         size: 'XXL',
    //         color: 'Xanh rêu',
    //         subColor: '#006400',
    //         countOfStock: 30,
    //         productId: '6353a11d29f54640160b7db8',
    //         discountPrice: 15,
    //         codeProduct: 'ANDT002-004',
    //     },
    //     {
    //         size: 'M',
    //         color: 'Đen',
    //         subColor: '#000000',
    //         countOfStock: 10,
    //         productId: '6353a11d29f54640160b7db8',
    //         discountPrice: 0,
    //         codeProduct: 'ANDT002-005',
    //     },
    //     {
    //         size: 'L',
    //         color: 'Đen',
    //         subColor: '#000000',
    //         countOfStock: 15,
    //         productId: '6353a11d29f54640160b7db8',
    //         discountPrice: 5,
    //         codeProduct: 'ANDT002-006',
    //     },
    //     {
    //         size: 'XL',
    //         color: 'Đen',
    //         subColor: '#000000',
    //         countOfStock: 20,
    //         productId: '6353a11d29f54640160b7db8',
    //         discountPrice: 10,
    //         codeProduct: 'ANDT002-007',
    //     },
    //     {
    //         size: 'XXL',
    //         color: 'Đen',
    //         subColor: '#000000',
    //         countOfStock: 30,
    //         productId: '6353a11d29f54640160b7db8',
    //         discountPrice: 15,
    //         codeProduct: 'ANDT002-008',
    //     },
    // ],
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

}

export default data;