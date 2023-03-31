const BarsMenu = ({
  height = '1rem',
  width = '1rem',
  onClick = () => {
    return
  },
}) => {
  return (
    <svg
      fill='currentColor'
      height={height}
      width={width}
      viewBox='0 0 448 512'
      aria-hidden='true'
      role='img'
      className='bars-icon-menu'
      onClick={onClick}
    >
      <path d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'></path>
    </svg>
  )
}

export default BarsMenu
