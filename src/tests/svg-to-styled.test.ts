import { convertColor } from '../tools/utils'
import { css } from '../css-render/modules'
import { replaceColorsToVariables, replaceElementsIdentifiersToUnique } from '../transormers/svg-to-styled'

const testSvg = `
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="21" y="21" width="108" height="108" rx="12" fill="#323232" fill-opacity="0.05"/>
<g filter="url(#filter0_ii)">
<circle cx="37.5001" cy="67.41" r="17.1311" fill="#323232" fill-opacity="0.5"/>
</g>
<g filter="url(#filter1_ii)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M65 117H10C10 101.812 22.3122 89.5002 37.5 89.5002C52.6878 89.5002 65 101.812 65 117Z" fill="#323232" fill-opacity="0.5"/>
</g>
<g filter="url(#filter2_ii)">
<circle cx="95.6893" cy="38.2162" r="27.2162" fill="#FF710B"/>
</g>
<g filter="url(#filter3_ii)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M139.378 117C139.378 92.8711 119.818 73.3108 95.6892 73.3108C71.5603 73.3108 52 92.8711 52 117H139.378Z" fill="#7D2FEE"/>
</g>
<path d="M128.5 95.6456C130.232 90.3881 134.388 86.2319 139.645 84.5C134.388 82.7681 130.232 78.6119 128.5 73.3544C126.768 78.6119 122.612 82.7681 117.355 84.5C122.612 86.2319 126.768 90.3881 128.5 95.6456ZM111.875 83.625C120.573 83.625 127.625 76.5735 127.625 67.875V67H129.375V67.875C129.375 76.5735 136.427 83.625 145.125 83.625H146V85.375H145.125C136.427 85.375 129.375 92.4265 129.375 101.125V102H127.625V101.125C127.625 92.4265 120.573 85.375 111.875 85.375H111V83.625H111.875Z" fill="#FF710B" stroke="#FF710B" stroke-width="1.4" stroke-linejoin="round"/>
<path d="M52 42.7896C51.1787 41.1545 49.8456 39.8213 48.2105 39C49.8456 38.1787 51.1787 36.8455 52 35.2104C52.8213 36.8455 54.1544 38.1787 55.7895 39C54.1544 39.8213 52.8213 41.1545 52 42.7896ZM51.6 30.5C51.3239 30.5 51.1 30.7239 51.1 31V31.4C51.1 35.1003 48.1003 38.1 44.4 38.1H44C43.7239 38.1 43.5 38.3239 43.5 38.6V39.4C43.5 39.6761 43.7239 39.9 44 39.9H44.4C48.1003 39.9 51.1 42.8997 51.1 46.6V47C51.1 47.2761 51.3239 47.5 51.6 47.5H52.4C52.6761 47.5 52.9 47.2761 52.9 47V46.6C52.9 42.8997 55.8997 39.9 59.6 39.9H60C60.2761 39.9 60.5 39.6761 60.5 39.4V38.6C60.5 38.3239 60.2761 38.1 60 38.1H59.6C55.8997 38.1 52.9 35.1003 52.9 31.4V31C52.9 30.7239 52.6761 30.5 52.4 30.5H51.6Z" fill="#6F2AD4" stroke="#6F2AD4" stroke-linejoin="round"/>
<defs>
<filter id="filter0_ii" x="20.369" y="44.2788" width="46.2623" height="40.2623" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="12" dy="-6"/>
<feGaussianBlur stdDeviation="6"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="6" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.670833 0 0 0 0 0.670833 0 0 0 0 0.670833 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter1_ii" x="10" y="83.5002" width="67" height="33.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="12" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="10" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.670588 0 0 0 0 0.670588 0 0 0 0 0.670588 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter2_ii" x="68.4731" y="-1" width="76.4324" height="66.4324" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="24" dy="-12"/>
<feGaussianBlur stdDeviation="11"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.6375 0 0 0 0 0.0690625 0 0 0 0 0.0690625 0 0 0 0.12 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="6" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.608333 0 0 0 0 0.0208333 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter3_ii" x="52" y="63.3108" width="111.378" height="53.6892" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="32" dy="-10"/>
<feGaussianBlur stdDeviation="12"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="10" dy="-10"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.490196 0 0 0 0 0.184314 0 0 0 0 0.933333 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
</defs>
</svg>
`

