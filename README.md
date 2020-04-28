# cmpm163_lab4

1. x = u*8;
2. y = v*8;
3. u = .375*8 = 3, v = .25*8 = 2; 3,2 = white


https://drive.google.com/file/d/10zXWbmEJDyCtORYgwh2nGGVukDnKl4HE/view?usp=sharing
The first four cubes were made following along with the lab handout and the fifth top right one was made with a tiling.


For the tiling I used the following to achieve the effect:

vec2 phase = fract(vUv.xy/ vec2(.5,.5));
gl_FragColor = texture2D(texture1, phase);
