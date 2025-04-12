export const formatDateTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    // Kiểm tra nếu date không hợp lệ
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleString(); // hoặc format tùy chọn
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return "Invalid Date";
  }
};