const replacedSvg = `
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="21" y="21" width="108" height="108" rx="12" fill="#323232" fill-opacity="0.05"/>
<g filter="url(#filter0_ii)">
<circle cx="37.5001" cy="67.41" r="17.1311" fill="#323232" fill-opacity="0.5"/>
</g>
<g filter="url(#filter1_ii)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M65 117H10C10 101.812 22.3122 89.5002 37.5 89.5002C52.6878 89.5002 65 101.812 65 117Z" fill="#323232" fill-opacity="0.5"/>
</g>
<g filter="url(#filter2_ii)">
<circle cx="95.6893" cy="38.2162" r="27.2162" fill="var(--theme_themeAccent, var(--theme_themeAccent-override, rgba(255,113,11,1)))"/>
</g>
<g filter="url(#filter3_ii)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M139.378 117C139.378 92.8711 119.818 73.3108 95.6892 73.3108C71.5603 73.3108 52 92.8711 52 117H139.378Z" fill="#7D2FEE"/>
</g>
<path d="M128.5 95.6456C130.232 90.3881 134.388 86.2319 139.645 84.5C134.388 82.7681 130.232 78.6119 128.5 73.3544C126.768 78.6119 122.612 82.7681 117.355 84.5C122.612 86.2319 126.768 90.3881 128.5 95.6456ZM111.875 83.625C120.573 83.625 127.625 76.5735 127.625 67.875V67H129.375V67.875C129.375 76.5735 136.427 83.625 145.125 83.625H146V85.375H145.125C136.427 85.375 129.375 92.4265 129.375 101.125V102H127.625V101.125C127.625 92.4265 120.573 85.375 111.875 85.375H111V83.625H111.875Z" fill="var(--theme_themeAccent, var(--theme_themeAccent-override, rgba(255,113,11,1)))" stroke="var(--theme_themeAccent, var(--theme_themeAccent-override, rgba(255,113,11,1)))" stroke-width="1.4" stroke-linejoin="round"/>
<path d="M52 42.7896C51.1787 41.1545 49.8456 39.8213 48.2105 39C49.8456 38.1787 51.1787 36.8455 52 35.2104C52.8213 36.8455 54.1544 38.1787 55.7895 39C54.1544 39.8213 52.8213 41.1545 52 42.7896ZM51.6 30.5C51.3239 30.5 51.1 30.7239 51.1 31V31.4C51.1 35.1003 48.1003 38.1 44.4 38.1H44C43.7239 38.1 43.5 38.3239 43.5 38.6V39.4C43.5 39.6761 43.7239 39.9 44 39.9H44.4C48.1003 39.9 51.1 42.8997 51.1 46.6V47C51.1 47.2761 51.3239 47.5 51.6 47.5H52.4C52.6761 47.5 52.9 47.2761 52.9 47V46.6C52.9 42.8997 55.8997 39.9 59.6 39.9H60C60.2761 39.9 60.5 39.6761 60.5 39.4V38.6C60.5 38.3239 60.2761 38.1 60 38.1H59.6C55.8997 38.1 52.9 35.1003 52.9 31.4V31C52.9 30.7239 52.6761 30.5 52.4 30.5H51.6Z" fill="#6F2AD4" stroke="#6F2AD4" stroke-linejoin="round"/>
<defs>
<filter id="filter0_ii" x="20.369" y="44.2788" width="46.2623" height="40.2623" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="12" dy="-6"/>
<feGaussianBlur stdDeviation="6"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="6" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.670833 0 0 0 0 0.670833 0 0 0 0 0.670833 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter1_ii" x="10" y="83.5002" width="67" height="33.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="12" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="10" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.670588 0 0 0 0 0.670588 0 0 0 0 0.670588 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter2_ii" x="68.4731" y="-1" width="76.4324" height="66.4324" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="24" dy="-12"/>
<feGaussianBlur stdDeviation="11"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.6375 0 0 0 0 0.0690625 0 0 0 0 0.0690625 0 0 0 0.12 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="6" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.608333 0 0 0 0 0.0208333 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter3_ii" x="52" y="63.3108" width="111.378" height="53.6892" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="32" dy="-10"/>
<feGaussianBlur stdDeviation="12"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="10" dy="-10"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.490196 0 0 0 0 0.184314 0 0 0 0 0.933333 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
</defs>
</svg>
`

