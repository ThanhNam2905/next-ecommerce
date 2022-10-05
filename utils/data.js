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
            name: 'Free shirt',
            codeProduct: 'SMID0076-01',
            slug: 'free-shirt',
            category: 'shirts',
            images: '/images/products/shirt1.jpg',
            tagProduct: ['new', 'sale'],
            discount: 10,
            price: 400000,
            brand: 'Nike',
            rating: 4.5,
            numberReview: 8,
            countInStock: 30,
            material: 'Vải Sơmi Cotton',
            sold: 0,
            description: 'A popular shirt'
        },
        {
            name: 'Adidas T-shirt',
            codeProduct: 'ADDT0076-01',
            slug: 'adidas-t-shirt',
            category: 'shirts',
            images: '/images/products/shirt2.jpg',
            tagProduct: ['sale'],
            discount: 10,
            price: 450000,
            brand: 'Adidas',
            rating: 4.2,
            numberReview: 10,
            countInStock: 30,
            material: 'Coton',
            sold: 0,
            description: 'A popular shirt'
        },
        {
            name: 'Adidas T-shirt 3',
            codeProduct: 'ADDT0076-03',
            slug: 'adidas-t-shirt-3',
            category: 'shirts',
            images: '/images/products/shirt3.jpg',
            tagProduct: ['sale'],
            discount: 10,
            price: 250000,
            brand: 'Adidas',
            rating: 4.2,
            numberReview: 10,
            countInStock: 30,
            material: 'Coton',
            sold: 0,
            description: 'A popular shirt'
        },
        {
            name: 'Adidas Pants Classic',
            codeProduct: 'ADDT0076-03',
            slug: 'adidas-pants-classic',
            category: 'pants',
            images: '/images/products/pant1.jpg',
            tagProduct: ['sale'],
            discount: 10,
            price: 450000,
            brand: 'Adidas',
            rating: 4.2,
            numberReview: 10,
            countInStock: 30,
            material: 'Coton',
            sold: 0,
            description: 'A popular shirt'
        },
        {
            name: 'Adidas Pants Custom',
            codeProduct: 'ADDT0076-05',
            slug: 'adidas-pants-custom',
            category: 'pants',
            images: '/images/products/pant2.jpg',
            tagProduct: ['sale', 'new'],
            discount: 10,
            price: 550000,
            brand: 'Adidas',
            rating: 4.2,
            numberReview: 10,
            countInStock: 30,
            material: 'Coton',
            sold: 0,
            description: 'A popular shirt'
        },
        {
            name: 'Uniqlo Pants 3',
            codeProduct: 'ADDT0076-05',
            slug: 'uniqlo-pants-3',
            category: 'pants',
            images: '/images/products/pant3.jpg',
            tagProduct: ['new'],
            discount: 0,
            price: 700000,
            brand: 'uniqlo',
            rating: 4.2,
            numberReview: 10,
            countInStock: 30,
            material: 'Coton',
            sold: 0,
            description: 'A popular shirt'
        }
    ]
}

export default data;