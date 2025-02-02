export function usePagination<T>(pageSize: number, page: number, data: T[]) {
  // Data length
  const dataNum = data.length;
  // Total pages
  const totalPages = Math.ceil(dataNum / pageSize);
  // Start index
  const startIndex = (page - 1) * pageSize;
  // Current page data
  const currentData = data.slice(startIndex, startIndex + pageSize);
  // Page start index
  const pageStart = data.indexOf(currentData[0]) + 1;
  // Page end index
  const pageEnd = data.indexOf(currentData[currentData.length - 1]) + 1;

  return {
    dataNum,
    totalPages,
    pageStart,
    pageEnd,
    currentData,
  };
}
