import axios from "axios";

const uploadListImageProduct = async (images) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    const {
        data: { signature, timestamp },
    } = await axios('/api/admin/cloudinary-sign');

    let listArrayImg = [];

    for(const item of images) {
        const formData = new FormData();
        formData.append('file',item.originFileObj);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        const { data } = await axios.post(url, formData);

        await listArrayImg.push({
            public_id: data.public_id,
            url: data.secure_url
        })
    }
    return listArrayImg;
};

export default uploadListImageProduct;