varying vec3 vUv;

uniform vec3 colorA;
uniform vec3 colorB;

void main() {
    float x = sin(vUv.x);
    float y = cos(vUv.y);


    gl_FragColor = vec4(y, x, x/y, sin(vUv.z));

}