const replacedVariables = `
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="21" y="21" width="108" height="108" rx="12" fill="#323232" fill-opacity="0.05"/>
<g filter="url(#filter0_ii_IwQKiXLOPuh5eFyvFcvkcegZO4p15Q5FmgKzm1pBI)">
<circle cx="37.5001" cy="67.41" r="17.1311" fill="#323232" fill-opacity="0.5"/>
</g>
<g filter="url(#filter1_ii_IwQKiXLOPuh5eFyvFcvkcegZO4p15Q5FmgKzm1pBI)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M65 117H10C10 101.812 22.3122 89.5002 37.5 89.5002C52.6878 89.5002 65 101.812 65 117Z" fill="#323232" fill-opacity="0.5"/>
</g>
<g filter="url(#filter2_ii_IwQKiXLOPuh5eFyvFcvkcegZO4p15Q5FmgKzm1pBI)">
<circle cx="95.6893" cy="38.2162" r="27.2162" fill="#FF710B"/>
</g>
<g filter="url(#filter3_ii_IwQKiXLOPuh5eFyvFcvkcegZO4p15Q5FmgKzm1pBI)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M139.378 117C139.378 92.8711 119.818 73.3108 95.6892 73.3108C71.5603 73.3108 52 92.8711 52 117H139.378Z" fill="#7D2FEE"/>
</g>
<path d="M128.5 95.6456C130.232 90.3881 134.388 86.2319 139.645 84.5C134.388 82.7681 130.232 78.6119 128.5 73.3544C126.768 78.6119 122.612 82.7681 117.355 84.5C122.612 86.2319 126.768 90.3881 128.5 95.6456ZM111.875 83.625C120.573 83.625 127.625 76.5735 127.625 67.875V67H129.375V67.875C129.375 76.5735 136.427 83.625 145.125 83.625H146V85.375H145.125C136.427 85.375 129.375 92.4265 129.375 101.125V102H127.625V101.125C127.625 92.4265 120.573 85.375 111.875 85.375H111V83.625H111.875Z" fill="#FF710B" stroke="#FF710B" stroke-width="1.4" stroke-linejoin="round"/>
<path d="M52 42.7896C51.1787 41.1545 49.8456 39.8213 48.2105 39C49.8456 38.1787 51.1787 36.8455 52 35.2104C52.8213 36.8455 54.1544 38.1787 55.7895 39C54.1544 39.8213 52.8213 41.1545 52 42.7896ZM51.6 30.5C51.3239 30.5 51.1 30.7239 51.1 31V31.4C51.1 35.1003 48.1003 38.1 44.4 38.1H44C43.7239 38.1 43.5 38.3239 43.5 38.6V39.4C43.5 39.6761 43.7239 39.9 44 39.9H44.4C48.1003 39.9 51.1 42.8997 51.1 46.6V47C51.1 47.2761 51.3239 47.5 51.6 47.5H52.4C52.6761 47.5 52.9 47.2761 52.9 47V46.6C52.9 42.8997 55.8997 39.9 59.6 39.9H60C60.2761 39.9 60.5 39.6761 60.5 39.4V38.6C60.5 38.3239 60.2761 38.1 60 38.1H59.6C55.8997 38.1 52.9 35.1003 52.9 31.4V31C52.9 30.7239 52.6761 30.5 52.4 30.5H51.6Z" fill="#6F2AD4" stroke="#6F2AD4" stroke-linejoin="round"/>
<defs>
<filter id="filter0_ii_IwQKiXLOPuh5eFyvFcvkcegZO4p15Q5FmgKzm1pBI" x="20.369" y="44.2788" width="46.2623" height="40.2623" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="12" dy="-6"/>
<feGaussianBlur stdDeviation="6"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="6" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.670833 0 0 0 0 0.670833 0 0 0 0 0.670833 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter1_ii_IwQKiXLOPuh5eFyvFcvkcegZO4p15Q5FmgKzm1pBI" x="10" y="83.5002" width="67" height="33.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="12" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="10" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.670588 0 0 0 0 0.670588 0 0 0 0 0.670588 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter2_ii_IwQKiXLOPuh5eFyvFcvkcegZO4p15Q5FmgKzm1pBI" x="68.4731" y="-1" width="76.4324" height="66.4324" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="24" dy="-12"/>
<feGaussianBlur stdDeviation="11"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.6375 0 0 0 0 0.0690625 0 0 0 0 0.0690625 0 0 0 0.12 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="6" dy="-6"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.608333 0 0 0 0 0.0208333 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
<filter id="filter3_ii_IwQKiXLOPuh5eFyvFcvkcegZO4p15Q5FmgKzm1pBI" x="52" y="63.3108" width="111.378" height="53.6892" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="32" dy="-10"/>
<feGaussianBlur stdDeviation="12"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="10" dy="-10"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.490196 0 0 0 0 0.184314 0 0 0 0 0.933333 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
</filter>
</defs>
</svg>
`

test("Test replace colors to variables", () => {
    const rawColor = {
        r: 1,
        g: 0.4441666901111603,
        b: 0.04166668653488159,
        a: 1,
    }

    const colors = [{
        name: "theme_themeAccent",
        value: css.fun("rgba", [
            convertColor(rawColor.r),
            convertColor(rawColor.g),
            convertColor(rawColor.b),
            1
        ]),
        isThemeColor: true,
        rawColor: rawColor
    }]
    const replacedColors = replaceColorsToVariables(testSvg, colors)
    expect(replacedColors).toEqual(replacedSvg)
})

test("Test replace identifiers to unique", () => {
    const replacedColors = replaceElementsIdentifiersToUnique(testSvg)
    expect(replacedColors)
    .toEqual(replacedVariables)
})