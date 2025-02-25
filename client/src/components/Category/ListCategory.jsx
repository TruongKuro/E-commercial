export const ListCategory = ({list, item, child}) => {
    list = new Array("Thời trang", "Điện thoại & phụ kiện", "Giày dép", "Điện gia dụng");

    item = new Array();
    item[0] = "Áo|Quần|Váy đầm|Đồ lót|Đồ ngủ";
    item[1] = "Điện thoại|Máy tính bảng|Đồng hồ thông minh|Phụ kiện điện thoại";
    item[2] = "Giày thể thao|Giày tây|Giày cao gót|Xăng đan & Dép|Bốt|Phụ kiện giày dép";
    item[3] = "Gia dụng nhỏ|Gia dụng lớn|Gia dụng nhà bếp";

    child = new Array();
    child[0] = [
        ["Áo len","Áo Khoác","Áo Sơ mi","Áo Thun","Áo ba lỗ","Áo chống nắng"], 
        ["Quần jean","Quần dài","Quần đùi"],[], [], []];
    child[1] = [
        [], [], [],["Ốp lưng","Cáp - củ sạc","USB","Thẻ nhớ","Kính cường lực","Gậy selfie","Bút cảm ứng","Miếng dán màn hình","Sạc dự phòng","Giá đỡ điện thoại"]]; 
    child[2] = [["đsdsd"],[],[],[],[],["Dụng cụ vệ sinh giày","Dây giày","Lót giày"]];
    child[3] = [
        ["Bàn là","Quạt","Tivi"],
        ["Điều hòa","Máy giặt","Máy hút bụi","Máy lọc không khí","Máy lọc nước","Máy sáy quần áo"],
        ["Ấm đun siêu tốc","Bếp từ, bếp gas","Máy ép, xay sinh tố","Máy may","Máy pha cà phê","Máy rửa bát đĩa","Nồi chiên không dầu","Tủ lạnh"]]
}