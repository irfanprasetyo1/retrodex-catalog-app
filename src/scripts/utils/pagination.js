//Fungsi untuk menghasilkan daftar nomor halaman
export function getPaginationRange(currentPage, totalPages, siblingCount = 1) {
  const totalNumbersToShow = siblingCount * 2 + 5;

  if (totalPages <= totalNumbersToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 5 }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    return [1, "...", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, "...", ...middleRange, "...", totalPages];
}
