// utils/getOptimizedImage.ts
export const getOptimizedImage = (url: string, width = 150, height = 150) => {
  return url.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
  );
};
