const vndFormat = Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export function toVnd(amount: number) {
  return vndFormat.format(amount)
}
