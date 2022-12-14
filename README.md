This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

###### Clone Project NextJS Amazona. ######
1. git clone https://github.com/ThanhNam2905/next-ecommerce.git
2. Open Terminal Folder Project.
3. Run command npm install.

## Getting Started
1. Introduction.
2. Install Tools.
3. Create Next App.
4. Publish to Github.
5. Create Website Layout.
    1. create layout component.
    2. add header.
    3. add main section.
    4. add footer.
    5. add tailwindcss classes.  
6. List Products.
    1. add data.js.
    2. create productItem.
    3. add images.
    4. render products.
7. Create Product Details.
    1. create product page.
    2. create 3 columns.
    3. show image product in first column.
    4. show product info in second column.
    5. show add to cart action on third column.
    6. add styles.
8. Handle Add to Cart.
    1. define react context.
    2. define cart items state.
    3. create add to cart action.
    4. add reducer.
    5. create store provider.
    6. handle add to cart button.
9. Create Cart Page.
    1. create cart.js.
    2. use context to get cart items.
    3. list items in cart items.
    4. redirect to cart screen after add to cart.
10. Handle Changing Cart Items.
    1. add select box for quantity.
    2. handle select box change.
11. Save Cart Items.
    1. cai dat package: install js-cookie package.
    2. save and retreive cart items in cookies.
12. Create Login Form.
    1. cai dat package: install react hook form.
    2. create input boxes.
    3. add login button.
13. Connect To MongoDB.
    1. install mongoose.
    2. install mongodb or use mongodb atlas (MongoDB Clound).
    3. save connection url in .env file.
    4. create db utils file.
    5. create sample users.
14. Create Login API.
    1. install next-auth.
    2. create nextauth.js.
    3. implement signin.
    4. use signin in login form.
15. Add User Menu.
    1. check user authentication.
    2. install headlessui.
    3. show user menu.
16. Create Shipping Sreen. 
    1. display address fields.
    2. save address in context.
17. Create Payment Methods Screen.
    1. display payment method.
    2. save payment method in context.
18. Seed Sample Products.
    1. insert sample products to mongodb.
    2. load products from db in home page and product page.
    3. check product count in stock in add to cart.
19. Create Place Order Page.
    1. display shipping address.
    2. display payment method.
    3. display order items.
    4. implment create order.
20. Create Order Detail Screen.
    1. implement backend api for order details.
    2. load order data from backend.
    3. display order details.
21. Create Register Screen.
    1. add signup api.
    2. create register page.
    3. call on api form submit
22. Pay Order By PayPal Developer.
    1. npm i @paypal/react-paypal-js.
    2. add paypal button.
    3. handle payment.
    4. create backend api.
    5. update order state isPaid.
23. Update User Profile.
    1. create profile screen.
    2. show user info.
    3. handle update user info.
24. Create Admin Dashboard.
    1. create Admin Layout.
    2. create Admin Menu(Sidebar).
    3. create Admin Screen.
    4. Implement admin sumary api.
25. List Orders For Admin.
    1. create orders page.
    2. create orders api.
    3. use api in page.
26. Deliver Order For Admin.
    1. create deliver api.
    2. add deliver button.
    3. implement click handler.
27. List Products For Admin.
    1. create products page.
    2. create products api.
    3. use api in page.
28. List Users For Admin.
    1. create users page.
    2. create users api.
    3. use api in page.
29. List Categories For Admin.
    1. create categories page.
    2. create categories api.
    3. use api in page.
30. List Orders For Admin.
    1. create Orders page.
    2. create Orders api.
    3. use api in page.
30. List ProductTypes For Admin.
    1. create ProductTypes page.
    2. create ProductTypes api.
    3. use api in page.
31. Create Product and Delete Product Admin.
    1. create form add products.
    2. build new product api.
    3. add handler for delete.
    4. implement delete api.

    
     

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



