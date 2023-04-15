
const toSlugName = (str) => {
    str = str.toLowerCase();
    str = str.normalize("NFD");
    str = str.replace(/[\u0300-\u036f]/g, "");

    str = str.replace(/[đĐ]/g, "d");
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // Xóa ký tự - liên tiếp
    str = str.replace(/-+/g, "-");

    // xóa phần dư - ở đầu & cuối
    str = str.replace(/^-+|-+$/g, "");

    return str;
};

export default toSlugName;