import * as React from 'react'
// import { styled } from '@material-ui/core/styles';

const Logo = (props: React.ComponentProps<'svg'>) => (
  <svg viewBox='0 0 201 303.44' {...props}>
    <path
      d='M201,107.54s-25,3-55-16c-3-7-14-33-17.5-39.5a59.37,59.37,0,0,1-9,12s4.5-13.5,3.5-22.5S112.17-1.37,99.5,0C86,1.54,64.5,16,56,22.54s-23,26-23,26,27-12,53-12c-1,4-15,9-15,9s-12,33-10,38c2.35,5.87,12,11,26,15-14,1-31-6-31-6s-28,16-56,15c11,17,44,24,52,26-4,9-16,17-17,27-1.39,13.86,7,27,7,38,0,9-3,19-4,22,16-8,19-17,19-17s8,23-11,51c14,0,24-9,24-9a48.26,48.26,0,0,0,2,28c14,37,47,35,50,19-3,1-15,4-17-15-1.9-18,18-37,27-31,11.83,7.89,23,8,23,8s-20-26-10-51c5,13,18,16,18,16a52.8,52.8,0,0,1-4-19c0-7.07,7-25,7-36,0-16-14-23-19-31C191,124.54,201,107.54,201,107.54Zm-99,57c-4,3-12,2-12-2s5-6,12-6,12,2,12,6S106,167.54,102,164.54Zm22-7c-3-1-3-4-9-8-4.85-3.23-13,1-13,1v-13l-5,11a12.07,12.07,0,0,0-10,1c-5,3-6,7-9,8-5.69,1.9-7-22-7-22s21,1,31,1,29-1,29-1S130,159.54,124,157.54Z'
      fill='#0277BD'
    />
  </svg>
)

export default Logo;

// Apply prop filtering
// const Svg = styled('svg')({})
