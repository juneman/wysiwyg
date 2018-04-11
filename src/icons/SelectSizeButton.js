import React from 'react';

import IconButton from './IconButton';

export default class SelectSizeButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="select_size"
        pathNode={
          <g>
            <defs>
                <path d="M2,0 L16,0 C17.1045695,-2.02906125e-16 18,0.8954305 18,2 L18,16 C18,17.1045695 17.1045695,18 16,18 L2,18 C0.8954305,18 1.3527075e-16,17.1045695 0,16 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z" id="path-1"></path>
                <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="18" height="18" fill="white">
                    <use xlinkHref="#path-1"></use>
                </mask>
            </defs>
            <g id="New" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="05-WYSIWYG-Image-Resize-Alt-Hover" transform="translate(-230.000000, -240.000000)">
                <g id="resize-icon" transform="translate(230.000000, 240.000000)">
                  <use id="Combined-Shape" stroke="#A2A2A2" mask="url(#mask-2)" strokeWidth="3" strokeLinejoin="round" strokeDasharray="1.5,1" xlinkHref="#path-1"></use>
                  <path d="M15.0546253,3.51807195 L15.0546253,7.76540551 C15.0546253,8.09722845 14.7857511,8.37216745 14.4612478,8.37216745 C14.3036319,8.37216745 14.1552875,8.30580286 14.0440292,8.192035 L12.7089299,6.82682064 L9.6307842,9.97439819 C9.57515506,10.0312821 9.49171135,10.0692047 9.41753917,10.0692047 C9.34336698,10.0692047 9.25992327,10.0312821 9.20429413,9.97439819 L8.14734049,8.89360349 C8.09171135,8.83671956 8.05462526,8.75139366 8.05462526,8.67554842 C8.05462526,8.59970318 8.09171135,8.51437728 8.14734049,8.45749335 L11.2254862,5.30991579 L9.89038685,3.94470143 C9.77912857,3.83093357 9.71422791,3.67924309 9.71422791,3.51807195 C9.71422791,3.18624901 9.98310208,2.91131001 10.3076054,2.91131001 L14.4612478,2.91131001 C14.7857511,2.91131001 15.0546253,3.18624901 15.0546253,3.51807195 Z" id="" fill="#A2A2A2"></path>
                  <g id="Group-9" transform="translate(0.000000, 10.000000)" fill="#A2A2A2">
                    <path d="M1,0 L7,0 C7.55228475,-1.01453063e-16 8,0.44771525 8,1 L8,7 C8,7.55228475 7.55228475,8 7,8 L2,8 C0.8954305,8 1.3527075e-16,7.1045695 0,6 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" id="Combined-Shape"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        }
        viewBox="0 0 18 18"
        {...this.props}
      />
    );
  }
}
